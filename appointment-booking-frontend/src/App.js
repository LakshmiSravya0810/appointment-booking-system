import React, { useState, useEffect } from 'react';

function App() {
  const [viewMode, setViewMode] = useState('form'); // 'form' or 'list'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [appointments, setAppointments] = useState([]);
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
        headers: { 'Content-Type': 'application/json' },
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

  const fetchAppointments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/appointments');
      const data = await res.json();
      console.log('Fetched appointments:', data);

      if (Array.isArray(data)) {
        setAppointments(data);
      } else if (Array.isArray(data.appointments)) {
        setAppointments(data.appointments); // if backend sends { appointments: [...] }
      } else {
        console.error("Expected an array but got:", data);
        setAppointments([]); // fallback
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (viewMode === 'list') {
      fetchAppointments();
    }
  }, [viewMode]);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Appointment Booking</h1>

      <button onClick={() => setViewMode(viewMode === 'form' ? 'list' : 'form')}>
        {viewMode === 'form' ? '📋 View Appointments' : '➕ Book New Appointment'}
      </button>

      {viewMode === 'form' ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange}
            required pattern="\d{10}" maxLength="10" title="Phone number must be exactly 10 digits" />
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
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <h2>All Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments.map((a) => (
              <div key={a._id} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem', borderRadius: '8px' }}>
                <strong>{a.name}</strong> with <strong>{a.doctor}</strong><br />
                📅 {new Date(a.date).toLocaleDateString()} ⏰ {a.time}<br />
                📧 {a.email} | 📞 {a.phone}<br />
                📝 {a.reason}<br />
                🟢 Status: {a.status}
              </div>
            ))
          )}
        </div>
      )}

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default App;
