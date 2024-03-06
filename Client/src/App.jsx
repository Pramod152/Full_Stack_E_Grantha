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
import MainDashboard from "./NewDesign/UserPage/Pages/UserDashboard/UserDashboardPage";

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
          <Route path="/E-Grantha/userdashboard" element={<PrivateRoute/>} />
          <Route path="/E-Grantha/dashboard" element={<MainDashboard />} />
        </Routes>
        </Fragment>
      </Router>
    </AuthProvider>
  );
};

export default App;
