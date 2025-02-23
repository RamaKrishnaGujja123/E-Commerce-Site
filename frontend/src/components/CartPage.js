import React, { useState, useEffect } from "react";

// CartPage Component
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching cart data from API
  useEffect(() => {
    fetch("https://dummyjson.com/carts/1") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.products); // Set the fetched cart items
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      });
  }, []);

  // Handle item removal from cart
  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
    console.log(`Item with id ${productId} removed`);
  };

  // If cart is loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>
            <p>
              ${item.price} x {item.quantity}
            </p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Cart Summary */}
      <div>
        <h3>Cart Summary</h3>
        <p>Total items: {cartItems.length}</p>
        <p>
          Total Price: $
          {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        </p>
      </div>
    </div>
  );
};

export default CartPage;
