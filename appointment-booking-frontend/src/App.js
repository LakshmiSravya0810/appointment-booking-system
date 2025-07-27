import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AppointmentBooking from './AppointmentBooking';
import AdminDashboard from './AdminDashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Services from './pages/Services';
import Footer from './components/Footer';
import HealthTips from './pages/HealthTips';
import UserDashboard from './pages/UserDashboard';
import './App.css';

function AppContent() {
  const location = useLocation();

  // Hide Navbar and Footer only on admin dashboard
  const hideLayout = location.pathname === '/admin-dashboard';

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/health-tips" element={<HealthTips />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
