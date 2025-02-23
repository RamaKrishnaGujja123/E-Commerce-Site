import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '' });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      const orderData = {
        user_id: 1,  // Mock user ID
        products: cart,
        total
      };
      
      const response = await axios.post('/api/orders', orderData);
      setPaymentStatus(response.data.status);
      localStorage.removeItem('cart');  // Clear cart after placing the order
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <input
          type="text"
          name="name"
          value={userInfo.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={userInfo.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <textarea
          name="address"
          value={userInfo.address}
          placeholder="Shipping Address"
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handlePlaceOrder} disabled={isLoading}>
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>

      {paymentStatus && (
        <div className="order-confirmation">
          <h2>Order Status: {paymentStatus}</h2>
          <button onClick={() => history.push('/')}>Go to Home</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
