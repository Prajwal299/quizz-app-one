// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLandingPage = () => {
//   const navigate = useNavigate();

//   const handleCreateQuestionClick = () => {
//     navigate('/admin/create-question'); // Navigates to the question creation page
//   };

//   return (
//     <div>
//       <h2>Welcome to Admin Dashboard</h2>
//       <div className="create-question-container" onClick={handleCreateQuestionClick}>
//         <h3>Create Questions</h3>
//       </div>
//     </div>
//   );
// };

// export default AdminLandingPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLandingPage.css'

const AdminLandingPage = () => {
  const navigate = useNavigate();

  const handleCreateQuestionClick = () => {
    navigate('/admin/create-question'); // Navigates to the question creation page
  };

  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <div className="create-question-container-unique" onClick={handleCreateQuestionClick}>
        <h3>Create Questions</h3>
      </div>
    </div>
  );
};

export default AdminLandingPage;
