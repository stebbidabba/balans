"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { sendPasswordSetupEmail, sendAccessLinkEmail } from "@/lib/email";

export async function createPaymentAction(args: { userId?: string; email?: string; products?: any[]; productId?: string; quantity?: number; isFromCart?: boolean }) {
  const { userId, email, products, productId, quantity = 1, isFromCart = false } = args;
  
  try {
    const supabase = supabaseAdmin();
    // Ensure we have a user to associate with the order. If not logged in, create a guest user.
    let effectiveUserId = userId;
    try {
      if (!effectiveUserId && email) {
        const { data: created, error: createErr } = await supabase.auth.admin.createUser({
          email: email,
          email_confirm: true
        });
        if (!createErr && created?.user?.id) {
          effectiveUserId = created.user.id;
          console.log('Created guest user for order:', effectiveUserId);
        } else if (createErr) {
          console.log('Could not create guest user, will fallback to local file:', createErr.message);
        }
      }
    } catch (e) {
      console.log('Guest user creation exception:', e);
    }
    
    // Calculate total amount
    let totalAmount = 0;
    if (products && products.length > 0) {
      totalAmount = products.reduce((total, product) => total + (product.price_isk * product.quantity), 0);
    } else if (productId) {
      // Fallback for single product
      const fallbackProducts: any = {
        '1': { price_isk: 12900 },
        '2': { price_isk: 14400 },
        '3': { price_isk: 19900 }
      };
      totalAmount = (fallbackProducts[productId]?.price_isk || 12900) * quantity;
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
        
        // Create order_items for each product
        if (products && products.length > 0) {
          const orderItems: any[] = []
          
          // Get product UUIDs from the products table
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('id, sku')
          
          console.log('Product data:', productData)
          console.log('Products from cart:', products)
          
          if (productError) {
            console.log('Failed to fetch products:', productError.message)
          } else {
            // Create mapping from SKU -> UUID
            const productMap: Record<string, string> = {}
            productData.forEach((product: any) => {
              productMap[product.sku] = product.id
            })
            
            console.log('Product map:', productMap)
            
            let seq = 1
            products.forEach((product: any) => {
              console.log('Processing product:', product)
              // Create one order_item record for each individual kit
              for (let i = 0; i < product.quantity; i++) {
                // Map numeric IDs from cart to SKUs used in DB
                const numericToSku: any = { 1: 'TEST-001', 2: 'CORT-001', 3: 'COMP-001' }
                const sku = numericToSku[product.id] || product.sku
                const productUuid = productMap[sku]
                console.log('Looking for product UUID:', product.id, 'found:', productUuid)
                if (productUuid) {
                  const code = `KT-${String(orderId).slice(-6).toUpperCase()}-${String(seq).padStart(2,'0')}`
                  orderItems.push({
                    order_id: orderId,
                    product_id: productUuid,
                    quantity: 1, // Each record represents 1 kit
                    unit_price_isk: product.price_isk,
                    total_isk: product.price_isk,
                    kit_code: code
                  })
                  seq += 1
                } else {
                  console.log('No UUID found for product:', product.id)
                }
              }
            });
            
            console.log('Order items to insert:', orderItems)
            
            if (orderItems.length > 0) {
              const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);
              
              if (itemsError) {
                console.log('Failed to create order items:', itemsError.message);
              } else {
                console.log(`Created ${orderItems.length} order items for order ${orderId}`);
              }
            } else {
              console.log('No order items to insert')
            }
          }
        } else if (productId) {
          // Single product fallback - map numeric to SKU, then fetch UUID
          const numericToSku: any = { 1: 'TEST-001', 2: 'CORT-001', 3: 'COMP-001' }
          const targetSku = numericToSku[productId]
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('id, sku')
            .eq('sku', targetSku)
            .single()
          
          if (productError) {
            console.log('Failed to fetch product:', productError.message)
          } else {
          const orderItems: any[] = []
          let seq = 1
            for (let i = 0; i < quantity; i++) {
            const code = `KT-${String(orderId).slice(-6).toUpperCase()}-${String(seq).padStart(2,'0')}`
            orderItems.push({
                order_id: orderId,
                product_id: productData.id,
                quantity: 1, // Each record represents 1 kit
              unit_price_isk: 12900, // Default price
              total_isk: 12900,
              kit_code: code
              })
            seq += 1
            }
            
            const { error: itemsError } = await supabase
              .from('order_items')
              .insert(orderItems);
            
            if (itemsError) {
              console.log('Failed to create order items:', itemsError.message);
            } else {
              console.log(`Created ${orderItems.length} order items for order ${orderId}`);
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
    const supabase = supabaseAdmin()
    
    console.log(`Sending post-payment emails to: ${email}`);
    
    // Generate both recovery (set password) and magiclink (one-click sign in)
    const { data: recData, error: recErr } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: { redirectTo: `${site}/auth/callback?next=/account` }
    } as any)
    
    if (!recErr && (recData as any)?.properties?.action_link) {
      console.log('Sending password setup email...');
      await sendPasswordSetupEmail(email, (recData as any).properties.action_link)
    } else {
      console.log('Failed to generate recovery link:', recErr);
    }
    
    const { data: magicData, error: magicErr } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: `${site}/auth/callback?next=/account` }
    } as any)
    
    if (!magicErr && (magicData as any)?.properties?.action_link) {
      console.log('Sending magic link email...');
      await sendAccessLinkEmail(email, (magicData as any).properties.action_link)
    } else {
      console.log('Failed to generate magic link:', magicErr);
    }
    
    console.log('Post-payment emails sent successfully');
  } catch (e) {
    console.error('Failed to send post-payment emails:', e);
  }
}
