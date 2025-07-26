import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AppointmentBooking from './AppointmentBooking';
import AdminDashboard from './AdminDashboard'; // ✅ Import the actual component
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* ✅ Use imported one */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
