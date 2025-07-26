import React, { useState } from 'react';
import './AppointmentBooking.css';

function AppointmentBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Appointment booked!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          doctor: '',
          date: '',
          time: '',
          reason: ''
        });
      } else {
        setMessage('❌ Failed: ' + (data.message || data.error));
      }
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input
          type="text"
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="\d{10}"
          maxLength="10"
        />
        <select name="doctor" value={formData.doctor} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          <option value="Dr. Rao">Dr. Rao</option>
          <option value="Dr. Mehta">Dr. Mehta</option>
          <option value="Dr. Kapoor">Dr. Kapoor</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} rows="3" />
        <button type="submit">Book Appointment</button>
      </form>

      {message && <p className="appointment-message">{message}</p>}
    </div>
  );
}

export default AppointmentBooking;
