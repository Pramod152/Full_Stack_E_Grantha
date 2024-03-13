import React from "react";
import NavBar from "../../../../components/NavBar/NavBar_Welcome/NavBar";
import "./WelcomeUserCSS/HomePage.css";
import SearchBox from "../../../../components/Search_Course/Search_Box";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Course_Section from "../../../../components/Course_Section/Course_Section";
import Footer from "../../../../components/Footer/Footer";

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
