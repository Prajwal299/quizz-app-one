import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password,
      });

      console.log("Login response:", response);

      const { access_token, user } = response.data;
      const { is_admin, first_name, last_name } = user;

      if (access_token) {
        console.log("Access token received:", access_token);
        console.log("Is admin status:", is_admin);

        // Ensure first_name and last_name are not undefined
        const fullName = `${first_name || ''} ${last_name || ''}`.trim();  // Handle undefined gracefully
        console.log("User full name:", fullName);

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('is_admin', is_admin);
        localStorage.setItem('userName', fullName || 'Anonymous User');

        if (is_admin) {
          console.log("Redirecting to admin dashboard");
          navigate('/admin-dashboard');
        } else {
          console.log("Redirecting to user dashboard");
          navigate('/user');
        }
      } else {
        setError('No token received.');
        console.log("No token received");
      }
    } catch (error) {
      setError('Login failed: ' + (error.response ? error.response.data.message : error.message));
      console.error('Login error:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Login</h2>
      </div>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="submit-btn-container">
          <button type="submit" className="submit-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
