import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserType.css';

const UserType = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSelection = (type) => {
    setUserType(type);
    
    if (type === 'Student') {
      navigate('/home');
    } else if (type === 'Researcher') {
      navigate('/home');
    }
  };

  return (
    <div className="user-type">
      <header>
        <div className="logo">AcademiNet</div>
      </header>

      <div className="container">
        <h1>Are you a Student or Researcher?</h1>
        
        <div className="button-container">
          <button 
            className="student-btn" 
            onClick={() => handleSelection('Student')}
          >
            Student
          </button>
          <button 
            className="researcher-btn" 
            onClick={() => handleSelection('Researcher')}
          >
            Researcher
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default UserType;
