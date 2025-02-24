import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Home = ({ onAddToCart }) => {
  // Initialize state for the active carousel item
  const [activeIndex, setActiveIndex] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      name: "Anna Morian",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp",
      text: "Shopping on this platform has been a game-changer. The product quality is top-notch and delivery is always timely. Highly recommend!" 
    },
    {
      name: "Teresa May",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp",
      text: "I've found some amazing deals here that I couldn't find anywhere else. The customer service is also very responsive and helpful."
    },
    {
      name: "Kate Allise",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp",
      text: "I was skeptical at first, but after my first purchase, I was hooked. The quality and service are both outstanding."
    }
  ];

  // Function to move to the next or previous testimonial
  const moveCarousel = (direction) => {
    const newIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
    setActiveIndex(newIndex);
  };

  return (
    <div className="home-container">
      {/* Hero Section (Bootstrap Style) */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="hero-text">
                <h1>Top-Selling Products</h1>
                <p>Discover the best products with amazing deals.</p>
                <Link to="/products" className="cta-button btn btn-primary">Shop Now</Link>
              </div>
              <img src="/images/HeroBanner.png" alt="Hero Banner" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {/* Product 1 */}
          <div className="product-card">
            <img src="/images/Monitor.jpg" alt="Dell 8K Monitor" />
            <h3>Dell 8K Monitor-UP3218K</h3>
            <p>Special Price</p>
            <p>$399.99</p>
            <button onClick={() => onAddToCart({ id: 1, name: 'Dell 8K Monitor', price: 399.99 })}>Add to Cart</button>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <img src="/images/SSD.jpg" alt="Western Digital Red SA500 SSD" />
            <h3>Western Digital Red SA500 SSD</h3>
            <p>Special Price</p>
            <p>$99.99</p>
            <button onClick={() => onAddToCart({ id: 2, name: 'Western Digital Red SA500 SSD', price: 99.99 })}>Add to Cart</button>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <img src="/images/Laptop.jpg" alt="Acer Predator Helios 300 Gaming" />
            <h3>Acer Predator Helios 300 Gaming</h3>
            <p>Special Price</p>
            <p>$999.99</p>
            <button onClick={() => onAddToCart({ id: 3, name: 'Acer Predator Helios 300 Gaming', price: 999.99 })}>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="product-categories">
        <h2>Categories</h2>
        <div className="categories-grid">
          <Link to="/products/category/electronics" className="category-card">
            <img src="/images/Electronics.jpg" alt="Electronics" />
            <h3>Electronics</h3>
          </Link>

          <Link to="/products/category/jewelery" className="category-card">
            <img src="/images/Jewellary.jpg" alt="Jewelry" />
            <h3>Jewelry</h3>
          </Link>

          <Link to="/products/category/men's clothing" className="category-card">
            <img src="/images/Mens Clothing.jpg" alt="Men's Clothing" />
            <h3>Men's Clothing</h3>
          </Link>

          <Link to="/products/category/women's clothing" className="category-card">
            <img src="/images/Womens Clothing.jpg" alt="Women's Clothing" />
            <h3>Women's Clothing</h3>
          </Link>
        </div>
      </section>

      {/* Offers and Promotions */}
      <section className="offers-promotions">
        <div className="offer-container">
          <h2>Special Offers</h2>
          <div className="offer-content">
            <img src="/images/SpecialOffer.jpg" alt="Special Offer" className="offer-image" />
            <div className="offer-info">
              <h3>50% Off on Selected Items</h3>
              <Link to="/products" className="cta-button btn btn-primary">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="testimonials">
        <div className="testimonials-container">
          <h2>Testimonials</h2>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="rounded-circle img-fluid shadow-1-strong" />
              <div className="carousel-caption d-none d-md-block">
                <h5>{testimonials[activeIndex].name}</h5>
                <p>{testimonials[activeIndex].text}</p>
              </div>
            </div>
          </div>

          {/* Left Arrow */}
          <button className="carousel-control-prev" onClick={() => moveCarousel(-1)}>
            &#10094;
          </button>

          {/* Right Arrow */}
          <button className="carousel-control-next" onClick={() => moveCarousel(1)}>
            &#10095;
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>Welcome to <strong>Our Store</strong>, your ultimate destination for quality products, exceptional service, and unbeatable prices.</p>
        <p>At <strong>Our Store</strong>, we believe that shopping should be an experience, not just a transaction. Our mission is to make shopping easier, more enjoyable, and more rewarding for our customers by offering a wide range of carefully curated products from trusted brands. Whether you're looking for the latest trends, timeless classics, or something truly unique, we have something for everyone.</p>

        <h3>Our Story</h3>
        <p>Founded with a simple yet powerful idea in mind — to create a seamless online shopping experience — <strong>Our Store</strong> has grown into a trusted brand for customers around the world. With years of experience in the e-commerce industry, we've built our reputation on delivering high-quality products, fast shipping, and excellent customer support.</p>
        <p>We understand that choosing the right product is important, so we offer a carefully curated selection with detailed descriptions, ratings, and customer reviews to help you make informed decisions.</p>

        <h3>Why Choose Us?</h3>
        <ul>
          <li><strong>Wide Selection</strong>: From fashion to home goods, we have it all. Our products are sourced from trusted suppliers and manufacturers, ensuring you get the best quality.</li>
          <li><strong>Competitive Prices</strong>: We offer the best value for your money. Get high-quality products without breaking the bank.</li>
          <li><strong>Customer-Centric Service</strong>: Our dedicated customer support team is here to assist you every step of the way, from browsing to checkout and beyond.</li>
          <li><strong>Secure Shopping</strong>: We take your privacy and security seriously. Shopping with us is safe, secure, and hassle-free.</li>
          <li><strong>Fast Delivery</strong>: We pride ourselves on fast, reliable shipping to get your products to you as quickly as possible.</li>
        </ul>

        <h3>Our Vision</h3>
        <p>Our vision is to be the go-to online store for anyone looking to purchase quality products with confidence. We aim to redefine e-commerce by putting the customer at the center of everything we do.</p>

        <h3>Join the Community</h3>
        <p>We're more than just a store; we're a community of passionate shoppers who value quality, convenience, and great deals. Follow us on social media and stay connected with exclusive offers, product updates, and more.</p>

        <p>Thank you for choosing <strong>Our Store</strong>. We look forward to making your shopping experience exceptional!</p>
      </section>

      {/* Navigation Links */}
      <div className="navigation-links">
        <h3>Follow Us:</h3>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
