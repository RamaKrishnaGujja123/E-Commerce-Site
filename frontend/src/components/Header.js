import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/Images/Logo.png" alt="Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link to="/orders">Order History</Link>
                </li>
                <li>
                  <div className="user-cart">
                    <Link to="/profile">
                      <img src="/path-to-user-icon.png" alt="User Profile" />
                    </Link>
                    <button onClick={onLogout}>Logout</button>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link> / <Link to="/signup">Signup</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button type="submit">Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
