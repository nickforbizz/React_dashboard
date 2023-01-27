import React from 'react';
import './section3.css';
import section3Image from './section3.png';

const Section = () => {
  return (
    <div className="section-container">
      <div className="text-container">
        <h2>Reduce Your Warehousing <br /><span style={{color: '#FBC300'}}>Costs!</span> </h2>
        <p>
        Make your products readily available to customers through our integrated Auto-mtumba Online Store. Avoid or Cut your warehousing costs by letting the customer know of your spares consignment upon arrival. We guarantee you a faster day at the market
          
        </p>
      </div><div className="image-container">
      <img src={section3Image} alt="section1" className="section3image" />
      </div>
      
    </div>
  );
};

export default Section;
