import React from 'react';
import PropTypes from 'prop-types';
import SpotCard from './SpotCard';
import '../styles/SpotList.css';

const SpotList = ({ spots, onEdit, onDelete }) => {
  if (spots.length === 0) {
    return <p className="no-spots-message">No study spots available. Be the first to add one!</p>;
  }

  return (
    <div className="spot-list">
      {spots.map(spot => (
        <SpotCard 
          key={spot._id} 
          spot={spot} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

SpotList.propTypes = {
  spots: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default SpotList;
