import React, { useState, createContext } from 'react';
import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from './cookies';

const API_BASE = 'https://dummyjson.com';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userCookie = getCookie('user');
    return userCookie ? JSON.parse(userCookie) : null;
  });

  const login = async (username, password) => {
    const { data } = await axios.post(`${API_BASE}/auth/login`, {
      username,
      password,
    });
    setUser(data);
    setCookie('user', JSON.stringify(data), 1);
  };

  const logout = () => {
    setUser(null);
    deleteCookie('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
