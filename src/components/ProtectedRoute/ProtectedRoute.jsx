import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, isLoggedInLoading }) {
  if (isLoggedInLoading) return null;
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
