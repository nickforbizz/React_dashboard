import React, { useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./accordion.css";

library.add(faCaretDown)



function Section() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="section">
      <h1 className="section-title">Answers to all your questions</h1>
      <div className="accordion">
        <div className="accordion-item">
          <button 
            className={`accordion-button ${activeIndex === 0 ? 'active' : ''}`}
            onClick={() => handleClick(0)}
          >
            What does Automtumba Business Solutions offer?
 
           <FontAwesomeIcon icon="caret-down" className={`${activeIndex === 0 ? 'active' : ''}`} />
          </button>
          <div
            className={`accordion-content ${activeIndex === 0 ? 'show' : ''}`}
          >
            Through our Tailor-Made Automotive Business solutions Package, businesses can now keep track of spares in their shop and/or store and make them available to buyers easily. Components of the package include; a Seller's package and an Online marketplace
          </div>
        </div>
        <div className="accordion-item">
          <button 
            className={`accordion-button ${activeIndex === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1)}
          >
            What are Seller Packages?
            <FontAwesomeIcon icon="caret-down" className={`${activeIndex === 0 ? 'active' : ''}`} />
          </button>
          <div
            className={`accordion-content ${activeIndex === 1 ? 'show' : ''}`}
          >
            A seller package is an integrated system that can store data about a store’s or shop wares and can be easily retrieved and/or updated to ensure that businesses can keep track of sales, payments and stock available. This creates an avenue for data driven decision making
          </div>
        </div>
        <div className="accordion-item">
          <button 
            className={`accordion-button ${activeIndex === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2)}
          >
            How do I use your services?
            <FontAwesomeIcon icon="caret-down" className={`${activeIndex === 0 ? 'active' : ''}`} />

          </button>
          <div
            className={`accordion-content ${activeIndex === 2 ? 'show' : ''}`}
          >
            Register with us today and gain access to our seller's package and our online marketplace.  We offer tailor made business solutions for automotive spares sellers that is easy to use and guarantees safety of your store’s data.

          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
