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
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match, please try again.');
      return;
    }

    try {
      const endpoint = `http://localhost:5000/api/user/new/${role}`; 
      await axios.post(endpoint, {
        fullName,
        email,
        password
      }, {withCredentials: true});

      setSuccess('Account successfully created!');
      setError('');
      setTimeout(() => {
        navigate(role === 'student' ? '/home' : '/ResearchHome');
      }, 1000);
    } catch (err) {
      setError('Error with account creation. Please try again.');
      
    }
  };

  return (
    
<div className="login-page">
      <header><div className="logo">AcademiNet</div></header>
      <div className="container">
        <h1>Create Account</h1>

        {/* pick role */}
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role==='student'}
              onChange={e => setRole(e.target.value)}
            /> Student
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="role"
              value="researcher"
              checked={role==='researcher'}
              onChange={e => setRole(e.target.value)}
            /> Researcher
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="form-container" onSubmit={handleSubmit}>
          <input placeholder="Full Name"
                 value={fullName}
                 onChange={e=>setFullName(e.target.value)}
                 required />

          <input type="email"
                 placeholder="Email"
                 value={email}
                 onChange={e=>setEmail(e.target.value)}
                 required />

          <input type="password"
                 placeholder="Password"
                 value={password}
                 onChange={e=>setPassword(e.target.value)}
                 required />

          <input type="password"
                 placeholder="Confirm Password"
                 value={confirmPassword}
                 onChange={e=>setConfirmPassword(e.target.value)}
                 required />

          <button type="submit" className="sign-in-btn">
            Create {role.charAt(0).toUpperCase()+role.slice(1)} Account
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
      <footer/>
    </div>
  );
}

export default CreateAccount;