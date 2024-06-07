import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <header className="header-container">
      <div className="navbar">
        <div id="sidebar" className="sidebar">
          <button className="closebtn" onClick={() => document.getElementById("sidebar").style.width = "0"}>×</button>
          <Link to="/categories">Shop By <br></br> Category</Link>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
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
        <div id="main">
          <button className="openbtn" onClick={() => document.getElementById("sidebar").style.width = "250px"}>☰</button>
        </div>
        <h1>Welcome To EliteCart!</h1>
        <form className='search-form' onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products"
          />
          <button className='search-bar' type="submit">Search</button>
        </form>
        <div className="footer-icon">
        <Link to="/cart"><i className="fas fa-shopping-cart"></i><span>Cart</span></Link>
      </div>
      </div>
    </header>
  );
};

export default Header;
