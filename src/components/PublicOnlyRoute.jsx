import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';


function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? <Navigate to="/produtos" replace /> : <Outlet />;
}

export default PublicOnlyRoute;