import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const Navbar = ({ title = 'CampusSpot', tagline = 'Find the perfect study spot on campus' }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {title}
        </Link>
        <div className="navbar-tagline">
          {tagline}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string
};

export default Navbar;
