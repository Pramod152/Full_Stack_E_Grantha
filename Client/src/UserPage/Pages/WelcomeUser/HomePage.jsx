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
      <section className="hero-wrapper">
			<div className="hero-content">
				<div className="hero-text-content">
					<h1 className="hero-title">Your Title Here</h1>
					<p className="hero-subtitle">Your Subtitle Here</p>
					<p className="hero-description">Your Description Here</p>
					<div className="hero-button-group">
						<button className="hero-button primary">
							Primary Button
						</button>
						<button className="hero-button secondary">
							Secondary Button
						</button>
					</div>
				</div>
				<div className="hero-image-wrapper">
					<img
						src="/Hero_image.png"
						alt="Hero Image"
						className="hero-image"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
      </div>
      <TopSubscribedCourses />
      <Footer />
    </>
  );
};

export default HomePage;
