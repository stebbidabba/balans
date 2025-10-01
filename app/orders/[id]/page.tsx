import { supabaseServer } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import fs from 'fs';
import path from 'path';

export const dynamic = "force-dynamic";

export default async function OrderStatusPage({ params }: { params: { id: string } }) {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  
  const orderId = params.id;
  
  // Try to load order from Supabase first
  let order = null;
  try {
    const { data: supabaseOrder, error: supabaseError } = await sb
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (!supabaseError && supabaseOrder) {
      order = supabaseOrder;
      // Add mock data for display
      order.status = 'completed';
      order.total_amount = 12900;
      order.order_items = [
        {
          id: '1',
          quantity: 1,
          unit_price: 12900,
          products: {
            name: 'Testosterone Kit',
            description: 'Track free testosterone with a simple saliva test.'
          }
        }
      ];
    }
  } catch (err) {
    console.log('Failed to load order from Supabase:', err);
  }
  
  // Fallback to local file if Supabase fails
  if (!order) {
    try {
      const ordersFile = path.join(process.cwd(), 'orders.json');
      if (fs.existsSync(ordersFile)) {
        const data = fs.readFileSync(ordersFile, 'utf8');
        const orders = JSON.parse(data);
        order = orders.find((o: any) => o.id === orderId);
        
        if (order) {
          // Update order status to completed for display
          order.status = 'completed';
          order.total_amount = 12900; // Mock total
          order.order_items = [
            {
              id: '1',
              quantity: order.quantity || 1,
              unit_price: 12900,
              products: {
                name: 'Testosterone Kit',
                description: 'Track free testosterone with a simple saliva test.'
              }
            }
          ];
        }
      }
    } catch (err) {
      console.log('Failed to load order from file:', err);
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
        <Navigation />
        
        <section className="relative pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-12 shadow-soft border border-white/10">
              <h1 className="text-3xl font-bold text-white mb-6">Order Not Found</h1>
              <p className="text-text-muted mb-8">
                The order you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <div className="space-x-4">
                <Link 
                  href="/shop"
                  className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Continue Shopping
                </Link>
                <Link 
                  href="/account"
                  className="inline-block px-8 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                >
                  My Account
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
      case 'cancelled':
        return 'text-red-400';
      case 'processing':
        return 'text-blue-400';
      default:
        return 'text-text-muted';
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return `${baseClasses} bg-green-400/20 text-green-400 border border-green-400/30`;
      case 'pending':
        return `${baseClasses} bg-yellow-400/20 text-yellow-400 border border-yellow-400/30`;
      case 'failed':
      case 'cancelled':
        return `${baseClasses} bg-red-400/20 text-red-400 border border-red-400/30`;
      case 'processing':
        return `${baseClasses} bg-blue-400/20 text-blue-400 border border-blue-400/30`;
      default:
        return `${baseClasses} bg-gray-400/20 text-gray-400 border border-gray-400/30`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Background blur effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-brand/25 via-purple-500/15 to-blue-500/20 rounded-full blur-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-400/20 via-cyan-400/15 to-brand/25 rounded-full blur-blob"></div>
      </div>

      <section className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Order #{orderId.slice(0, 8)}
            </h1>
            <p className="text-text-muted">
              Order placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Order Status */}
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-6">Order Status</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Status:</span>
                  <span className={getStatusBadge(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Total Amount:</span>
                  <span className="text-white font-semibold">
                    {order.total_amount} ISK
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Email:</span>
                  <span className="text-white">
                    {order.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-6">Items Ordered</h2>
              
              <div className="space-y-4">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {item.products?.name || 'Product'}
                      </h3>
                      {item.products?.description && (
                        <p className="text-sm text-text-muted mt-1">
                          {item.products.description}
                        </p>
                      )}
                      <p className="text-sm text-text-muted mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {item.unit_price} ISK
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-text-muted">
                          {item.unit_price * item.quantity} ISK total
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kit Information */}
            <div className="bg-bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/10 lg:col-span-2">
              <h2 className="text-2xl font-semibold text-white mb-6">Test Kit Information</h2>
              
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Kit Allocated</h3>
                <p className="text-text-muted mb-4">
                  Your test kit has been successfully allocated and is ready for use.
                </p>
                
                <div className="bg-brand/10 border border-brand/20 rounded-xl p-6 max-w-md mx-auto">
                  <div className="text-center">
                    <h4 className="text-brand font-semibold mb-2">Test Kit Code</h4>
                    <p className="text-3xl font-mono font-bold text-white tracking-wider mb-2">
                      TK-{orderId.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-text-muted">
                      Status: Ready for use
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Creation Notice for Guests */}
          {!user && (
            <div className="bg-brand/10 border border-brand/20 rounded-3xl p-8 shadow-soft mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/20 rounded-full mb-6">
                  <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Create Your Account</h3>
                <p className="text-text-muted mb-6 max-w-lg mx-auto">
                  Create an account to easily track all your orders, view detailed test results, and get personalized health insights.
                </p>
                <div className="space-x-4">
                  <Link 
                    href="/signup"
                    className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Create Account
                  </Link>
                  <Link 
                    href="/login"
                    className="inline-block px-8 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="text-center mt-12">
            <div className="space-x-4">
              <Link 
                href="/shop"
                className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
              {user && (
                <Link 
                  href="/account"
                  className="inline-block px-8 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                >
                  My Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}