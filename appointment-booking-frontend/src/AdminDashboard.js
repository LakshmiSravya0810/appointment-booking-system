import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchAppointments();
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

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Doctor', 'Date', 'Time', 'Reason', 'Status'];
    const rows = filtered.map(apt => [
      apt.name,
      apt.email,
      apt.phone,
      apt.doctor,
      new Date(apt.date).toLocaleDateString(),
      apt.time,
      apt.reason,
      apt.status
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'filtered_appointments.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  // const ongoing = appointments.filter(a => a.status === 'ongoing').length;
  // const completed = appointments.filter(a => a.status === 'completed').length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Welcome, Admin 👋</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

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
          <option value="ongoing">ongoing</option>
          <option value="completed">completed</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="admin-filter"
        />
      </div>

      <div style={{ marginTop: '10px', marginBottom: '20px' }}>
        <button onClick={downloadCSV} className="download-btn below-filters">
          📥 Download Filtered Appointments
        </button>
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
                      <option value="ongoing">ongoing</option>
                      <option value="completed">completed</option>
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
