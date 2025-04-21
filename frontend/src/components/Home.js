import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const posts = [
    { title: 'Data Driven Humanities', content: 'Professor Bozia and students presented new research...', link: '/post/1' },
    { title: 'Quantum Physics', content: 'Professor Birzu and students pioneered...', link: '/post/2' },
    { title: 'Marine Biology', content: 'Professor Abil worked alongside students...', link: '/post/3' },
    { title: 'Discrete Mathematics', content: 'Professor Adams led students...', link: '/post/4' },
    { title: 'Virtual Reality', content: 'Professor Ragan facilitates students...', link: '/post/5' },
    { title: 'Special Education', content: 'Dr. Brownell guides student and..', link: '/post/6' },
  ];

  const navigate = useNavigate();

  const nextPost = () => {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  const prevPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
    }
  };

  return (
    <div className="home">
      <header>
        <div className="logo">AcademiNet</div>
      </header>

      <div className="newsletter-container">
        <h2>Newsletter</h2>
        <div className="post" onClick={() => navigate(posts[currentPostIndex].link)}>
          <h3>{posts[currentPostIndex].title}</h3>
          <p>{posts[currentPostIndex].content}</p>
        </div>
        
        <div className="navigation">
          <button onClick={prevPost} className="prev-btn">←</button>
          <button onClick={nextPost} className="next-btn">→</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
