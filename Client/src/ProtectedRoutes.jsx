// ProtectedRoutes.jsx
import {Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './NewDesign/UserPage/Auth/AuthContext';
import PrivateRoute from './NewDesign/UserPage/Auth/PrivateRoute';
import HomePage from './NewDesign/UserPage/Pages/WelcomeUser/HomePage';
import AboutPage from './NewDesign/UserPage/Pages/WelcomeUser/About';   
import CoursesPage from './NewDesign/UserPage/Pages/WelcomeUser/Course';
import ContactPage from './NewDesign/UserPage/Pages/WelcomeUser/Contact';
import UserRegistrationPage from './NewDesign/UserPage/Pages/WelcomeUser/UserRegistrationPage';
import UserDashboardPage from './NewDesign/UserPage/Pages/UserDashboard/UserDashboardPage';

const ProtectedRoutes = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/E-Grantha/" element={<HomePage />} />
        <Route path="/E-Grantha/about" element={<AboutPage />} />
        <Route path="/E-Grantha/course" element={<CoursesPage />} />
        <Route path="/E-Grantha/contact" element={<ContactPage />} />
        <Route path="/E-Grantha/register" element={<UserRegistrationPage />} />
        <PrivateRoute path="/E-Grantha/userdashboard" element={<UserDashboardPage />} />
      </Routes>
      </Router>
    </AuthProvider>
  );
};

export default ProtectedRoutes;