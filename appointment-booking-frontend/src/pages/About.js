import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hospital History */}
      <section className="history">
        <h1>About Lifecare Hospital</h1>
        <p>
          Lifecare Hospital was founded in 1998 with a vision to provide world-class healthcare
          to every individual. Over the last two decades, we’ve grown from a small clinic to a multi-specialty hospital
          serving thousands of patients annually with compassion, dedication, and innovation.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>To deliver personalized, affordable, and high-quality medical care with empathy and excellence.</p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>To become a trusted leader in healthcare by continuously improving patient experience and embracing innovation.</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✅ 24/7 Emergency Care</li>
          <li>✅ Highly Experienced Doctors</li>
          <li>✅ Modern Infrastructure</li>
          <li>✅ Patient-Centered Services</li>
          <li>✅ In-House Diagnostics & Pharmacy</li>
        </ul>
      </section>

      {/* Doctors */}
      <section className="our-doctors">
        <h2>Meet Our Doctors</h2>
        <div className="doctor-cards">
          <div className="doctor-card">
            <div className="avatar">👨‍⚕️</div>
            <h3>Dr. Arjun Mehta</h3>
            <p>Cardiologist with 20+ years of experience in heart care and surgery.</p>
          </div>
          <div className="doctor-card">
            <div className="avatar">👩‍⚕️</div>
            <h3>Dr. Nisha Rao</h3>
            <p>Pediatrician who loves working with children and making healthcare fun.</p>
          </div>
          <div className="doctor-card">
            <div className="avatar">🧠</div>
            <h3>Dr. Rakesh Sharma</h3>
            <p>Neurologist focused on brain and spine care using modern techniques.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
