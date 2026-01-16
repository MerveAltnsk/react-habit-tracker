import { Navigate } from "react-router-dom";

function PrivateRoute({ user, children }) {
  if (!user) {
    // Eğer user yoksa login sayfasına yönlendir
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
