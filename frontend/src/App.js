import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import UserType from './components/UserType';
import Home from './components/Home';
import ResearchOpportunities from './components/ResearchOpportunities';
import ResearchPostings from './components/ResearchPostings';
import Profile from './components/Profile';

const App = () => (
  <>
    <Routes>
      <Route path="/"                  element={<Login />} />
      <Route path="/register"          element={<CreateAccount />} />
      <Route path="/user-type"         element={<UserType />} />
      <Route path="/home"              element={<Home />} />
      <Route path="/research-page"     element={<ResearchOpportunities />} />
      <Route path="/research-postings" element={<ResearchPostings />} />
      <Route path="/profile"           element={<Profile />} />
    </Routes>
  </>
);

export default App;
