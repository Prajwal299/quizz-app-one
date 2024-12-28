
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from the API
  const getCategories = async () => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('Retrieved access token:', token);

      if (!token) {
        setError('Access token is missing');
        console.error('Access token is missing');
        return;
      }

      console.log('Making request to fetch categories...');
      const response = await fetch('http://127.0.0.1:5000/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories: ' + response.statusText);
      }

      const data = await response.json();
      console.log('Fetched categories:', data);

      setCategories(data.categories);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching categories...');
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    // Navigate to the StartQuiz page for the selected category
    navigate(`/start-quiz/${category}`);
  };

  return (
    <div className="user-dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>

      {/* Error handling */}
      {error && <p className="error-message">{error}</p>}

      {/* Display categories */}
      <div className="categories-grid">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div 
              key={index} 
              className="category-card" 
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
