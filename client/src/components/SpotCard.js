import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewSection from './ReviewSection';
import { deleteSpot } from '../services/api';
import '../styles/SpotCard.css';

const SpotCard = ({ spot, onEdit, onDelete }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleEdit = () => {
    onEdit(spot);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this study spot?')) {
      try {
        setIsDeleting(true);
        await deleteSpot(spot._id);
        onDelete();
      } catch (err) {
        console.error('Error deleting spot:', err);
        alert('Failed to delete study spot. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="spot-card">
      <div className="spot-header">
        <h3>{spot.name}</h3>
      </div>
      
      <div className="spot-details">
        <p><strong>Building:</strong> {spot.building}</p>
        <p><strong>Floor:</strong> {spot.floor}</p>
        <p><strong>Power Outlets:</strong> {spot.hasOutlet ? 'Yes' : 'No'}</p>
        <p><strong>Noise Level:</strong> {spot.noiseLevel.charAt(0).toUpperCase() + spot.noiseLevel.slice(1)}</p>
      </div>
      
      <div className="spot-actions">
        <button 
          onClick={toggleReviews} 
          className="review-button"
          aria-expanded={showReviews}
        >
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </button>
        
        <div className="edit-delete-actions">
          <button 
            onClick={handleEdit} 
            className="edit-button"
            disabled={isDeleting}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="delete-button"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      
      {showReviews && (
        <ReviewSection spotId={spot._id} />
      )}
    </div>
  );
};

SpotCard.propTypes = {
  spot: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    building: PropTypes.string.isRequired,
    floor: PropTypes.string.isRequired,
    hasOutlet: PropTypes.bool.isRequired,
    noiseLevel: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default SpotCard;
