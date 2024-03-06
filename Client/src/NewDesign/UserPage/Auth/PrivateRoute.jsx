// // PrivateRoute.jsx
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoute = () => {
//     const auth = localStorage.getItem('authToken'); // Check if the user is authenticated

//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return auth ? <Outlet /> : <Navigate to="/E-Grantha/login" />;
// }

// export default PrivateRoute;
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/E-Grantha/register" state={{ from: location }} />;
};

export default PrivateRoute;