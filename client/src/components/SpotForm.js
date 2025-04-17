import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createSpot, updateSpot } from '../services/api';
import '../styles/SpotForm.css';

const SpotForm = ({ onSpotAdded, editingSpot }) => {
  const [formData, setFormData] = useState({
    name: '',
    building: '',
    floor: '',
    hasOutlet: false,
    noiseLevel: 'quiet'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingSpot) {
      setFormData({
        name: editingSpot.name,
        building: editingSpot.building,
        floor: editingSpot.floor,
        hasOutlet: editingSpot.hasOutlet,
        noiseLevel: editingSpot.noiseLevel
      });
    } else {
      resetForm();
    }
  }, [editingSpot]);

  const resetForm = () => {
    setFormData({
      name: '',
      building: '',
      floor: '',
      hasOutlet: false,
      noiseLevel: 'quiet'
    });
    setError('');
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSpot) {
        await updateSpot(editingSpot._id, formData);
      } else {
        await createSpot(formData);
      }
      resetForm();
      onSpotAdded();
    } catch (err) {
      setError('Failed to save study spot. Please try again.');
      console.error('Error saving spot:', err);
    }
  };

  return (
    <form className="spot-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Spot Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="building">Building</label>
        <input
          type="text"
          id="building"
          name="building"
          value={formData.building}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="floor">Floor</label>
        <input
          type="text"
          id="floor"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>
      
      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="hasOutlet"
          name="hasOutlet"
          checked={formData.hasOutlet}
          onChange={handleChange}
        />
        <label htmlFor="hasOutlet">Has Power Outlets</label>
      </div>
      
      <div className="form-group">
        <label htmlFor="noiseLevel">Noise Level</label>
        <select
          id="noiseLevel"
          name="noiseLevel"
          value={formData.noiseLevel}
          onChange={handleChange}
          required
          aria-required="true"
        >
          <option value="quiet">Quiet</option>
          <option value="moderate">Moderate</option>
          <option value="noisy">Noisy</option>
        </select>
      </div>
      
      <button type="submit" className="submit-button">
        {editingSpot ? 'Update Spot' : 'Add Spot'}
      </button>
    </form>
  );
};

SpotForm.propTypes = {
  onSpotAdded: PropTypes.func.isRequired,
  editingSpot: PropTypes.object
};

export default SpotForm;
