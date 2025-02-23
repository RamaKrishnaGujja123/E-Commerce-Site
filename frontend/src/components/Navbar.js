import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          {token ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li>
          <Link to="/orders">Order History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;