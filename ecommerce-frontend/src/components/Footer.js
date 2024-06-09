// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

// Footer component with navigation links
const Footer = () => {
  return (
    <footer className="footer">
      {/* Link to the products page with a home icon */}
      <div className="footer-icon">
        <Link to="/products">
          <i className="fas fa-home"></i>
          <span>Shop</span>
        </Link>
      </div>
      
      {/* Link to the order history page with a list icon */}
      <div className="footer-icon">
        <Link to="/order-history">
          <i className="fas fa-list"></i>
          <span>Lists</span>
        </Link>
      </div>
      
      {/* Link to the profile page with a user icon */}
      <div className="footer-icon">
        <Link to="/profile">
          <i className="fas fa-user"></i>
          <span>Account</span>
        </Link>
      </div>
      
      {/* Link to the cart page with a shopping cart icon */}
      <div className="footer-icon">
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
