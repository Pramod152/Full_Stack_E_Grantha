import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/UserPage/HomePage/HomePage";
import AboutPage from "./pages/UserPage/AboutPage/About";
import CoursesPage from "./pages/UserPage/CoursePage/Course";
import ContactPage from "./pages//UserPage/ContactPage/Contact";
import U_Dashboard from "./pages/UserPage/UserDashboardPage/U_Dashboard";
import Registration from "./pages//UserPage/RegistrationPage/Registration";
import SideNav from './NewDesign/AdminPage/Component/SideNav'
import TopBar from './NewDesign/AdminPage/Component/TopBar'
import DashboardLayout from "./AdminPanel/DashboardLayout";
import AllCourses from "./pages/AdminPage/AllCourses/Allcourses";
import AddCourses from "./pages/AdminPage/AllCourses/AddCourses"
const App = () => {
  return (
    <Router>
      <Routes>
      // Routes for User
        <Route path="/E-Grantha/" element={<HomePage />} />
        <Route path="/E-Grantha/about" element={<AboutPage />} />
        <Route path="/E-Grantha/course" element={<CoursesPage />} />
        <Route path="/E-Grantha/contact" element={<ContactPage />} />
        <Route path="/E-Grantha/login" element={<Registration />} />
        {/* <Route path="/E-Grantha/coursedetail" element={<CourseDetail />} /> //Still Not Implemented */}

        // Routes for User Dashboard
        <Route path="/E-Grantha/udashboard" element={<U_Dashboard />} />
        // Routes for Admin
        {/* <Route path="/E-Grantha/admin" element={<DashboardLayout />} />
        <Route path="/E-Grantha/allcourses" element={<AllCourses />} />
        <Route path="/E-Grantha/addcourses" element={<AddCourses />} /> */}
        <Route path="/E-Grantha/sidenav" element={<SideNav />} />
        <Route path="/E-Grantha/topbar" element={<TopBar />} />

      </Routes>
    </Router>
  );
};

export default App;

//Admin Panel Features
//There should be one main Page (Main Dashboard) 
// First -> TopBar left most side ma logo and right most side ma user profile
// Second -> SideBar ma menu items (Dashboard, Users, Courses, LogOut)
// Third -> Main Content ma Dashboard, Users, Courses, LogOut pages chai dynamically view huna paryo
// Fourth -> Footer ma company name and copy right year
{/* <div className="adminpanel">
  <div className="sidenav">
    <ul>
      <li>Account</li>
      <li>Customer</li>
      <li>Conatct</li>
    </ul>
  </div>
  <div className="main">
    <div className="topbar"></div>
    {<div className="custoemmr"></div>}
  </div>
</div> */}

//AdminPage
// -> Component
// ----> SideNav
// ----> TopBar
// ----> Profile Content
// ----> Users Content
// ----> Courses Content
// ----> Dashboard Content
// ----> Footer
// -> Pages
// ----> MainDashboard
// ----> Login

//If Logged Out show Login Page

//UserPage
// -> Component
// ---> NavBar
// ---> LoginForm
// ---> RegistrationForm
// ---> CourseCard
// ---> CourseDetail
// ---> Footer
// ---> Dynamic Button
// ---> Avatar
// ---> CourseRenderingContainer
// ---> CourseDetailComponent
// ---> DispalyRecommendedCourses (Course Card kai thau ma Recommened Course Display Garauney only top 4 Courses)
// 
// -> Pages
//Without Registering user can view only HomePage, AboutPage, CoursePage, ContactPage
// ----> HomePage
// ----> AboutPage
// ----> CoursePage
// -------> View Detail of video ma thichyo vaney tyo course ko detail page jana paryo
// ----> CourseDetailPage
// ----> ContactPage
// ----> LoginPage/RegisterPage
// After Registering user can view UserDashboardPage
// -------> UserDashboardPage
// -------> View ProfilePage
// -------> View CoursesPage
// -------> View SubscribedCoursesPage
// -------> CourseDetailPage (Add subscribe garney button to subscribe that aprticular course)


