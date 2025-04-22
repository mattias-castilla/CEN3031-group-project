import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';  // ← added
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = {
    name: 'Your Name',
    // role: 'Student',
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

  return (
    <div className="profile-page">
      <header>
        <HamburgerMenu />                 {/* ← added */}
        <div className="logo">AcademiNet</div>
      </header>

      <div className="profile-content">
        <aside className="sidebar">
          <div className="profile-pic-placeholder" />
          <div className="major">{user.major}</div>
        </aside>

        <main className="profile-main">
          <h1>{user.name}</h1>
          <h2 className="role">{user.role}</h2>

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
