import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "./context/userStore"; // Asegúrate de ajustar la ruta

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useUserStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    checkAuth: state.checkAuth,
  }));

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
