import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
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
        setPosts(
          (allPosts.data.posts || []).filter(p => p.email === myEmail)
        );
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
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
/*
export default function ResearchPostings() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    department: '',       
    tags: '',             // comma‑separated
    date: '',             // startDate
    description: '',
  });
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  
  const fetchProfile = async () => {
    const { data } = await axios.get(
      'http://localhost:5000/api/user/role', 
      { withCredentials: true }
    );
    return data.email;   
  };

  
  useEffect(() => {
    const load = async () => {
      try {
        const resp = await axios.get(
          'http://localhost:5000/api/user/all/posts',
          { withCredentials: true }
        );
        
        const me = (await fetchProfile()).email;
        setPosts(resp.data.posts.filter(p => p.email === me));
      } catch {
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
      const myEmail = (await fetchProfile()).email;
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
      setPosts(resp2.data.posts.filter(p => p.email === myEmail));
      setForm({ title:'', department:'', tags:'', date:'', description:'' });
    } catch {
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
          {posts.length === 0 && <p>No postings yet.</p>}
          {posts.map(p => (
            <div key={p._id} className="past-post">
              <h4>{p.title}</h4>
              <small>{new Date(p.date).toLocaleDateString()}</small>
              <p>{p.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
*/
/*
export default function ResearchPostings() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    labName: '',
    supervisor: '',
    location: '',
    startDate: '',
    description: '',
    responsibilities: '',
    requirements: '',
    tags: '',
    applyLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/posts/new/post', // adjust to match your API
        { ...form, tags: form.tags.split(',').map((t) => t.trim()) },
        { withCredentials: true }
      );
      setSuccess('Posting created!');
      setTimeout(() => navigate('/research-page'), 1000);
    } catch (err) {
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
        <h2>Create a Research Position</h2>

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
            name="labName"
            placeholder="Lab / Department*"
            value={form.labName}
            onChange={handleChange}
            required
          />
          <input
            name="supervisor"
            placeholder="Supervisor / PI*"
            value={form.supervisor}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={form.startDate}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Brief Description*"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          />

          <textarea
            name="responsibilities"
            placeholder="Key Responsibilities"
            rows="3"
            value={form.responsibilities}
            onChange={handleChange}
          />

          <textarea
            name="requirements"
            placeholder="Preferred Skills / Requirements"
            rows="3"
            value={form.requirements}
            onChange={handleChange}
          />

          <input
            name="tags"
            placeholder="Tags (comma‑separated, e.g., AI, Python, Wet‑Lab)"
            value={form.tags}
            onChange={handleChange}
          />

          <input
            name="applyLink"
            placeholder="Application Link or Contact Email*"
            value={form.applyLink}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Posting…' : 'Publish Position'}
          </button>
        </form>
      </main>
    </div>
  );
}
*/