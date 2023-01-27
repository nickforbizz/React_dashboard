import React from 'react';
import './home2.css';
import heroImage from './hero-image.png';
import Partners from './Partners';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Accordion from './Accordion';
import Footer from './Footer';


function Hero() {
  return (
    <><section className="hero">
      <img src={heroImage} alt="Hero" className="hero-image" />
      <div className="hero-text-container">
        <h1 className="hero-title"><span style={{color: '#397ADB'}}>Auto-Mtumba</span> Sellers Package <span style={{color: '#FBC300'}}>Space</span></h1>
        <p className="hero-description">We help Automotive spares sellers improve business processes by automating their Store and Business Management Systems.Through our Tailor-Made Automotive Business solutions Package you can now keep track of spares in your shop and/or store and make them available to buyers easily.</p>
        <button className="hero-cta-button">Sign Up</button>
      </div>
    </section><div>
      
        <Section1 />
        <Partners />
        <Section2 />
        <Section3 />
        <Accordion />
        <Footer />
      </div></>
    
  );
}

export default Hero;
