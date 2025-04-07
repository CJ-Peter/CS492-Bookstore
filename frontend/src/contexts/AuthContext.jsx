// src/contexts/AuthContext.js
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export default AuthContext;

const PrivateRoute = ({ children, roles }) => {
  const { accessToken, userRole } = useContext(AuthContext);
  if (!accessToken) return <Navigate to="/login" />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/" />;
  return children;
};