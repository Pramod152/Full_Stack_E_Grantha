import React from "react";
import NavBar from "../../../components/NavBar/NavBar_Welcome/NavBar";
import "./HomePage.css";
import SearchBox from "../../../components/Search_Course/Search_Box";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Course_Section from "../../../components/Course_Section/Course_Section";
import Footer from "../../../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <NavBar />

      <div className="hero-section">
        
        <SearchBox size="large" iconName={faSearch} />
        <p className="hero-text">Learn Best Online Courses</p>
      </div>
      {Course_Section()}
      <Footer />
    </>
  );
};

export default HomePage;
