
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditQuestion = () => {
//   const { id } = useParams();
//   const [question, setQuestion] = useState('');
//   const [optionA, setOptionA] = useState('');
//   const [optionB, setOptionB] = useState('');
//   const [optionC, setOptionC] = useState('');
//   const [optionD, setOptionD] = useState('');
//   const [correctAnswers, setCorrectAnswers] = useState('');  // Changed to string initially
//   const [points, setPoints] = useState('');
//   const [category, setCategory] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const token = localStorage.getItem('access_token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       setIsLoading(true);
//       setError('');
      
//       try {
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await fetch(`http://127.0.0.1:5000/admin/get_question/${id}`, {
//           headers: {
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (response.status === 404) {
//           setError(`Question #${id} not found. Please check if this question exists.`);
//           return;
//         }

//         if (!response.ok) {
//           throw new Error(`Server returned ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
        
//         if (!data || typeof data !== 'object') {
//           throw new Error('Invalid response format');
//         }

//         setQuestion(data.question || '');
//         setOptionA(data.option_a || '');
//         setOptionB(data.option_b || '');
//         setOptionC(data.option_c || '');
//         setOptionD(data.option_d || '');
//         // Handle correct_answers whether it's a string or array
//         if (Array.isArray(data.correct_answers)) {
//           setCorrectAnswers(data.correct_answers.join(', '));
//         } else if (typeof data.correct_answers === 'string') {
//           setCorrectAnswers(data.correct_answers);
//         } else {
//           setCorrectAnswers('');
//         }
//         setPoints(data.points || '');
//         setCategory(data.category || '');
//       } catch (err) {
//         console.error('Error details:', err);
//         setError(`Error fetching question: ${err.message}`);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuestion();
//   }, [id, token, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Convert correctAnswers string to array before sending
//     const answersArray = correctAnswers
//       .split(',')
//       .map(answer => answer.trim().toUpperCase())
//       .filter(answer => answer); // Remove empty strings

//     const questionData = {
//       question,
//       option_a: optionA,
//       option_b: optionB,
//       option_c: optionC,
//       option_d: optionD,
//       correct_answers: answersArray,
//       points: Number(points),
//       category
//     };

//     try {
//       const response = await fetch(`http://127.0.0.1:5000/admin/edit_question/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(questionData),
//       });

//       if (response.status === 404) {
//         setError(`Question #${id} not found. Please check if this question still exists.`);
//         return;
//       }

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(errorData?.message || `Failed to update question (${response.status})`);
//       }

//       navigate('/admin');
//     } catch (err) {
//       setError(`Error updating question: ${err.message}`);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="loading-container">
//         <p>Loading question data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="edit-question-container">
//       <h2>Edit Question #{id}</h2>
//       {error ? (
//         <div className="error-container">
//           <p className="error-message">{error}</p>
//           <button 
//             onClick={() => navigate('/admin')} 
//             className="back-button"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="question">Question:</label>
//             <input
//               id="question"
//               type="text"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="optionA">Option A:</label>
//             <input
//               id="optionA"
//               type="text"
//               value={optionA}
//               onChange={(e) => setOptionA(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="optionB">Option B:</label>
//             <input
//               id="optionB"
//               type="text"
//               value={optionB}
//               onChange={(e) => setOptionB(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="optionC">Option C:</label>
//             <input
//               id="optionC"
//               type="text"
//               value={optionC}
//               onChange={(e) => setOptionC(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="optionD">Option D:</label>
//             <input
//               id="optionD"
//               type="text"
//               value={optionD}
//               onChange={(e) => setOptionD(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="correctAnswers">Correct Answers (comma-separated):</label>
//             <input
//               id="correctAnswers"
//               type="text"
//               value={correctAnswers}
//               onChange={(e) => setCorrectAnswers(e.target.value)}
//               placeholder="e.g., A, B"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="points">Points:</label>
//             <input
//               id="points"
//               type="number"
//               value={points}
//               onChange={(e) => setPoints(e.target.value)}
//               required
//               min="0"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="category">Category:</label>
//             <input
//               id="category"
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="submit">Save Question</button>
//             <button 
//               type="button" 
//               onClick={() => navigate('/admin')}
//               className="cancel-button"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditQuestion;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditQuestion.css'

const EditQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [points, setPoints] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      setError('');

      try {
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`http://127.0.0.1:5000/admin/get_question/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 404) {
          setError(`Question #${id} not found. Please check if this question exists.`);
          return;
        }

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format');
        }

        setQuestion(data.question || '');
        setOptionA(data.option_a || '');
        setOptionB(data.option_b || '');
        setOptionC(data.option_c || '');
        setOptionD(data.option_d || '');
        if (Array.isArray(data.correct_answers)) {
          setCorrectAnswers(data.correct_answers.join(', '));
        } else if (typeof data.correct_answers === 'string') {
          setCorrectAnswers(data.correct_answers);
        } else {
          setCorrectAnswers('');
        }
        setPoints(data.points || '');
        setCategory(data.category || '');
      } catch (err) {
        console.error('Error details:', err);
        setError(`Error fetching question: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const answersArray = correctAnswers
      .split(',')
      .map(answer => answer.trim().toUpperCase())
      .filter(answer => answer);

    const questionData = {
      question,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_answers: answersArray,
      points: Number(points),
      category
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/admin/edit_question/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      });

      if (response.status === 404) {
        setError(`Question #${id} not found. Please check if this question still exists.`);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to update question (${response.status})`);
      }

      navigate('/admin');
    } catch (err) {
      setError(`Error updating question: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading question data...</p>
      </div>
    );
  }

  return (
    <div className="edit-question-container">
      <h2>Edit Question #{id}</h2>
      {error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button 
            onClick={() => navigate('/admin')} 
            className="back-button"
          >
            Back to Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group" id="question-group">
            <label htmlFor="question">Question:</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="form-group" id="optionA-group">
            <label htmlFor="optionA">Option A:</label>
            <input
              id="optionA"
              type="text"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              required
            />
          </div>
          <div className="form-group" id="optionB-group">
            <label htmlFor="optionB">Option B:</label>
            <input
              id="optionB"
              type="text"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              required
            />
          </div>
          <div className="form-group" id="optionC-group">
            <label htmlFor="optionC">Option C:</label>
            <input
              id="optionC"
              type="text"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              required
            />
          </div>
          <div className="form-group" id="optionD-group">
            <label htmlFor="optionD">Option D:</label>
            <input
              id="optionD"
              type="text"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              required
            />
          </div>
          <div className="form-group" id="correctAnswers-group">
            <label htmlFor="correctAnswers">Correct Answers (comma-separated):</label>
            <input
              id="correctAnswers"
              type="text"
              value={correctAnswers}
              onChange={(e) => setCorrectAnswers(e.target.value)}
              placeholder="e.g., A, B"
              required
            />
          </div>
          <div className="form-group" id="points-group">
            <label htmlFor="points">Points:</label>
            <input
              id="points"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="form-group" id="category-group">
            <label htmlFor="category">Category:</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="button-group" id="button-group">
            <button type="submit">Save Question</button>
            <button 
              type="button" 
              onClick={() => navigate('/admin')}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditQuestion;
