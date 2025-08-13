// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('jwt');
  const initialChanged = localStorage.getItem('intialPasswordChanged') === 'true';
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!initialChanged && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" />;
  }

  return children;
};

export default ProtectedRoute;
