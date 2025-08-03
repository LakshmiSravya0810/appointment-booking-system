import React, { useEffect, useState } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/appointments/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setAppointments(data);
        setError(null);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch {
      setError('Failed to fetch appointments');
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
      case 'ongoing': return 'status-ongoing';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (res.ok) {
        fetchAppointments(); // ✅ fetch latest status from backend
      } else {
        alert('Failed to cancel appointment');
      }
    } catch {
      alert('Error cancelling appointment');
    }
  };

  const openRescheduleModal = (id) => {
    setRescheduleId(id);
    setNewDate('');
    setNewTime('');
  };

  const closeRescheduleModal = () => {
    setRescheduleId(null);
    setNewDate('');
    setNewTime('');
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();

    if (!newDate || !newTime) {
      alert('Please select both date and time');
      return;
    }

    const selectedDateTime = new Date(`${newDate}T${newTime}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      alert('Please select a future date and time');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${rescheduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ date: newDate, time: newTime })
      });

      if (res.ok) {
        alert('Appointment rescheduled successfully');
        fetchAppointments(); // ✅ get the latest update including status
        closeRescheduleModal();
      } else {
        alert('Failed to reschedule appointment');
      }
    } catch {
      alert('Error rescheduling appointment');
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
            <p><strong>Time:</strong> {a.time}</p>
            <p><strong>Doctor:</strong> {a.doctor}</p>
            <p><strong>Problem:</strong> {a.reason || 'N/A'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
            </p>
            {a.status !== 'cancelled' && a.status !== 'completed' && (
              <div className="action-buttons">
                <button className="cancel-btn" onClick={() => handleCancel(a._id)}>Cancel</button>
                <button className="reschedule-btn" onClick={() => openRescheduleModal(a._id)}>Reschedule</button>
              </div>
            )}
          </div>
        )) : <p>No upcoming appointments.</p>}
      </section>

      <section className="dashboard-section">
        <h3>Past Appointments</h3>
        {past.length ? past.map((a, i) => (
          <div className="appointment-card" key={i}>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {a.time}</p>
            <p><strong>Doctor:</strong> {a.doctor}</p>
            <p><strong>Problem:</strong> {a.reason || 'N/A'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
            </p>
          </div>
        )) : <p>No past appointments.</p>}
      </section>

      {/* Reschedule Modal */}
      {rescheduleId && (
        <div className="modal-overlay" onClick={closeRescheduleModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Reschedule Appointment</h3>
            <form onSubmit={handleRescheduleSubmit}>
              <label>
                New Date:
                <input
                  type="date"
                  value={newDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setNewDate(e.target.value)}
                  required
                />
              </label>
              <label>
                New Time:
                <input
                  type="time"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={closeRescheduleModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
