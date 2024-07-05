import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  element: JSX.Element;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Puedes mostrar un indicador de carga mientras se verifica el estado del usuario
    return <div>Cargando...</div>;
  }

  return user ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
