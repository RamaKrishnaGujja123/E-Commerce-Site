import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Use mock user ID for testing
        const response = await axios.get('/api/orders/1');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
              {/* Show the products in the order */}
              <ul>
                {order.products.map(product => (
                  <li key={product.product_id}>
                    <span>{product.product_id.name}</span> - ${product.price} x {product.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
