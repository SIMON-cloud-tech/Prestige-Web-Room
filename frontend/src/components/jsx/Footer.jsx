// src/components/jsx/Footer.jsx
import { memo } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaPhone,
  FaClock,          // ✅ ADDED
} from 'react-icons/fa';
import '../css/Footer.css';

// Access whatsapp number from the .env file
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '254703433014';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ─── TOP SECTION ─── */}
        <div className="footer-top">

          {/* BUSINESS INFO */}
          <div className="footer-business-info">
            <h2 className="footer-title main">
              <img src="/logo.png" alt="Prestige Web Room" className="footer-logo-image" />
              <span className="footer-logo-jamsi">PRESTIGE</span>
              <span className="footer-logo-technologies">WEB ROOM</span>
            </h2>
            <p className="footer-text">
              We build digital infrastructure that scales — custom web platforms,
              fintech solutions, and e-commerce engines for African businesses.
              Engineered with precision, hosted with sovereignty.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="footer-title small">Quick Links</h2>

            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="footer-title small">Get In Touch</h2>

            <div className="working-hours">
              {/* Working Hours */}
              <div className="working-link">
                <span className="working-icon">
                  <FaClock />
                </span>
                <span>
                  <strong>Working Hours</strong>
                  <p style={{ whiteSpace: 'pre-line' }}>
                    Mon – Sat: 8:00 AM – 11:00 PM
                    {'\n'}Closed: Sundays & Public Holidays
                  </p>
                </span>
              </div>
                  <a 
                     href="https://whatsapp.com/channel/0029VbCgtzl84OmAM5sizM0X" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="whatsapp-btn">
                     <FaWhatsapp className="whatsapp-icon" />
                     Join our WhatsApp Channel
                   </a>
            </div>
          </div>
        </div>

        {/* ─── MIDDLE SECTION ─── */}
        <div className="footer-middle">

          {/* SOCIALS */}
          <div>
            <h2 className="footer-title small">Follow Us</h2>

            <div className="footer-socials">
              <a
                href="www.linkedin.com/in/simon-mbithi-33b61b403"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://twitter.com/jamsi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="https://github.com/SIMON-cloud-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://instagram.com/jamsi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://facebook.com/simon.mbithi.991238"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>

        </div>

        {/* ─── BOTTOM ─── */}
        <div className="footer-bottom">
          <p>
            © {currentYear} JAMSI Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;