import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../css/Testimonials.css';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <section className="testimonials">
        <div className="testimonials-container">
          <p className="testimonials-loading">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="testimonials">
        <div className="testimonials-container">
          <p className="testimonials-error">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="testimonials">
        <div className="testimonials-container">
          <p className="testimonials-error">No testimonials available.</p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Clients Say</h2>
        <p className="testimonials-subtitle">Real feedback from real clients who trusted us.</p>

        <div 
          className="testimonials-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button 
            className="testimonials-btn prev" 
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <div className="testimonials-card-wrapper">
            <div 
              className="testimonials-card"
              key={currentIndex}
            >
              {/* Rating Stars */}
              <div className="testimonials-stars">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Quote */}
              <p className="testimonials-quote">"{currentTestimonial.quote}"</p>

              {/* Client Info */}
              <div className="testimonials-client">
                <h4 className="testimonials-name">{currentTestimonial.name}</h4>
                <small className="testimonials-title-text">{currentTestimonial.title}</small>
              </div>
            </div>
          </div>

          <button 
            className="testimonials-btn next" 
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;