import { useState, useEffect } from 'react';

const useFetchQuestion = (quizId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quizId) {
      setError('Invalid quizId');
      setLoading(false);
      return;
    }

    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/quiz/${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const result = await response.json();
        setData(result);  // Assuming the data is an object containing quiz details
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  return { data, error, loading };
};

export default useFetchQuestion;
