import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            }, {
                withCredentials: true
            });

            
            const { data } = await axios.get(
                'http://localhost:5000/api/user/role',
                { withCredentials: true }
            );

            if (data.role === 'student') {
                navigate('/home');
              } else {
                navigate('/ResearchHome');
              }
            }
            catch (err) {
                setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <header>
                <div className="logo">AcademiNet</div>
            </header>

            <div className="container">
                <h1>Login</h1>
                
                <div className="account-info">
                    Don't have an Account? <Link to="/register">Create an Account</Link>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                {isLoggedIn && <div className="success-message">Login successful!</div>}
                
                <form id="login-form" className="form-container" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit" className="sign-in-btn">Sign In</button>
                </form>
                
                
            </div>

            <footer></footer>
        </div>
    );
};

export default Login;
