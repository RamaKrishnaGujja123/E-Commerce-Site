import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/carts/1') // Example for cart data
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price} x {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
