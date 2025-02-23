import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here'); // Your Stripe public key

const Checkout = ({ cartItems, totalAmount, clearCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true); // Set to true when checkout starts
    const stripe = await stripePromise;

    try {
      // Make a request to your backend to create a checkout session
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe's hosted checkout page in test mode
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsProcessing(false); // Set to false once the checkout process is complete or failed
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p>Total: ${totalAmount}</p>
      <button onClick={handleCheckout} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
};

export default Checkout;
