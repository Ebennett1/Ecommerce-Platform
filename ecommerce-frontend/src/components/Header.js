import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// Header component with navigation and search functionality
const Header = () => {
  // Access user and logout function from AuthContext
  const { user, logoutUser } = useContext(AuthContext);
  // State to manage search query input
  const [searchQuery, setSearchQuery] = useState('');
  // Hook for navigation
  const navigate = useNavigate();

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to products page with search query
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <header className="header-container">
      <div className="navbar">
        {/* Sidebar for navigation links */}
        <div id="sidebar" className="sidebar">
          {/* Close button for sidebar */}
          <button className="closebtn" onClick={() => document.getElementById("sidebar").style.width = "0"}>×</button>
          {/* Navigation links */}
          <Link to="/categories">Shop By Category</Link>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          {/* Conditional rendering based on user authentication status */}
          {user ? (
            <>
              <span className="welcome-message">Welcome, {user.username}</span>
              <Link to="/profile">Profile</Link>
              <Link to="/order-history">Order History</Link>
              <Link to="/checkout">Checkout</Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
        {/* Button to open sidebar */}
        <div id="main">
          <button className="openbtn" onClick={() => document.getElementById("sidebar").style.width = "250px"}>☰</button>
        </div>
        {/* Logo */}
        <img className='logo' src="https://i.imgur.com/6ai8tzZ.png" alt="logo" />
        {/* Search form */}
        <form className='search-form' onSubmit={handleSearch}>
          <input
            className="input is-rounded"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products"
          />
          <button className='button is-info is-rounded' type="submit">Search</button>
        </form>
        {/* Link to cart */}
        <div className="footer-icon">
          <Link to="/cart"><i className="fas fa-shopping-cart"></i><span>Cart</span></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
