import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CampusSpot
        </Link>
        <div className="navbar-tagline">
          Find the perfect study spot on campus
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
