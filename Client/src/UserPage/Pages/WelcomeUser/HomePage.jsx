import React from "react";
import NavBar from './Components/NavBar';
import "./WelcomeUserCSS/HomePage.css";
import TopSubscribedCourses from './Components/TopSubscribedCourse_Section';
import Footer from './Components/Footer';

const HomePage = () => {
  const isHome = true;
  return (
    <>
      <NavBar />

      <div className="hero-section">
        
        <p className="hero-text">Learn Best Online Courses</p>
      </div>
      <TopSubscribedCourses />
      <Footer />
    </>
  );
};

export default HomePage;
