import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchAdmin();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/appointments/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  const fetchAdmin = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      console.log("Admin response:", data);  // 👈 ADD THIS
      setAdminName(data.name);    
    } catch (err) {
      console.error('Failed to fetch admin:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setAppointments(prev => prev.filter(apt => apt._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  const filtered = appointments.filter((apt) => {
    const searchMatch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const doctorMatch = doctorFilter ? apt.doctor === doctorFilter : true;
    const statusMatch = statusFilter ? apt.status === statusFilter : true;
    const dateMatch = dateFilter
      ? new Date(apt.date).toISOString().split('T')[0] === dateFilter
      : true;

    return searchMatch && doctorMatch && statusMatch && dateMatch;
  });

  const uniqueDoctors = [...new Set(appointments.map((apt) => apt.doctor))];

  const total = appointments.length;
  const booked = appointments.filter(a => a.status === 'booked').length;
  const confirmed = appointments.filter(a => a.status === 'confirmed').length;
  const cancelled = appointments.filter(a => a.status === 'cancelled').length;

  return (
    <div className="admin-container">
      <h2>Welcome, Admin 👋</h2>
      <h3>Admin Dashboard</h3>

      <div className="overview-cards">
        <div className="card total">Total: {total}</div>
        <div className="card booked">Booked: {booked}</div>
        <div className="card confirmed">Confirmed: {confirmed}</div>
        <div className="card cancelled">Cancelled: {cancelled}</div>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by name, email or doctor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="admin-search"
      />

      <div className="filter-row">
        <select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="admin-filter"
        >
          <option value="">All Doctors</option>
          {uniqueDoctors.map((doc, i) => (
            <option key={i} value={doc}>{doc}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-filter"
        >
          <option value="">All Status</option>
          <option value="booked">booked</option>
          <option value="confirmed">confirmed</option>
          <option value="cancelled">cancelled</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="admin-filter"
        />
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.name}</td>
                  <td>{apt.email}</td>
                  <td>{apt.phone}</td>
                  <td>{apt.doctor}</td>
                  <td>{new Date(apt.date).toLocaleDateString()}</td>
                  <td>{apt.time}</td>
                  <td>{apt.reason}</td>
                  <td>
                    <select
                      value={apt.status}
                      onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                    >
                      <option value="booked">booked</option>
                      <option value="confirmed">confirmed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(apt._id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  No matching appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
