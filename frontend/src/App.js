import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login            from './components/Login';
import CreateAccount    from './components/CreateAccount';
import UserType         from './components/UserType';
import Home             from './components/Home';
import ResearchPostings from './components/ResearchPostings';
import ResearchHome     from './components/ResearchHome';
import Profile          from './components/Profile';
import ResearchOpportunities from './components/ResearchOpportunities';
import ResearcherProfile     from './components/ResearcherProfile'; 

const App = () => (
  <Routes>
    <Route path="/"                  element={<Login />} />
    <Route path="/register"          element={<CreateAccount />} />
    <Route path="/user-type"         element={<UserType />} />
    <Route path="/home"              element={<Home />} />
    <Route path="/research-postings" element={<ResearchPostings />} />
    <Route path="/research-page"     element={<ResearchOpportunities />} />   {/* Use ResearchHome here */}
    <Route path="/profile"           element={<Profile />} />
    <Route path="/ResearchHome"      element={<ResearchHome />} />
    <Route path="/ResearcherProfile" element={<ResearcherProfile />} />
  </Routes>
);

export default App;
