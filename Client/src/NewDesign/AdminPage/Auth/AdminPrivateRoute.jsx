import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AdminAuthContext } from './AdminAuthContext';

const AdminPrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAdminAuthenticated } = useContext(AdminAuthContext);

  return isAdminAuthenticated ? children : <Navigate to="/E-Grantha/adminregister" state={{ from: location }} />;
};

export default AdminPrivateRoute;
