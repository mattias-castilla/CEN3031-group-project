import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import './ResearchPostings.css';

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
