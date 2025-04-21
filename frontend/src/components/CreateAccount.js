import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const CreateAccount = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match, please try again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/new/student', {
        fullName,
        email,
        password
      });

      setSuccess('Account successfully created!');
      setError('');
      setTimeout(() => {
        navigate('/user-type');
      }, 2000);
    } catch (err) {
      setError('Error with account creation. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="login-page">
      <header>
        <div className="logo">AcademiNet</div>
      </header>

      <div className="container">
        <h1>Create Account</h1>
        <div className="account-info">
          Already have an account? <Link to="/">Sign In</Link>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="form-container" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="sign-in-btn">Create Account</button>
        </form>
      </div>

      <footer></footer>
    </div>
  );
};

export default CreateAccount;