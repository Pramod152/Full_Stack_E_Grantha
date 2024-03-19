import React from "react";
import NavBar from "./Components/NavBar";
import "./WelcomeUserCSS/HomePage.css";
import TopSubscribedCourses from "./Components/TopSubscribedCourse_Section";
import Footer from "./Components/Footer";
import Button from "./Components/Button";
import Testimonials from "./Components/Testimonials";

const HomePage = () => {
  const isHome = true;

  const handleClick = () => {
    window.location.href = "/E-Grantha/course";
  };
  return (
    <>
      <NavBar />
      <div className="hero-section">
        <section className="hero-wrapper">
          <div className="hero-content">
            <div className="hero-text-content">
              <h1 className="hero-title">E-Grantha</h1>
              <p className="hero-subtitle">
                Harmony Unleashed, Anytime, Anywhere.
              </p>
              <div className="hero-button-group">
                <span onClick={handleClick}>
                  <Button BtnName="View Courses" />
                </span>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <img
                src="/Hero_image.png"
                alt="Hero Image"
                className="hero-image"
              />
            </div>
          </div>
        </section>
      </div>

      <TopSubscribedCourses isHome/>
      <section className="testimonials">
        <div className="testimonials_container">
          <h2>Testimonial</h2>
          <div className="testimonials_card_container">
            <Testimonials />
            <Testimonials />
            <Testimonials />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
