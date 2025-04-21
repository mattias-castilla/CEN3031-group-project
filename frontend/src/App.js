import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import UserType from './components/UserType';
import HamburgerMenu from './components/HamburgerMenu';
import Home from "./components/Home";
import ResearchOpportunities from './components/ResearchOpportunities';


const App = () => {
    return (
      
        <Routes>
           
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<CreateAccount />} />
                <Route path="/user-type" element={<UserType />} />
                <Route path="/home" element={<Home />} />
                <Route path="/hamburger-menu" element={<HamburgerMenu />} />
                <Route path="/research-page" element={<ResearchOpportunities />} />
           
        </Routes>
      
    );
};

export default App;

/**import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<h2>Dashboard (Protected Page)</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
**/

/** 
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
**/
