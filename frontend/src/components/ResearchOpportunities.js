// src/components/ResearchOpportunities.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import './ResearchOpportunities.css';

const ResearchOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [sortedByDate, setSortedByDate] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId]       = useState(null);
  const [email, setEmail]                 = useState('');
  const [application, setApplication]     = useState('');
  const [submitStatus, setSubmitStatus]   = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/all/posts', { withCredentials: true })
      .then(resp => {
        const safe = (resp.data.posts || []).map(p => ({
          ...p,
          id: p._id || p.id,
          tags: Array.isArray(p.tags)
            ? p.tags
            : typeof p.tags === 'string'
              ? p.tags.split(',').map(t => t.trim()).filter(Boolean)
              : []
        }));
        setOpportunities(safe);
      })
      .catch(() => setError('Could not load research opportunities.'))
      .finally(() => setLoading(false));
  }, []);


  const filtered = opportunities
  .filter(p =>
    selectedTag
      ? p.tags.map(t => t.toLowerCase()).includes(selectedTag.toLowerCase())
      : true
  )
  .sort((a, b) => {
    const da = new Date(a.date || 0);
    const db = new Date(b.date || 0);
    return sortedByDate ? db - da : da - db;
  });

  if (loading) {
    return (
      <div className="research-page">
        <header>
          <HamburgerMenu />
          <div className="logo">AcademiNet</div>
        </header>
        <p>Loading…</p>
      </div>
    );
  }

  const handleCardClick = id => {
    setExpandedId(expandedId === id ? null : id);
    setEmail('');
    setApplication('');
    setSubmitStatus('');
  };

  const handleApply = async (postID) => {
    setSubmitStatus('Submitting…');
    try {
      await axios.post(
        'http://localhost:5000/api/user/apply',
        {
        post:        postId,                       
        email,                                    
        date:       new Date().toISOString(),      
        application,                              
        },
        { withCredentials: true }
      );
      setSubmitStatus('Application sent!');
    } catch {
      setSubmitStatus('Failed to send application.');
    }
  };

  return (
    <div className="research-page">
      <header>
        <HamburgerMenu />
        <div className="logo">AcademiNet</div>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by tags..."
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        />
        <button onClick={() => setSortedByDate((s) => !s)}>
          {sortedByDate ? 'Oldest First' : 'Newest First'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="research-list">
        {filtered.map(post => (
          <div key={post.id} className="research-card">
            <div
              className="card-summary"
              onClick={() => handleCardClick(post.id)}
            >
              <h3>{post.title}</h3>
              <div className="tags">
                {post.tags.map((t,i) => <span key={i} className="tag">{t}</span>)}
              </div>
              <p className="date">
                {post.date && new Date(post.date).toLocaleDateString()}
              </p>
            </div>

            {expandedId === post.id && (
              <div className="card-expanded">
                <h4>Details</h4>
                <p><strong>Department:</strong> {post.department}</p>
                <p><strong>Full Description:</strong> {post.description}</p>
                {/* Application form */}
                <div className="apply-form">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <textarea
                    placeholder="Type your application here..."
                    value={application}
                    onChange={e => setApplication(e.target.value)}
                  />
                  <button
                    onClick={() => handleApply(post.id)}
                    disabled={!email || !application}
                  >
                    Submit Application
                  </button>
                  {submitStatus && <p className="status">{submitStatus}</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchOpportunities;
