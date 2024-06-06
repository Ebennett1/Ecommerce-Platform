// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icon">
        <Link to="/products"><i className="fas fa-home"></i><span>Shop</span></Link>
      </div>
      <div className="footer-icon">
        <Link to="/order-history"><i className="fas fa-list"></i><span>Lists</span></Link>
      </div>
      <div className="footer-icon">
        <Link to="/profile"><i className="fas fa-user"></i><span>Account</span></Link>
      </div>
      <div className="footer-icon">
        <Link to="/cart"><i className="fas fa-shopping-cart"></i><span>Cart</span></Link>
      </div>
    </footer>
  );
};

export default Footer;
