import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // ✅ Import custom CSS

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
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
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'user' })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Registered successfully! Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage('❌ ' + (data.message || data.error));
      }
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create an Account</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p className={`register-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default Register;
