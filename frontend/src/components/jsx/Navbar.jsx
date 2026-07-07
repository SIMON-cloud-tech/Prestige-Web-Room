import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../css/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo with Image */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img 
            src="/logo.png" 
            alt="Prestige Web Room" 
            className="logo-image"
          />
          <span className="logo-jamsi">PRESTIGE</span>
          <span className="logo-technologies">WEB ROOM</span>
        </Link>

        {/* Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <FaTimes size={24} color="#1B2A4A" /> : <FaBars size={24} color="#1B2A4A" />}
        </button>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to} className="nav-item">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="nav-item">
            <Link to="/contact" className="nav-cta" onClick={closeMenu}>
              Start a Project
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;