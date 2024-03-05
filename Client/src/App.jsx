import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./NewDesign/UserPage/Pages/WelcomeUser/HomePage";
import AboutPage from "./NewDesign/UserPage/Pages/WelcomeUser/About";
import CoursesPage from "./NewDesign/UserPage/Pages/WelcomeUser/Course";
import ContactPage from "./NewDesign/UserPage/Pages/WelcomeUser/Contact";
import SearchFilter from "./NewDesign/UserPage/Component/SearchFilter";
import MainDashboard from './NewDesign/AdminPage/Pages/MainDashboard'
import UserDashboardPage from './NewDesign/UserPage/Pages/UserDashboard/UserDashboardPage'
const App = () => {
  return (
    <Router>
      <Routes>
        // Routes for User
        <Route path="/E-Grantha/" element={<HomePage />} />
        <Route path="/E-Grantha/about" element={<AboutPage />} />
        <Route path="/E-Grantha/course" element={<CoursesPage />} />
        <Route path="/E-Grantha/contact" element={<ContactPage />} />
        <Route path="/E-Grantha/register" element={<Registration />} />
        {/* <Route path="/E-Grantha/coursedetail" element={<CourseDetail />} /> //Still Not Implemented */}
        // Routes for User Dashboard
        {/* <Route path="/E-Grantha/udashboard" element={<U_Dashboard />} /> */}
        // Routes for Admin
        <Route path="/E-Grantha/search" element={<SearchFilter />} />
        <Route path="/E-Grantha/dashboard" element={<MainDashboard />} />
        <Route path="/E-Grantha/userdashboard" element={<UserDashboardPage />} />
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
// -------> CourseDetailPage (Add subscribe garney button to subscribe that particular course)
