import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';                             // ← new
import HamburgerMenu from './HamburgerMenu';           // student menu
import ResearcherHamburgerMenu from './ResearcherHamburgerMenu'; // researcher menu
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);     // ← track role
  const user = {
    name: 'Your Name',
    major: 'Computer Science',
    summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.`,
    experience: [
      {
        title: 'About Me',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua.`,
      }
    ]
  };

  // fetch role on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => {
        setUserType(res.data.type);  // "Student" or "Researcher"
      })
      .catch(() => {
        setUserType('Student');      // fallback
      });
  }, []);

  return (
    <div className="profile-page">
      <header>
        {userType === 'Researcher'
          ? <ResearcherHamburgerMenu />
          : <HamburgerMenu />
        }
        <div className="logo">AcademiNet</div>
      </header>

      <div className="profile-content">
        <aside className="sidebar">
          <div className="profile-pic-placeholder" />
          <div className="major">{user.major}</div>
        </aside>

        <main className="profile-main">
          <h1>{user.name}</h1>
          <h2 className="role">{userType || ''}</h2>

          <section className="section">
            <h3>Summary:</h3>
            <p>{user.summary}</p>
          </section>

          <section className="section">
            <h3>About Me:</h3>
            <ul>
              {user.experience.map((exp, i) => (
                <li key={i}>
                  <strong>{exp.title}</strong>
                  <p>{exp.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <footer />
    </div>
  );
};

export default Profile;
