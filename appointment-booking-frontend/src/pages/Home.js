import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Lifecare Hospital</h1>
          <p>Your health is our mission. Get expert medical care with compassion and technology.</p>
          <div className="button-center">
            <Link to="/book-appointment" className="hero-btn">Book Appointment</Link>
          </div>
        </div>
        {/* <div className="hero-image">
          <img src="https://cdn.pixabay.com/photo/2017/08/06/00/06/people-2583443_1280.jpg" alt="Hospital" />
        </div> */}
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Specialties</h2>
        <div className="cards">
          <div className="card">
            <img src="https://cdn.pixabay.com/photo/2017/09/25/13/12/heart-2785210_1280.jpg" alt="Cardiology" />
            <h3>Cardiology</h3>
            <p>Advanced heart care with expert cardiologists and diagnostic facilities.</p>
          </div>
          <div className="card">
            <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/doctor-1295578_1280.png" alt="Pediatrics" />
            <h3>Pediatrics</h3>
            <p>Gentle and professional care for your little ones, always.</p>
          </div>
          <div className="card">
            <img src="https://cdn.pixabay.com/photo/2016/11/14/03/16/brain-1828506_1280.jpg" alt="Neurology" />
            <h3>Neurology</h3>
            <p>Cutting-edge neurological treatments with trusted specialists.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
