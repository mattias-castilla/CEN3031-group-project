import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
//import Dashboard from './components/Dashboard';  // Example child component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
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
