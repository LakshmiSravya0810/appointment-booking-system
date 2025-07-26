import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Lifecare Hospital</h3>
        <p>Committed to your health and well-being.</p>
      </div>

      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/book-appointment">Book Appointment</Link></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>📍 123 Lifecare Street, Hyderabad, India</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ contact@lifecarehospital.com</p>
      </div>
    </footer>
  );
};

export default Footer;
