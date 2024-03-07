// App.jsx
import React, {Fragment} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./NewDesign/UserPage/Auth/AuthContext";
import PrivateRoute from "./NewDesign/UserPage/Auth/PrivateRoute";
import HomePage from "./NewDesign/UserPage/Pages/WelcomeUser/HomePage";
import AboutPage from "./NewDesign/UserPage/Pages/WelcomeUser/About";
import CoursesPage from "./NewDesign/UserPage/Pages/WelcomeUser/Course";
import ContactPage from "./NewDesign/UserPage/Pages/WelcomeUser/Contact";
import UserRegistrationPage from "./NewDesign/UserPage/Pages/WelcomeUser/UserRegistrationPage";
import UserDashboard from "./NewDesign/UserPage/Pages/UserDashboard/UserDashboardPage";
import AdminPanel from './NewDesign/AdminPage/Pages/AdminPanel'
import CourseDetailPage from './NewDesign/UserPage/Pages/WelcomeUser/CourseDetailPage'
import Login_Signup from './NewDesign/AdminPage/Pages/Login_Signup'
import AdminPrivateRoute from "./NewDesign/AdminPage/Auth/AdminPrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/E-Grantha" element={<HomePage />} />
            <Route path="/E-Grantha/about" element={<AboutPage />} />
            <Route path="/E-Grantha/course" element={<CoursesPage />} />
            <Route path="/E-Grantha/contact" element={<ContactPage />} />
            <Route path="/E-Grantha/register" element={<UserRegistrationPage />} />
            <Route path="/E-Grantha/adminregister" element={<Login_Signup />} />
            <Route path="/E-Grantha/dashboard" element={<PrivateRoute>
              <UserDashboard />
            </PrivateRoute>} />
            <Route path="/E-Grantha/admin" element={<AdminPrivateRoute>
              <AdminPanel />
            </AdminPrivateRoute>} />
            <Route path="/E-Grantha/coursedetail" element={<CourseDetailPage />} />
            <Route path="/" element={<HomePage />} /> {/* Add this line */}
          </Routes>
        </Fragment>
      </Router>
    </AuthProvider>
  );
};

export default App;
