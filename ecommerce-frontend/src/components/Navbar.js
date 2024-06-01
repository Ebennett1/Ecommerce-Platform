import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

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
