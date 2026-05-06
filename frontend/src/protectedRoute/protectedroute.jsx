import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== allowedRole) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;