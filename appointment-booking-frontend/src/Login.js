import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // 🔥 Import the CSS file

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Login successful');
        localStorage.setItem('token', data.token);
        navigate(data.user.role === 'admin' ? '/admin-dashboard' : '/book-appointment');
      } else {
        setMessage('❌ ' + (data.message || data.error));
      }
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to the Appointment Booking System</h1>
      <h2 className="login-subtitle">Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      <p className="login-footer">
        Don’t have an account? <Link className="login-link" to="/register">Register</Link>
      </p>

      {message && <p className={`login-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default Login;
