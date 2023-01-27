import React from 'react';
import './section2.css';
import section2Image from './data access 1.png';

const Section = () => {
  return (
    <div className="section-container">
      <div className="image-container">
      <img src={section2Image} alt="section1" className="section2-image" />
      </div>
      <div className="text-container">
        <h2><span style={{color: '#397ADB'}}>Easy</span> Data Access and <br /><span style={{color: '#FBC300'}}> Data Retrieval</span></h2>
        <p>
        The Automtumba Business solutions package is designed to integrate multiple facets of a company's business allowing the interchange and capturing of information from various business process areas and related stakeholders.
          </p>
      </div>
      
    </div>
  );
};

export default Section;
