"use client";
import { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { sendPostPaymentEmails, markOrderPaid } from "./actions";

// Mock Stripe for development - in production, use real Stripe keys
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mock_key";
const IS_MOCK = PUBLISHABLE_KEY === "pk_test_mock_key";
const stripePromise = loadStripe(PUBLISHABLE_KEY);

function PaymentForm({ clientSecret, orderId, email }: { clientSecret: string; orderId: string; email: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [msg, setMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    setIsProcessing(true);
    setMsg("");
    
    // Mock payment processing for development
    if (clientSecret.includes('mock')) {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentSuccess(true);
      setIsProcessing(false);
      try { await markOrderPaid(orderId) } catch {}
      
      // Send emails after successful payment
      if (email) {
        console.log('Sending post-payment emails...');
        try {
          await sendPostPaymentEmails(email);
          console.log('Post-payment emails sent successfully');
        } catch (error) {
          console.error('Failed to send post-payment emails:', error);
        }
      } else {
        console.log('No email provided for post-payment emails');
      }
      return;
    }
    
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { 
        return_url: `${window.location.origin}/orders/${orderId}` 
      }
    });
    
    setIsProcessing(false);
    
    if (error) {
      setMsg(error.message || "Payment error");
    } else {
      setPaymentSuccess(true);
      try { await markOrderPaid(orderId) } catch {}
      
      // Send emails after successful payment
      if (email) {
        console.log('Sending post-payment emails...');
        try {
          await sendPostPaymentEmails(email);
          console.log('Post-payment emails sent successfully');
        } catch (error) {
          console.error('Failed to send post-payment emails:', error);
        }
      } else {
        console.log('No email provided for post-payment emails');
      }
    }
  }

  if (paymentSuccess) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been processed successfully. You will receive a confirmation email shortly.
          </p>
          
          <div className="space-y-4">
            <a 
              href={`/orders/${orderId}`}
              className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              View Order Status
            </a>
            <div>
              <a 
                href="/shop"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Details</h2>
          
          {/* Payment Methods Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-blue-900 font-medium text-sm">Accepted Payment Methods</h3>
            </div>
            <div className="flex items-center space-x-4 text-sm text-blue-800">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Credit/Debit Cards</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Apple Pay</span>
              </div>
            </div>
          </div>
          
          <PaymentElement 
            options={{
              layout: "tabs",
              paymentMethodOrder: ['apple_pay', 'card']
            }}
          />
        </div>
        
        <button 
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full px-6 py-4 bg-brand text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isProcessing ? "Processing Payment..." : "Complete Payment"}
        </button>
        
        {msg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 text-sm">{msg}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default function StripeCheckoutClient({ clientSecret, orderId, email }: { clientSecret: string; orderId: string; email: string }) {
  // If using mock key (no real Stripe), show simulated success flow to avoid client-side errors
  if (IS_MOCK) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been processed successfully. You will receive a confirmation email shortly.
          </p>
          
          <div className="space-y-4">
            <a 
              href={`/orders/${orderId}`}
              className="inline-block px-8 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              View Order Status
            </a>
            <div>
              <a 
                href="/shop"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#8A7CFF', // brand color
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '12px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm clientSecret={clientSecret} orderId={orderId} email={email} />
    </Elements>
  );
}



