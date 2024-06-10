import React, { createContext, useState, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store authentication tokens
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  // State to store user information decoded from the token
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null
  );

  const navigate = useNavigate();

  // Function to handle user login
  const loginUser = async (username, password) => {
    try {
      const response = await axiosInstance.post('login/', { username, password });
      const data = response.data;

      setAuthTokens(data);  // Save tokens to state
      setUser(jwtDecode(data.access));  // Decode and save user information
      localStorage.setItem('authTokens', JSON.stringify(data));  // Save tokens to localStorage
      console.log('Auth Tokens:', data);
      return true;  // Indicate success
    } catch (error) {
      console.error('Login failed:', error);
      return false;  // Indicate failure
    }
  };

  // Function to handle user logout
  const logoutUser = useCallback(() => {
    setAuthTokens(null);  // Clear tokens from state
    setUser(null);  // Clear user information from state
    localStorage.removeItem('authTokens');  // Remove tokens from localStorage
    navigate('/login');  // Navigate to login page
  }, [navigate]);

  // Effect to update user state when tokens change
  useEffect(() => {
    if (authTokens) {
      const decodedUser = jwtDecode(authTokens.access);
      setUser(decodedUser);
      console.log('User decoded from token:', decodedUser);
    }
  }, [authTokens]);

  // Function to handle user registration
  const registerUser = async (username, email, password) => {
    try {
      const response = await axiosInstance.post('/register/', {
        username,
        email,
        password,
      });
      return true;  // Indicate success
    } catch (error) {
      console.error('Registration failed:', error);
      return false;  // Indicate failure
    }
  };

  // Context data to be shared with other components
  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    registerUser,
  };

  // Provide context data to children components
  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
