import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AppointmentBooking from './AppointmentBooking'; // ✅ using existing file
<h1 className="text-3xl font-bold text-blue-600">Welcome to Appointment Booking</h1>

function AdminDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
