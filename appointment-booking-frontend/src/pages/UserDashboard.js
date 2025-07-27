import React, { useEffect, useState } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/appointments/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setError(data.message || 'Something went wrong');
        }
      } catch (err) {
        setError('Failed to fetch appointments');
      }
    };

    fetchAppointments();
    const interval = setInterval(fetchAppointments, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Remove time from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ✅ Filter upcoming and past
  const upcoming = appointments
    .filter(a => {
      const apptDate = new Date(a.date);
      apptDate.setHours(0, 0, 0, 0);
      return apptDate.getTime() >= today.getTime();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const past = appointments
    .filter(a => {
      const apptDate = new Date(a.date);
      apptDate.setHours(0, 0, 0, 0);
      return apptDate.getTime() < today.getTime();
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getStatusClass = (status) => {
    switch (status) {
      case 'booked': return 'status-booked';
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';     
      case 'ongoing': return 'status-ongoing';       // ✅ new
     case 'completed': return 'status-completed';   
      default: return '';
    }
  };

  return (
    <div className="dashboard-container">
      <h2>My Dashboard</h2>

      {error && <p className="error-msg">{error}</p>}

      <section className="dashboard-section">
        <h3>Upcoming Appointments</h3>
        {upcoming.length ? upcoming.map((a, i) => (
          <div className="appointment-card" key={i}>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
            <p><strong>Problem:</strong> {a.reason || 'N/A'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
            </p>
          </div>
        )) : <p>No upcoming appointments.</p>}
      </section>

      <section className="dashboard-section">
        <h3>Past Appointments</h3>
        {past.length ? past.map((a, i) => (
          <div className="appointment-card" key={i}>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
            <p><strong>Problem:</strong> {a.reason || 'N/A'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
            </p>
          </div>
        )) : <p>No past appointments.</p>}
      </section>
    </div>
  );
};

export default UserDashboard;
