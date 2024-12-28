// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './StartQuiz.css';

// const StartQuiz = () => {
//   const { category } = useParams();
//   const navigate = useNavigate(); // Use navigate hook for redirection
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [countdown, setCountdown] = useState(5); // 5 second countdown after submission

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           setError('Access token is missing');
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(`http://127.0.0.1:5000/questions/${category}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch questions: ' + response.statusText);
//         }

//         const data = await response.json();
//         setQuestions(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [category]);

//   const handleAnswerSelect = (questionId, answer) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const handleSubmitQuiz = async () => {
//     const unansweredQuestions = questions.filter(q => !selectedAnswers[q.id]);
//     if (unansweredQuestions.length > 0) {
//       setSubmitStatus({
//         type: 'error',
//         message: 'Please answer all questions before submitting.'
//       });
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         throw new Error('Access token is missing');
//       }

//       const userName = localStorage.getItem('userName') || 'Anonymous User';

//       const formattedAnswers = questions.map(question => ({
//         id: question.id,
//         answer: selectedAnswers[question.id]
//       }));

//       const submitData = {
//         user_name: userName,
//         category: category,
//         answers: formattedAnswers
//       };

//       const response = await fetch('http://127.0.0.1:5000/submit_answers', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(submitData)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to submit quiz');
//       }

//       setSubmitStatus({
//         type: 'success',
//         message: `Quiz submitted successfully! Your score: ${data.score}`
//       });

//       // Start countdown after submission
//       setCountdown(5);
//       const countdownInterval = setInterval(() => {
//         setCountdown(prev => {
//           if (prev <= 1) {
//             clearInterval(countdownInterval);
//             // Redirect to result page after countdown finishes
//             navigate('/results');
//           }
//           return prev - 1;
//         });
//       }, 1000);

//     } catch (error) {
//       setSubmitStatus({
//         type: 'error',
//         message: error.message
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="quiz-container">
//       <h1 className="quiz-title">Start Quiz - {category}</h1>
//       {questions.length > 0 ? (
//         <div className="questions-container">
//           {questions.map((question) => (
//             <div key={question.id} className="question-card">
//               <h3 className="question-text">{question.question}</h3>
//               <div className="options-container">
//                 {Object.entries(question.options).map(([key, value]) => (
//                   <label key={key} className={`option-label ${selectedAnswers[question.id] === key ? 'selected' : ''}`}>
//                     <input 
//                       type="radio" 
//                       name={`question-${question.id}`} 
//                       value={key}
//                       checked={selectedAnswers[question.id] === key}
//                       onChange={() => handleAnswerSelect(question.id, key)}
//                       className="option-input"
//                     />
//                     {key}: {value}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))}

//           {submitStatus && (
//             <div className={`status-message ${submitStatus.type}`}>
//               {submitStatus.message}
//             </div>
//           )}

//           <button
//             onClick={handleSubmitQuiz}
//             disabled={isSubmitting}
//             className="submit-button"
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
//           </button>
//         </div>
//       ) : (
//         <div>No questions available for this category.</div>
//       )}

//       {/* Display countdown */}
//       {countdown > 0 && (
//         <div className="countdown-timer">
//           Redirecting to results in {countdown} seconds...
//         </div>
//       )}
//     </div>
//   );
// };

// export default StartQuiz;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StartQuiz.css';

const StartQuiz = () => {
  const { category } = useParams();
  const navigate = useNavigate(); // Use navigate hook for redirection
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(null); // Initially null to avoid countdown before submission

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Access token is missing');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://127.0.0.1:5000/questions/${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch questions: ' + response.statusText);
        }

        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = async () => {
    const unansweredQuestions = questions.filter(q => !selectedAnswers[q.id]);
    if (unansweredQuestions.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Please answer all questions before submitting.'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Access token is missing');
      }

      const userName = localStorage.getItem('userName') || 'Anonymous User';

      const formattedAnswers = questions.map(question => ({
        id: question.id,
        answer: selectedAnswers[question.id]
      }));

      const submitData = {
        user_name: userName,
        category: category,
        answers: formattedAnswers
      };

      const response = await fetch('http://127.0.0.1:5000/submit_answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit quiz');
      }

      setSubmitStatus({
        type: 'success',
        message: `Quiz submitted successfully! Your score: ${data.score}`
      });

      // Start countdown after successful submission
      setCountdown(5); // Set countdown to 5 seconds
      
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Redirect to result page after countdown finishes
            navigate('/results');
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Start Quiz - {category}</h1>
      {questions.length > 0 ? (
        <div className="questions-container">
          {questions.map((question) => (
            <div key={question.id} className="question-card">
              <h3 className="question-text">{question.question}</h3>
              <div className="options-container">
                {Object.entries(question.options).map(([key, value]) => (
                  <label key={key} className={`option-label ${selectedAnswers[question.id] === key ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name={`question-${question.id}`} 
                      value={key}
                      checked={selectedAnswers[question.id] === key}
                      onChange={() => handleAnswerSelect(question.id, key)}
                      className="option-input"
                    />
                    {key}: {value}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {submitStatus && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <button
            onClick={handleSubmitQuiz}
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      ) : (
        <div>No questions available for this category.</div>
      )}

      {/* Display countdown only after submission */}
      {countdown !== null && countdown > 0 && (
        <div className="countdown-timer">
          Redirecting to results in {countdown} seconds...
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
