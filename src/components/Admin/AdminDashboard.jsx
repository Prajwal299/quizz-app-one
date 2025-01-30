


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Manage questions, quizzes, and more!</p>
      </div>

      {/* Create Question Container */}
      <div 
        onClick={() => navigate('/admin/create_question')}
      >
        <div className="create-question-card">
          <h3>Create Question</h3>
          <p>Click here to create new questions for the quiz</p>
        </div>
      </div>

      {/* Results Container */}
      <div 
        className="results-container"
        onClick={() => navigate('/admin/results')}
      >
        <div className="results-card">
          <h3>View Results</h3>
          <p>Click here to view all user results</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
