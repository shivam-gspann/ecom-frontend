import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("token");

  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export default Protected;
