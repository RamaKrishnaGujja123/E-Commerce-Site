import React from 'react';

const OrderConfirmation = ({ status, orderId }) => {
  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Your order has been {status}!</p>
      <p>Order ID: {orderId}</p>
      <button onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
};

export default OrderConfirmation;
