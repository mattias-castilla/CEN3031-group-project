import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './ResearcherHamburgerMenu';
import './ResearchPostings.css';


export default function ResearchPostings() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({
    title: '',
    department: '',
    tags: '',
    date: '',
    description: '',
  });
  const [posts, setPosts]     = useState([]);
  const [applicationsByPostId, setApplicationsByPostId] = useState({});
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  const fetchEmail = async () => {
    const resp = await axios.get(
      'http://localhost:5000/api/user/get/email',
      { withCredentials: true }
    );
    return resp.data.email;
  };

  
  useEffect(() => {
    const load = async () => {
      try {
        const [allPosts, myEmail] = await Promise.all([
          axios.get('http://localhost:5000/api/user/all/posts', { withCredentials: true }),
          fetchEmail()
        ]);

        const myPosts = (allPosts.data.posts || [])
          .filter(p => p.email === myEmail);

        setPosts(myPosts);

        const map = {};
        await Promise.all(
         myPosts.map(async post => {
           const appsResp = await axios.get(
            'http://localhost:5000/api/user/get/applications',
            {
             params: {
               post : String(post._id),
             },
            withCredentials: true,
          });
           map[post._id] = appsResp.data.applications;
         })
       );
       setApplicationsByPostId(map);

      } catch (err) {
        console.error(err);
        setError('Could not load your posts');
      }
    };
    load();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

 
  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);

    try {
      const myEmail = await fetchEmail();
      await axios.post(
        'http://localhost:5000/api/user/new/post',
        {
          email:       myEmail,
          title:       form.title,
          department:  form.department,
          tags:        form.tags.split(',').map(t => t.trim()),
          date:        form.date,
          description: form.description,
        },
        { withCredentials: true }
      );

      setSuccess('Posting created!');

      const resp2 = await axios.get(
        'http://localhost:5000/api/user/all/posts',
        { withCredentials: true }
      );
      setPosts(
        (resp2.data.posts || []).filter(p => p.email === myEmail)
      );
      setForm({ title:'', department:'', tags:'', date:'', description:'' });
    } catch (err) {
      console.error(err);
      setError('Could not create posting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="postings-page">
      <header>
        <HamburgerMenu />
        <div className="logo">AcademiNet</div>
      </header>

      <main className="postings-container">
        <h2>Your Research Positions</h2>

        {error   && <p className="msg error">{error}</p>}
        {success && <p className="msg success">{success}</p>}

        <form className="posting-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Position Title*"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Lab / Department*"
            value={form.department}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Brief Description*"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="tags"
            placeholder="Tags (comma‑separated)"
            value={form.tags}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Posting…' : 'Publish Position'}
          </button>
        </form>

        <section className="existing-posts">
          <h3>Your Past Postings</h3>
          {posts.length === 0 ? (
            <p>No postings yet.</p>
          ) : (
            posts.map(p => (
              <div key={p._id} className="past-post">
                <h4>{p.title}</h4>
                <small>{new Date(p.date).toLocaleDateString()}</small>
                <p>{p.description}</p>
                <div className="applications">
                <h5>Applications:</h5>
               {(applicationsByPostId[p._id] || []).length === 0 ? (
                 <p>No applications yet.</p>
              ) : (
                applicationsByPostId[p._id].map((app, idx) => (
                  <div key={idx} className="application">
                    <strong>{app.email}</strong> on{' '}
                     {new Date(app.date).toLocaleString()}
                    <p>{app.application}</p>
                   </div>
                ))
              )}
            </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
