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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await axios.get(
          'http://localhost:5000/api/user/all/posts',
          { withCredentials: true }
        );
        const safePosts = (resp.data.posts || []).map((post) => ({
          ...post,
          id: post._id || post.id,  // ensure we have an `id`
          tags: Array.isArray(post.tags)
            ? post.tags
            : typeof post.tags === 'string'
            ? post.tags.split(',').map((t) => t.trim()).filter(Boolean)
            : [],
        }));
        setOpportunities(safePosts);
      } catch (err) {
        console.error(err);
        setError('Could not load research opportunities.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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

  const filtered = opportunities
    .filter((post) =>
      selectedTag
        ? post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
        : true
    )
    .sort((a, b) => {
      const da = new Date(a.date || 0);
      const db = new Date(b.date || 0);
      return sortedByDate ? db - da : da - db;
    });

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
        {filtered.map((post) => (
          <Link
            key={post.id}
            to={`/research/${post.id}`}
            className="research-card"
          >
            <h3 className="research-title">{post.title}</h3>
            <p className="research-desc">{post.description}</p>
            <div className="tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            {post.date && (
              <p className="date">
                {new Date(post.date).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResearchOpportunities;
