import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-summary">
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
