import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Results.css';

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const isAdmin = localStorage.getItem('is_admin');

        if (!token || !isAdmin) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/admin/results', {
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

  const filteredResults = results.filter(result => 
    result.user_name.toLowerCase().includes(filter.toLowerCase()) ||
    result.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-results-container">
      <h2>All Quiz Results</h2>
      <div className="admin-controls">
        <input
          type="text"
          placeholder="Filter by user or category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {filteredResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="admin-results-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Points</th>
                {/* <th>Details</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.user_name}</td>
                  <td>{result.category}</td>
                  <td>{result.total_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminResults;