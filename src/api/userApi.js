import apiClient from '../utils/apiClient';

export const getQuizHistory = () => apiClient.get('/user/quiz-history');
export const submitQuiz = (quizData) => apiClient.post('/user/submit-quiz', quizData);
