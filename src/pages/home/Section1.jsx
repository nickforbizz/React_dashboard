import React from 'react';
import './section1.css';
import section1Image from './section-1.png';

const Section = () => {
  return (
    <div className="section-container">
      <div className="text-container">
        <h2><span style={{color: '#397ADB'}}>Simplify</span> Your <span style={{color: '#FBC300'}}>Inventory</span><br />Process</h2>
        <p>
        Simplify your store management processes including stock taking by automating your store inventory. Our tailor-made package allows you to keep a record of wares in your shop or store. Our Sellers package also allows you to retrieve data about your store from the comfort of your phone enabling you to keep track of your suppliers and finances
          
        </p>
      </div><div className="image-container">
      <img src={section1Image} alt="section1" className="section1-image" />
      </div>
      
    </div>
  );
};

export default Section;
