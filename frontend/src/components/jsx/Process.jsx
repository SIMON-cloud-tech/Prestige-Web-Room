import React from 'react';
import { FaSearch, FaCubes, FaCode, FaRocket } from 'react-icons/fa';
import '../css/Process.css';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn your business and define the problem. Understanding your goals is our first priority.',
    icon: <FaSearch />,
  },
  {
    number: '02',
    title: 'Architecture',
    description: 'We design a system that\'s secure, fast, and maintainable. Built to last from day one.',
    icon: <FaCubes />,
  },
  {
    number: '03',
    title: 'Development',
    description: 'We build with clean code, regular demos, and zero surprises. You\'re involved every step of the way.',
    icon: <FaCode />,
  },
  {
    number: '04',
    title: 'Deployment',
    description: 'We launch on reliable infrastructure and hand over the keys. Your system is live and ready to scale.',
    icon: <FaRocket />,
  },
];

function Process() {
  return (
    <section className="process">
      <div className="process-container">
        <h2 className="process-title">How We Work</h2>
        <p className="process-subtitle">
          A transparent, structured approach that keeps you informed and confident.
        </p>
        <div className="process-grid">
          {steps.map((step) => (
            <div key={step.number} className="process-card">
              <div className="process-number">{step.number}</div>
              <div className="process-icon">{step.icon}</div>
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;