import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
