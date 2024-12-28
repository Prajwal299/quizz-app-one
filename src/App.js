import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/User/UserDashboard';
import CreateQuiz from './components/Admin/CreateQuiz';
import ViewResults from './components/Admin/ViewResults';
import AdminDashboard from './components/Admin/AdminDashboard';
import CreateQuestion from './components/Admin/CreateQuestion';
import EditQuestion from './components/Admin/EditQuestion';
import StartQuiz from './components/User/StartQuiz';
import UserResults from './components/User/UserResults';
import AdminResults from './components/Admin/AdminResults';


// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create_quiz" element={<CreateQuiz />} />
          <Route path="/admin/view_results" element={<ViewResults />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create_question" element={<CreateQuestion />} />
          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/edit-question/:id" element={<EditQuestion />} />
          <Route path="/start-quiz/:category" element={<StartQuiz />} />  {/* Category param */}
          <Route path="/quiz/:quizId" element={<StartQuiz />} />
          <Route path="/results" element={<UserResults />} />
          <Route path="/admin/results" element={<AdminResults />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
