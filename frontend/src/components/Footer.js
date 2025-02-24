import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import '../App.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} All rights reserved to @Rama Krishna Gujja</p>

        {/* Social Media Links */}
        <section className="social-media-links">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={30} />
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
