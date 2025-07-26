import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Lifecare Hospital</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book-appointment">Book Appointment</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/health-tips">Health Tips</Link></li>
        <li><Link to="/login">Login</Link></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
