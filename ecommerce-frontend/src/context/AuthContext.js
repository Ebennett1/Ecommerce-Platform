import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
  );

  const loginUser = async (username, password) => {
    const response = await axios.post('login/', { username, password });
    const data = response.data;

    setAuthTokens(data);
    setUser(jwtDecode(data.access));
    localStorage.setItem('authTokens', JSON.stringify(data));
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
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
