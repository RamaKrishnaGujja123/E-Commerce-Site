import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/CartPage';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import axios from 'axios';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [products, setProducts] = useState([]);

  // Fetch products on initial render
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.product._id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
