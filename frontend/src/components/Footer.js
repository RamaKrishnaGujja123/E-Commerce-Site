import React from 'react';
import '../App.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} All rights reserved to @Rama Krishna Gujja</p>
    </footer>
  );
};

export default Footer;