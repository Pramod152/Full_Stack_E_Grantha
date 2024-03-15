// App.jsx
import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./UserPage/Auth/AuthContext";
import { AdminAuthProvider } from "./AdminPage/Auth/AdminAuthContext";
import PrivateRoute from "./UserPage/Auth/PrivateRoute";
import HomePage from "./UserPage/Pages/WelcomeUser/HomePage";
import AboutPage from "./UserPage/Pages/WelcomeUser/About";
import CoursesPage from "./UserPage/Pages/WelcomeUser/Course";
import ContactPage from "./UserPage/Pages/WelcomeUser/Contact";
import UserRegistrationPage from "./UserPage/Pages/WelcomeUser/UserRegistrationPage";
import UserDashboard from "./UserPage/Pages/UserDashboard/UserDashboardPage";
import AdminPanel from './AdminPage/Pages/AdminPanel'
// import CourseDetailPage from './UserPage/Pages/WelcomeUser/CourseDetailPage'
import AdminRegistrationPage from './AdminPage/Pages/AdminRegistrationPage'
import AdminPrivateRoute from "./AdminPage/Auth/AdminPrivateRoute";
const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/E-Grantha" element={<HomePage />} />
            <Route path="/E-Grantha/about" element={<AboutPage />} />
            <Route path="/E-Grantha/course" element={<CoursesPage />} />
            <Route path="/E-Grantha/contact" element={<ContactPage />} />
            <Route path="/E-Grantha/register" element={<UserRegistrationPage />} />
            <Route path="/E-Grantha/dashboard" element={<PrivateRoute>
            <UserDashboard />
            </PrivateRoute>} />
            {/* <Route path="/E-Grantha/coursedetail" element={<CourseDetailPage />} /> */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>

      <AdminAuthProvider>
        <Router>
          <Routes>
            <Route path="/E-Grantha/adminregister" element={<AdminRegistrationPage />} />

            <Route path="/E-Grantha/admin" element={
              <AdminPrivateRoute>
            <AdminPanel />
            </AdminPrivateRoute>
            } />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </>
  );
};

export default App;