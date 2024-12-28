import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Result.css'

const UserResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const userName = localStorage.getItem('userName');
        
        if (!token) {
          navigate('/login');
          return;
        }

        if (!userName) {
          setError('User name not found');
          setLoading(false);
          return;
        }

        // Encode the username for the URL to handle spaces and special characters
        const encodedUsername = encodeURIComponent(userName);

        const response = await axios.get(`http://localhost:5000/user/results/${encodedUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch results');
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate]);

  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const userName = localStorage.getItem('userName');

  return (
    <div className="results-container">
      <h2>{userName}'s Quiz Results</h2>
      {results.length === 0 ? (
        <p>No quiz results found. Try taking a quiz!</p>
      ) : (
        <div className="results-grid">
          {results.map((result) => (
            <div key={result.id} className="result-card">
              <div className="result-header">
                <h3>Quiz Result #{result.id}</h3>
                <span className="category-badge">{result.category}</span>
              </div>
              <div className="result-body">
                <p className="score">Total Points: {result.total_points}</p>
                <div className="answers-section">
                  <h4>Your Answers:</h4>
                  <div className="answers-grid">
                    {result.answers.map((answer, index) => (
                      <div key={index} className="answer-item">
                        <span>Q{index + 1}: </span>
                        <span className={`answer ${answer.is_correct ? 'correct' : 'incorrect'}`}>
                          {answer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserResults;
