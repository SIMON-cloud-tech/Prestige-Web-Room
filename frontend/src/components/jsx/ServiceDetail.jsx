import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from './SEO';
import { FaArrowLeft } from 'react-icons/fa';
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaBuilding,
  FaNewspaper,
} from 'react-icons/fa';
import '../css/serviceDetail.css';

// Map icon strings to actual React components
const iconMap = {
  FaMoneyBillWave: FaMoneyBillWave,
  FaShoppingCart: FaShoppingCart,
  FaBuilding: FaBuilding,
  FaNewspaper: FaNewspaper,
};

function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch('/data/services.json');
        if (!res.ok) throw new Error('Failed to fetch service data');
        const data = await res.json();

        const foundService = data.services.find((s) => s.slug === slug);

        if (!foundService) {
          throw new Error('Service not found');
        }

        setService(foundService);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="service-detail-loading">
        <div className="loader-spinner"></div>
        <p>Loading service details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="service-detail-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <Link to="/services" className="service-detail-back-btn">
          Back to Services
        </Link>
      </div>
    );
  }

  // If no service found
  if (!service) {
    return (
      <div className="service-detail-error">
        <h2>Service Not Found</h2>
        <p>The service you're looking for doesn't exist.</p>
        <Link to="/services" className="service-detail-back-btn">
          Back to Services
        </Link>
      </div>
    );
  }

  // Get the icon component from the map
  const IconComponent = iconMap[service.icon];

  return (
    <section className="service-detail">
      <SEO
        title={service.title}
        description={service.shortDescription}
        keywords={`${service.title}, ${service.slug}, software development Kenya`}
        canonicalPath={`/services/${service.slug}`}
        type="article"
      />
      <div className="service-detail-container">
        {/* Back Button */}
        <Link to="/services" className="service-detail-back">
          <FaArrowLeft /> Back to Services
        </Link>

        {/* Service Content */}
        <div className="service-detail-content">
          <div className="service-detail-icon">
            {IconComponent ? <IconComponent /> : '🔹'}
          </div>
          <h1 className="service-detail-title">{service.title}</h1>
          <p className="service-detail-full-description">{service.fullDescription}</p>

          {/* Features */}
          <div className="service-detail-section">
            <h2>What We Offer</h2>
            <ul className="service-detail-list">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="service-detail-section">
            <h2>Why Choose Us</h2>
            <ul className="service-detail-list benefits">
              {service.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Case Study */}
          {service.caseStudy && (
            <div className="service-detail-section case-study">
              <h2>Case Study</h2>
              <div className="case-study-card">
                <h3>{service.caseStudy.title}</h3>
                <p>{service.caseStudy.description}</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <Link to="/contact" className="service-detail-cta">
            {service.cta || 'Start a Project'}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetail;