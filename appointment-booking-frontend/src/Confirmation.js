// src/Confirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>No appointment data found.</h2>
        <button onClick={() => navigate('/')}>Go back</button>
      </div>
    );
  }

  const { name, doctor, date, time, email, phone, reason, status } = state;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>✅ Appointment Confirmed!</h1>
      <p>🩺 Scheduled with <strong>{doctor}</strong> for <strong>{name}</strong></p>
      <p>📅 {new Date(date).toLocaleDateString()} ⏰ {time}</p>
      <p>📧 {email} | 📞 {phone}</p>
      <p>📝 {reason}</p>
      <p>🟢 Status: {status}</p>

      <button onClick={() => navigate('/')}>Book Another</button>
    </div>
  );
}

export default Confirmation;
