import NavBar from '../../components/NavBar/NavBar_Welcome/NavBar';
import React from 'react';
import './About.css';

const AboutPage = () => {
    return (
        <>
          <NavBar />
    <div className="about-us-container">
      <header>
        <h1>Welcome to E-Grantha - Your Gateway to Eastern Classical Music!</h1>
      </header>
      <section className="introduction">
        <p>
          Welcome to E-Grantha, where the ancient melodies of Eastern Classical Music meet modern technology.
          We are delighted to have you here, as we embark on a musical journey that transcends time and borders.
        </p>
      </section>
      <section className="mission">
        <h2>Mission Statement:</h2>
        <p>
          At E-Grantha, our mission is to preserve and propagate the rich heritage of Eastern Classical Music
          through accessible and immersive online learning experiences. We envision a world where the profound beauty
          of this art form is appreciated and passed on to future generations.
        </p>
      </section>
      <section className="story">
        <h2>Our Story:</h2>
        <p>
          Founded out of a passion for Eastern Classical Music and a desire to make it accessible to a global audience,
          E-Grantha has evolved from a dream into a dedicated E-Learning Platform. Overcoming challenges, our journey
          has been fueled by the belief that music has the power to connect, inspire, and transform lives.
        </p>
      </section>
      <section className="sets-us-apart">
        <h2>What Sets Us Apart:</h2>
        <p>
          Discover the E-Grantha advantage! Our platform stands out through a blend of traditional teaching methodologies
          and cutting-edge technology. Interactive lessons, personalized feedback, and a supportive community create an unparalleled
          learning experience.
        </p>
      </section>
    </div>  
        </>
    );
}

export default AboutPage;