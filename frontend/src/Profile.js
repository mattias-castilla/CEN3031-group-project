import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const user = {
    name: 'Your Name',
    role: 'Student',
    major: 'Computer Science',
    summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.`,
    experience: [
      {
        title: 'Internship 1',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua.`,
      }
    ]
  };

  return (
    <div className="profile-page">
      <header>
        <div className="logo">AcademiNet</div>
      </header>

      <div className="profile-content">
        <aside className="sidebar">
          <div className="profile-pic-placeholder" />
          <div className="major">{user.major}</div>

          <button className="sidebar-btn">
            <Bookmark className="icon" size={20} />
            <span>Bookmarks</span>
          </button>

          <button className="sidebar-btn">
            <BookmarkCheck className="icon" size={20} />
            <span>Applied</span>
          </button>
        </aside>

        <main className="profile-main">
          <h1>{user.name}</h1>
          <h2 className="role">{user.role}</h2>

          <section className="section">
            <h3>Summary:</h3>
            <p>{user.summary}</p>
          </section>

          <section className="section">
            <h3>Experience:</h3>
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
