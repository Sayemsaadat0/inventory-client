import PropTypes from "prop-types";
import React from "react";

import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem("user");

  const location = useLocation();

  if (isAuthenticated) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
}

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
