import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
      <h1 className="righteous-regular">About SustainaBITE</h1>
      <p className="righteous-regular">Your trusted companion in reducing food waste and making an impact.</p>
      </div>
      <div className="about-content">
        <section>
        <h2 className="righteous-regular">Our Mission</h2>
        <p className="righteous-regular">
            At SustainaBITE, we aim to bridge the gap between surplus food and those in need, 
            ensuring that every bite counts. By leveraging technology, we connect donors with 
            charities, reducing food waste and hunger simultaneously.
          </p>
        </section>
        <section>
        <h2 className="righteous-regular">What We Do</h2>
        <p className="righteous-regular">
            SustainaBITE facilitates the donation of excess food from individuals, restaurants, 
            and businesses to NGOs and food banks. We use a seamless, user-friendly platform 
            to streamline this process and ensure maximum efficiency.
          </p>
        </section>
        <section>
        <h2 className="righteous-regular">Why Choose Us</h2>
           <ul className="righteous-regular">
            <li>Easy and secure food donation system.</li>
            <li>Transparent tracking of donations.</li>
            <li>Impact-driven platform making a real difference.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
