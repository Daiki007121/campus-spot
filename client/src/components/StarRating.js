import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    onRatingChange(index);
  };

  return (
    <div 
      className="star-rating"
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label="Rate from 1 to 5 stars"
    >
      {[1, 2, 3, 4, 5].map(index => (
        <span
          key={index}
          className={`star ${index <= (hoverRating || rating) ? 'active' : ''}`}
          onMouseOver={() => handleMouseOver(index)}
          onClick={() => handleClick(index)}
          role="radio"
          aria-checked={rating === index}
          aria-label={`${index} star${index !== 1 ? 's' : ''}`}
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(index);
            }
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired
};

export default StarRating;
