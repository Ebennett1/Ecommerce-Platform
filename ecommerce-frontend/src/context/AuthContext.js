import React, { createContext, useState, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null
  );

  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post('login/', { username, password });
      const data = response.data;

      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      return true;  // Indicate success
    } catch (error) {
      console.error('Login failed:', error);
      return false;  // Indicate failure
    }
  };

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (authTokens) {
      const decodedUser = jwtDecode(authTokens.access);
      setUser(decodedUser);
      console.log('User decoded from token:', decodedUser);
    }
  }, [authTokens]);
  

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
