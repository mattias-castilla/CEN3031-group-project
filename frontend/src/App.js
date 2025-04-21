import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import UserType from './components/UserType';
import HamburgerMenu from './components/HamburgerMenu';
import Home from "./components/Home";
import ResearchOpportunities from './components/ResearchOpportunities';
import Profile from './components/Profile';

const App = () => {
    return (
        <>
            <HamburgerMenu />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<CreateAccount />} />
                <Route path="/user-type" element={<UserType />} />
                <Route path="/home" element={<Home />} />
                <Route path="/hamburger-menu" element={<HamburgerMenu />} />
                <Route path="/research-page" element={<ResearchOpportunities />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    );
};

export default App;
