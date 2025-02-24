import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link here
import axios from 'axios';

const Products = ({ searchQuery, onAddToCart }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { category } = useParams(); // Get the category from the URL

  // Fetch product categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on category or all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = 'https://fakestoreapi.com/products';
        if (category) {
          endpoint += `/category/${encodeURIComponent(category)}`; // Ensure the category is URL encoded
        }
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  // Fetch and filter products based on search query
  useEffect(() => {
    if (searchQuery) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          const filteredProducts = response.data.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProducts(filteredProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }
  }, [searchQuery]);

  return (
    <div className="products-container">
      <h2>Product Categories</h2>
      <ul className="categories-list">
        {categories.map(cat => (
          <li key={cat}>
            <Link to={`/products/category/${encodeURIComponent(cat)}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <h2>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;