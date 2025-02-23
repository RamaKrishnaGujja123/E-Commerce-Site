import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './components/Products';
import CartPage from './components/CartPage';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.product.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <Router>
      <Header token={token} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} onRemoveItem={handleRemoveItem} />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;