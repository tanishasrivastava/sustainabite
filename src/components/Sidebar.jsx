import React, { useState } from "react";
import "./../styles/components/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-details">
          <div className="logo_name">SustainaBite</div>
          <i
            className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
            id="btn"
            onClick={toggleSidebar}
          ></i>
        </div>
        <ul className="nav-list">
          <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Home</span>
            </a>
            <span className="tooltip">Home</span>
          </li>
          <li>
            <a href="/user">
              <i className="bx bx-user"></i>
              <span className="links_name">User</span>
            </a>
            <span className="tooltip">User</span>
          </li>
          <li>
            <a href="/about">
              <i className="bx bx-info-circle"></i>
              <span className="links_name">About</span>
            </a>
            <span className="tooltip">About</span>
          </li>
          <li>
          <a href="/feedback">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Feedback</span>
            </a>
            <span className="tooltip">Feedback</span>
<<<<<<< HEAD
=======
          </li>
          <li>
            <a href="#">
              <i className="bx bx-folder"></i>
              <span className="links_name">File Manager</span>
            </a>
            <span className="tooltip">Files</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cart-alt"></i>
              <span className="links_name">Order</span>
            </a>
            <span className="tooltip">Order</span>
>>>>>>> c87ae4e (Updated the sidebar and phoneotp page)
          </li>
          
     
            
          <li>
            <a href="/community-funding">
              <i className="bx bx-heart"></i>
              <span className="links_name">Community Funding</span>
            </a>
            <span className="tooltip">Community Funding</span>
          </li>
          <li>
            <a href="/volunteer-registration">
              <i className="bx bx-cog"></i>
              <span className="links_name">Become A Volunteer </span>
            </a>
            <span className="tooltip">Become A Volunteer</span>
          </li>
         
          <li className="profile">
            <div className="profile-details">
              <i className="bx bx-export"></i>
              <div className="name_job">
                <div className="name">Logout</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
