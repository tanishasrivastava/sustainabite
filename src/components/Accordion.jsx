import React, { useState } from "react";
import "./Accordion.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const accordionData = [
    {
      title: "Who can use this platform?",
      description:
        "Anyone can join! Restaurants, grocery stores, households, and NGOs can list or collect surplus food. Whether you're donating or receiving, SustainaBite makes it easy to connect and make a difference.",
    },
    {
      title: "How can I donate surplus food on SustainaBite?",
      description:
        "Simply sign up, create a listing with details like food type, quantity, and pickup location, and post it. NGOs or individuals nearby will be notified and can coordinate the pickup seamlessly.",
    },
    {
      title: "Is there a cost involved in using SustainaBite?",
      description:
        "No, SustainaBite is completely free for donors and recipients. Optional donations can be made to support the platform's operations or partner NGOs.",
    },
    {
      title: "How do we ensure food safety?",
      description:
        "We encourage donors to share fresh, edible food and provide guidelines for proper packaging and labeling. NGOs and recipients are notified about the donation’s condition to ensure transparency.",
    },
  ];

  return (
    <div className="accordion">
      {accordionData.map((item, index) => (
        <div
          className={`accordion-content ${activeIndex === index ? "open" : ""}`}
          key={index}
        >
          <header onClick={() => toggleAccordion(index)}>
            <span className="title">{item.title}</span>
            <i
              className={`fa-solid ${
                activeIndex === index ? "fa-minus" : "fa-plus"
              }`}
            ></i>
          </header>
          <p
            className="description"
            style={{
              height: activeIndex === index ? "auto" : "0",
              overflow: "hidden",
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
