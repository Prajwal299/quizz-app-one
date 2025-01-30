import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateQuestion.css";

const CreateQuestion = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [points, setPoints] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError("Error fetching categories: " + err.message);
      }
    };
    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (selectedCategory) {
      const fetchQuestionsByCategory = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/admin/get_questions/${selectedCategory}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setCategoryQuestions(response.data);
        } catch (err) {
          setError("Error fetching questions: " + err.message);
        }
      };
      fetchQuestionsByCategory();
    }
  }, [selectedCategory, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = newCategory || selectedCategory;

    const questionData = {
      question,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_answers: correctAnswers,
      points,
      category,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/admin/create_question",
        questionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Question created successfully!");
        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setCorrectAnswers([]);
        setPoints(0);
        setNewCategory("");
        setCategoryQuestions((prev) => [...prev, response.data]);
      }
    } catch (err) {
      setError("Error creating question: " + err.message);
    }
  };

  const handleEdit = (q) => {
    navigate(`/edit-question/${q.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/admin/delete_question/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("Question deleted successfully!");
        setCategoryQuestions((prev) => prev.filter((q) => q.id !== id));
      }
    } catch (err) {
      setError("Error deleting question: " + err.message);
    }
  };

  return (
    <div className="create-question-page">
      <h2>Create or Edit a Question</h2>
      <div className="create-question-container">
        
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Option D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Correct Answer(s) (comma-separated)"
              value={correctAnswers.join(",")}
              onChange={(e) => setCorrectAnswers(e.target.value.split(","))}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              placeholder="Points"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value, 10))}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Create a new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="submit-button-1">Create Question</button>
        </form>
      </div>
      <div className="Fetch-CategorySection"><div className="category-select-container">
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">--Select a Category--</option>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>
        <ul className="questions-list">
          {categoryQuestions.map((q) => (
            <li key={q.id} className="question-item">
              <div>
                <div className="question-q"><p>Question: {q.question}</p></div>
                <button onClick={() => handleEdit(q)} className="edit-button-1">Edit</button>
                <br />
                <br />
                <button onClick={() => handleDelete(q.id)} className="delete-button-1">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        </div>
    </div>
  );
};

export default CreateQuestion;
