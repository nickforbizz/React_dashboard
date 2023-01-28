import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from './logo.png'

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} className="footer-logo" alt="logo" />
      <div className="contact-info">
      <div className="phone-info">
      <FontAwesomeIcon icon={faPhone} className="icon" />
        <a href="tel:123-456-7890" className="phone-number">123-456-7890</a>
      </div>
      <div className="email-info">
      <FontAwesomeIcon icon={faEnvelope} className="icon" />
        <a href="mailto:info@example.com" className="email">automtumbabusinesssolutions@gmail.com</a>
      </div>
    </div>
      <div className="footer-links">
        
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default Footer;

