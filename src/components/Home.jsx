import React from 'react';
import './Home.css';  // Import the custom CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Quiz App</h1>
        <p className="hero-description">
          Test your knowledge with our exciting quizzes. Join us and challenge yourself!
        </p>
        <div className="action-buttons">
          <a href="/login" className="login-btn">Login</a>
          <a href="/register" className="register-btn">Register</a>
        </div>
      </div>
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Variety of Quizzes</h3>
            <p>Choose from a wide range of quiz categories to test your knowledge!</p>
          </div>
          <div className="feature-card">
            <h3>Compete with Friends</h3>
            <p>Challenge your friends and see who scores the highest!</p>
          </div>
          <div className="feature-card">
            <h3>Instant Results</h3>
            <p>Get real-time results and track your progress over time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
