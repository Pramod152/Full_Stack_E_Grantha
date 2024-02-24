import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/User/HomePage/HomePage';
import AboutPage from './pages/User/AboutPage/About';
import CoursesPage from './pages/User/CoursePage/Course';
import ContactPage from './pages/User/ContactPage/Contact';
import U_Dashboard from './pages/User/UserDashboardPage/U_Dashboard';
import Registration from './pages/User/RegistrationPage/Registration';
import Admin from './pages//Admin/AdminPage/Admin';

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
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
