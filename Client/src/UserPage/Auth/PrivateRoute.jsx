import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/E-Grantha/register" state={{ from: location }} />;
};

export default PrivateRoute;