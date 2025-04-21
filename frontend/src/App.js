import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login            from './components/Login';
import CreateAccount    from './components/CreateAccount';
import UserType         from './components/UserType';
import Home             from './components/Home';
import ResearchPostings from './components/ResearchPostings';
import ResearchHome     from './components/ResearchHome';
import Profile          from './components/Profile';

const App = () => (
  <Routes>
    <Route path="/"                  element={<Login />} />
    <Route path="/register"          element={<CreateAccount />} />
    <Route path="/user-type"         element={<UserType />} />
    <Route path="/home"              element={<Home />} />
    <Route path="/research-postings" element={<ResearchPostings />} />
    <Route path="/research-page"     element={<ResearchHome />} />   {/* Use ResearchHome here */}
    <Route path="/profile"           element={<Profile />} />
  </Routes>
);

export default App;
