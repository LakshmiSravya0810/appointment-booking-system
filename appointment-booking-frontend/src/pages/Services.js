import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-page-container">
      <h1>Our Medical Services</h1>
      <p>We offer a wide range of healthcare services to meet the needs of patients of all ages.</p>

      <div className="service-list">
        <div className="service-box">
          <h3>Cardiology</h3>
          <p>Heart care, diagnostic testing, and interventional procedures with expert cardiologists.</p>
        </div>
        <div className="service-box">
          <h3>Pediatrics</h3>
          <p>Comprehensive child care and immunizations in a friendly and safe environment.</p>
        </div>
        <div className="service-box">
          <h3>Neurology</h3>
          <p>Advanced treatment for neurological disorders, stroke, and neuro diagnostics.</p>
        </div>
        <div className="service-box">
          <h3>Orthopedics</h3>
          <p>Joint replacements, fractures, and physiotherapy for all your orthopedic needs.</p>
        </div>
        <div className="service-box">
          <h3>Emergency Care</h3>
          <p>24x7 emergency services for critical and trauma care by trained specialists.</p>
        </div>
        <div className="service-box">
          <h3>General Surgery</h3>
          <p>Minimally invasive and open surgical procedures across multiple specialties.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
