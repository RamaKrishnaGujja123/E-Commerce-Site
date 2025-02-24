import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css"

const Header = ({ token, onLogout, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate('/products');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/images/Logo.png" alt="Logo" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            {token ? (
              <>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={onLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;