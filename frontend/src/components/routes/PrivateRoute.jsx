import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";

/**
 * PrivateRoute component to protect routes based on authentication and roles
 * @param {React.ReactNode} children - The component/s to render if authorized
 * @param {string[]} roles - Optional array of allowed roles ['student', 'admin']
 */
const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader message="Verifying access..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
