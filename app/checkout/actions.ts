"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { sendAccountSetupEmail } from "@/lib/email";

export async function createPaymentAction(args: { 
  userId?: string; 
  email?: string; 
  fullName?: string;
  phone?: string;
  password?: string;
  products?: any[]; 
  productId?: string; 
  quantity?: number; 
  isFromCart?: boolean 
}) {
  const { userId, email, fullName, phone, password, products, productId, quantity = 1, isFromCart = false } = args;
  
  try {
    const supabase = supabaseAdmin();
    // Ensure we have a user to associate with the order. If not logged in, create a complete account.
    let effectiveUserId = userId;
    try {
      if (!effectiveUserId && email && fullName && phone && password) {
        const { data: created, error: createErr } = await supabase.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: {
            full_name: fullName,
            phone: phone
          }
        });
        if (!createErr && created?.user?.id) {
          effectiveUserId = created.user.id;
          console.log('Created complete user account for order:', effectiveUserId);
          
          // Create profile record
          await supabase
            .from('profiles')
            .upsert({
              user_id: effectiveUserId,
              full_name: fullName,
              phone: phone,
              created_at: new Date().toISOString()
            });
        } else if (createErr) {
          console.log('Could not create user account, will fallback to local file:', createErr.message);
        }
      }
    } catch (e) {
      console.log('User account creation exception:', e);
    }
    
    // Calculate total amount using DB prices
    let totalAmount = 0;
    if (products && products.length > 0) {
      const ids = products.map((p: any) => p.id || p.product_id)
      const { data: dbProducts, error: dbErr } = await supabase
        .from('products')
        .select('id, price_isk')
        .in('id', ids)
      if (dbErr) throw dbErr
      const priceMap: Record<string, number> = (dbProducts || []).reduce((acc: any, p: any) => { acc[p.id] = p.price_isk; return acc }, {})
      totalAmount = products.reduce((sum: number, p: any) => {
        const pid = p.id || p.product_id
        const qty = Number(p.quantity || 1)
        const price = Number(priceMap[pid] || 0)
        return sum + price * qty
      }, 0)
    } else if (productId) {
      const { data: p, error: pe } = await supabase
        .from('products')
        .select('id, price_isk')
        .eq('id', productId)
        .single()
      if (pe || !p) throw pe || new Error('Product not found')
      totalAmount = p.price_isk * quantity
    }

    // Try to create order in Supabase first (guest or authenticated)
    let orderId: string;
    try {
      if (!effectiveUserId) {
        // Anonymous checkout: skip Supabase and use local fallback directly
        orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const orderData = {
          id: orderId,
          email: email,
          products: products || [{ id: productId, quantity }],
          status: 'pending_payment',
          total_amount: totalAmount,
          created_at: new Date().toISOString(),
        };
        try {
          const fs = require('fs');
          const path = require('path');
          const ordersFile = path.join(process.cwd(), 'orders.json');
          let orders = [];
          if (fs.existsSync(ordersFile)) {
            const data = fs.readFileSync(ordersFile, 'utf8');
            orders = JSON.parse(data);
          }
          orders.push(orderData);
          fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
          console.log(`Order saved locally (anon): ${orderId} for ${email}`);
        } catch (fileError) {
          console.log('Failed to save anon order locally:', fileError);
        }
      } else {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: effectiveUserId,
          email: email,
          status: 'pending_payment',
          total_amount: totalAmount,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (orderError) {
        console.log('Supabase order creation failed:', orderError.message);
        // Fall back to local storage
        orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const orderData = {
          id: orderId,
          email: email,
          products: products || [{ id: productId, quantity }],
          status: 'pending_payment',
          total_amount: totalAmount,
          created_at: new Date().toISOString(),
          user_id: effectiveUserId
        };
        
        // Write to local orders file as fallback
        const fs = require('fs');
        const path = require('path');
        const ordersFile = path.join(process.cwd(), 'orders.json');
        
        try {
          let orders = [];
          if (fs.existsSync(ordersFile)) {
            const data = fs.readFileSync(ordersFile, 'utf8');
            orders = JSON.parse(data);
          }
          
          orders.push(orderData);
          fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
          console.log(`Order saved locally (fallback): ${orderId} for ${email}`);
        } catch (fileError) {
          console.log('Failed to save order locally:', fileError);
        }
      } else {
        orderId = order.id;
        console.log(`Order saved to Supabase: ${orderId} for ${email}`);
        
        // Create order_items for each product using DB prices
        if (products && products.length > 0) {
          const ids = products.map((p: any) => p.id || p.product_id)
          const { data: dbProducts, error: dbErr } = await supabase
            .from('products')
            .select('id, price_isk')
            .in('id', ids)
          if (dbErr) throw dbErr
          const priceMap: Record<string, number> = (dbProducts || []).reduce((acc: any, p: any) => { acc[p.id] = p.price_isk; return acc }, {})
          for (const p of products) {
            const pid = p.id || p.product_id
            const qty = Number(p.quantity || 1)
            const price = Number(priceMap[pid] || 0)
            for (let i = 0; i < qty; i++) {
              // Allocate a real kit from inventory
              const { data: kit, error: kitError } = await supabase
                .from('kits')
                .select('id, kit_code')
                .eq('product_id', pid)
                .eq('status', 'in_stock')
                .order('created_at', { ascending: true })
                .limit(1)
                .single()
              if (kitError || !kit) {
                throw new Error('No kits available in inventory for this product')
              }
              const { error: itemErr } = await supabase
                .from('order_items')
                .insert({ order_id: orderId, product_id: pid, quantity: 1, unit_price_isk: price, total_isk: price, kit_code: kit.kit_code })
              if (itemErr) throw itemErr
              const { error: updErr } = await supabase
                .from('kits')
                .update({ status: 'assigned' })
                .eq('id', kit.id)
              if (updErr) throw updErr
            }
          }
        } else if (productId) {
          const { data: p, error: pe } = await supabase.from('products').select('id, price_isk').eq('id', productId).single()
          if (!pe && p) {
            for (let i = 0; i < quantity; i++) {
              const { data: kit, error: kitError } = await supabase
                .from('kits')
                .select('id, kit_code')
                .eq('product_id', p.id)
                .eq('status', 'in_stock')
                .order('created_at', { ascending: true })
                .limit(1)
                .single()
              if (kitError || !kit) {
                throw new Error('No kits available in inventory for this product')
              }
              const { error: itemErr } = await supabase
                .from('order_items')
                .insert({ order_id: orderId, product_id: p.id, quantity: 1, unit_price_isk: p.price_isk, total_isk: p.price_isk, kit_code: kit.kit_code })
              if (itemErr) throw itemErr
              const { error: updErr } = await supabase
                .from('kits')
                .update({ status: 'assigned' })
                .eq('id', kit.id)
              if (updErr) throw updErr
            }
          }
        }
      }
      }
    } catch (err) {
      console.log('Order creation error:', err);
      orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Mock Stripe payment intent creation
    // In production, this would call Stripe API to create a PaymentIntent
    const mockClientSecret = `pi_${Math.random().toString(36).substr(2, 24)}_secret_${Math.random().toString(36).substr(2, 43)}`;
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Order created: ${orderId} for ${email}`);
    
    return {
      provider: "stripe",
      orderId: orderId,
      clientSecret: mockClientSecret,
      status: "requires_payment_method",
      message: "Payment intent created. Ready for payment processing."
    };
    
  } catch (error) {
    console.error('Payment creation failed:', error);
    throw new Error('Failed to create payment');
  }
}

export async function sendPostPaymentEmails(email: string) {
  try {
    if (!email) {
      console.log('No email provided for post-payment emails');
      return;
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://balansisland.is'
    
    console.log(`Sending account ready email to: ${email}`);
    
    // Create a direct link to account page since account is already complete
    const accountLink = `${site}/account`
    
    console.log('Sending account ready email...');
    await sendAccountSetupEmail(email, accountLink)
    
    console.log('Account ready email sent successfully');
  } catch (e) {
    console.error('Failed to send account ready email:', e);
  }
}
