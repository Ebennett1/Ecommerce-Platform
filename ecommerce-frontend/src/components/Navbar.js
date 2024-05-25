import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/order-history">Order History</Link>
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
