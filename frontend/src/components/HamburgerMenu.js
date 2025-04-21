import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HamburgerMenu.css';  

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsOpen(false); 
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu">
          <ul>
            <li onClick={() => handleMenuItemClick('/home')}>Home</li>
            <li onClick={() => handleMenuItemClick('/research')}>Research</li>
            <li onClick={() => handleMenuItemClick('/profile')}>Profile</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;