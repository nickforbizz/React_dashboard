import React from "react";
import "./partners.css";
import p1 from './p1.png';
import p2 from './p2.png';
import p3 from './p3.png';
import p4 from './p4.png';

function BusinessLogoSection() {
  return (
    <div className="business-logo-section">
      <h2 className="section-title"><span style={{color: '#397ADB'}}>Our Partners</span></h2>
      <div className="logos-container">
        <img src={p1} alt="Business 1 Logo" className="p1" />
        <img src={p2} alt="Business 2 Logo" className="p2" />
        <img src={p4} alt="Business 4 Logo" className="p4" />
        <img src={p3} alt="Business 3 Logo" className="p3" />

      </div>
    </div>
  );
}

export default BusinessLogoSection;
