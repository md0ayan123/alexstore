import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or sessionStorage

  if (!token) {
    // If token doesn't exist, redirect to login page
    return <Navigate to="/adminlogin" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;