import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResearchOpportunities.css'; 

const ResearchOpportunities = () => {
    const [opportunities, setOpportunities] = useState([]);      
    const [selectedTag, setSelectedTag] = useState('');
    const [sortedByDate, setSortedByDate] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const resp = await axios.get(
              'http://localhost:5000/api/user/all/posts',
              { withCredentials: true }             
            );
            setOpportunities(resp.data.posts);      
          } catch (err) {
            console.error(err);
            setError('Could not load research opportunities.');
          }
        };
        fetchPosts();
      }, []);
  

      const filtered = opportunities
      .filter(post =>
        selectedTag ? post.tags.includes(selectedTag) : true
      )
      .sort((a, b) =>
        sortedByDate
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );

  return (
    <div className="research-page">
      <header>
        <div className="logo">AcademiNet</div>
      </header>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Filter by tags..." 
          value={selectedTag} 
          onChange={e => setSelectedTag(e.target.value)}
        />
        <button onClick={() => setSortedByDate(!sortedByDate)}>
        Sort by Date
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

       <div className="research-list">
        {filtered.map((post, idx) => (
          <div className="research-item" key={idx}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <p className="date">{new Date(post.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchOpportunities;
