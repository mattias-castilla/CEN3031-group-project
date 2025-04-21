import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';            // ← make sure this path is correct

export default function HamburgerMenu() {
  console.log('🍔 HamburgerMenu rendered');
  const [open, setOpen] = useState(false);

  return (
    <div className="hamburger-wrapper">
      <button
        className="hamburger-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <nav className="hamburger-nav">
          <Link to="/home"            onClick={() => setOpen(false)}>Home</Link>
          <Link to="/register"       onClick={() => setOpen(false)}>Sign Up</Link>
        </nav>
      )}
    </div>
  );
}
