import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';  // Import the CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/register', formData);
      alert('Registration successful');
    } catch (error) {
      alert('Error during registration');
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h2>Register</h2>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="submit-btn-container">
          <button type="submit" className="submit-btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
