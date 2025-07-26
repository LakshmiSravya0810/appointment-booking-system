import React from 'react';
import './HealthTips.css';

const HealthTips = () => {
  return (
    <div className="health-tips-container">
      <h2>Health Tips & Articles</h2>

      <div className="blog-cards">
        <div className="blog-card">
          <h3>🌞 Stay Hydrated This Summer</h3>
          <p>Drinking enough water is crucial during hot days. Aim for at least 8 glasses of water daily. Include water-rich fruits like watermelon and cucumbers in your diet.</p>
        </div>

        <div className="blog-card">
          <h3>🍽️ Tips for a Healthy Digestive System</h3>
          <p>Eat plenty of fiber, stay active, avoid processed foods, and drink lots of water. Don’t forget to chew your food thoroughly for better digestion.</p>
        </div>

        <div className="blog-card">
          <h3>🩺 Early Symptoms of Diabetes</h3>
          <p>Increased thirst, frequent urination, fatigue, and blurred vision are early signs. Talk to your doctor if you notice these symptoms.</p>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
