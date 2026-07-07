import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className='hero-overlay' />
      <div className="hero-container">
        <h1 className="hero-title">
          We Build Digital Infrastructure <br />
          <span className="hero-highlight">That Scales.</span>
        </h1>
        <p className="hero-subtitle">
          Custom web platforms, fintech solutions, and e-commerce engines for African businesses. 
          Engineered with precision, hosted with sovereignty.
        </p>
        <div className="hero-button">
          <Link to="/contact" className="btn-primary">
            Start a Project
          </Link>
        </div>
     </div>
    </section>
  );
}

export default Hero;