import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/About';
import CoursesPage from './pages/CoursePage/Course';
import ContactPage from './pages/ContactPage/Contact';
import LoginPage from './components/Login_SignUp/Login_SignUp';
import U_Dashboard from './pages/UserDashboardPage/U_Dashboard';
import Registration from './pages/RegistrationPage/Registration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/course" element={<CoursesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Registration />} />
        <Route path="/udashboard" element={<U_Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
