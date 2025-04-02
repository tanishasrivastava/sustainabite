// src/pages/Home.js
import React from "react";
import Accordion from "../components/Accordion"; // Import the Accordion component
import Footer from "../components/Footer"; // Import the Footer component
import Slideshow from "../components/Slideshow"; // Import the Slideshow component
import "./Home.css"; // Optional: Add styles specific to the Home component

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-section">
        <h1 className="righteous-regular">Welcome To SustainaBITE!</h1>
        <p className="righteous-regular">
          Connecting Food, People, and Purpose for a Greener Planet.
        </p>

        {/* Slideshow Section */}
        <div className="home-background">
          <Slideshow /> {/* Replace static image with the Slideshow */}
        </div>
        <h2 className="righteous-regulark">Know More About US</h2>
        {/* Accordion Section */}
        <Accordion />
        {/* Lifetime Numbers Image Section */}
<div className="lifetime-numbers">
  <img src="/home_1.png" alt="SustainaBITE Lifetime Numbers" />
</div>

      </div>

      <Footer />
    </div>
  );
};

export default Home;
