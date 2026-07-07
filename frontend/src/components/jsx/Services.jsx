import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaBuilding,
  FaNewspaper,
} from 'react-icons/fa';
import '../css/Services.css';

const iconMap = {
  FaMoneyBillWave,
  FaShoppingCart,
  FaBuilding,
  FaNewspaper,
};

function Services() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/data/services.json');
        if (!res.ok) throw new Error('Failed to fetch services');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <div className="services-loading">Loading...</div>;
  if (error) return <div className="services-error">Error: {error}</div>;
  if (!data || !data.services) return <div className="services-error">No services found</div>;

  return (
    <section className="services">
      <div className="services-container">
        <h2 className="services-title">{data.title}</h2>
        <p className="services-subtitle">{data.subtitle}</p>

        <div className="services-grid">
          {data.services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon">{Icon ? <Icon /> : '🔹'}</div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.shortDescription}</p>
                <ul className="service-features">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Link to={`/services/${service.slug}`} className="service-link">
                  Learn More →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;