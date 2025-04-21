import React from 'react'; 
import { Link } from 'react-router-dom';
import HamburgerMenu from './ResearcherHamburgerMenu';
import './ResearchHome.css';

const dummyPostings = [
  {
    id: 1,
    title: 'Neural Network Interpretability',
    lab: 'AI & Ethics Lab',
    supervisor: 'Dr. Smith',
    startDate: '2025-06-01',
    description:
      'Join us to explore methods for making deep learning models transparent and trustworthy.',
    tags: ['AI', 'Machine Learning', 'Ethics'],
  },
  {
    id: 2,
    title: 'Quantum Dot Synthesis',
    lab: 'NanoMaterials Group',
    supervisor: 'Prof. Lee',
    startDate: '2025-07-15',
    description:
      'We are developing novel quantum dot fabrication techniques for high‑efficiency solar cells.',
    tags: ['Chemistry', 'Nanotech', 'Solar'],
  },
  {
    id: 3,
    title: 'Behavioral Economics Field Study',
    lab: 'Decision Sciences Dept.',
    supervisor: 'Dr. Patel',
    startDate: '2025-08-10',
    description:
      'Work on a large‑scale field experiment testing how framing affects saving behavior.',
    tags: ['Economics', 'Field Work', 'Statistics'],
  },
];

export default function ActivePostings() {
  return (
    <div className="active-page">
      <header>
        <HamburgerMenu />
        <div className="logo">AcademiNet</div>
      </header>

      <main className="active-list">
        <div className="active-list-header">
          <h2>Active Research Positions</h2>
          <Link to="/research-postings" className="new-post-btn">
            + New Posting
          </Link>
        </div>
        {dummyPostings.map((post) => (
          <Link
            key={post.id}
            to={`/research/${post.id}`}
            className="active-card"
          >
            <div className="card-header">
              <h3 className="card-title">{post.title}</h3>
              <span className="card-date">
                {new Date(post.startDate).toLocaleDateString()}
              </span>
            </div>
            <p className="card-lab">
              <strong>Lab:</strong> {post.lab}  
              {' | '}<strong>Supervisor:</strong> {post.supervisor}
            </p>
            <p className="card-desc">{post.description}</p>
            <div className="card-tags">
              {post.tags.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
