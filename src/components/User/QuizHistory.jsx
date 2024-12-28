import React, { useEffect, useState } from 'react';
import { getQuizHistory } from '../../api/userApi';

const QuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await getQuizHistory();
      setHistory(response.data);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Quiz History</h2>
      <ul>
        {history.map((quiz, index) => (
          <li key={index}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizHistory;
