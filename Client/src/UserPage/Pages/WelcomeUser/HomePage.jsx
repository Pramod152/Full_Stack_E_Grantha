import React from "react";
import NavBar from './Components/NavBar';
import "./WelcomeUserCSS/HomePage.css";
import Course_Section from './Components/Course_Section';
import Footer from './Components/Footer';

const HomePage = () => {
  const isHome = true;
  return (
    <>
      <NavBar />

      <div className="hero-section">
        
        <p className="hero-text">Learn Best Online Courses</p>
      </div>
      <Course_Section  renderCount={4} isHome={isHome}/>
      <Footer />
    </>
  );
};

export default HomePage;
