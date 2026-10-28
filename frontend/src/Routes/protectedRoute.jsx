import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../context/UserContext/userContext.js";

const ProtectedRoute = ({ Component }) => {
  const { auth } = useContext(userContext);
  const hasToken = Boolean(localStorage.getItem("token"));

  if (!auth && !hasToken) {
    return <Navigate to="/landing" replace />;
  }

  return React.createElement(Component);
};

export default ProtectedRoute;
