import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/categories">Search For <br></br>Products By Category</Link>
      <Link to="/cart">Cart</Link>
      {user ? (
        <>
          <span className="welcome-message">Welcome, {user.username}</span>
          <Link to="/profile">Profile</Link>
          <Link to="/order-history">Order History</Link>
          <Link to="/checkout">Checkout</Link>
          <form className='search-form' onSubmit={handleSearch} style={{ display: 'inline' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products"
        />
        <button className='search-bar' type="submit">Search</button>
      </form>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

    </nav>
  );
};

export default Navbar;
