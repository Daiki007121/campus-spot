import React, { useState, useEffect } from 'react';
import SpotForm from './SpotForm';
import SpotList from './SpotList';
import '../styles/HomePage.css';
import { getAllSpots } from '../services/api';

const HomePage = () => {
  const [spots, setSpots] = useState([]);
  const [editingSpot, setEditingSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    try {
      setLoading(true);
      const data = await getAllSpots();
      setSpots(data);
      setError(null);
    } catch (err) {
      setError('Failed to load study spots. Please try again later.');
      console.error('Error fetching spots:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpotAdded = () => {
    fetchSpots();
    setEditingSpot(null);
  };

  const handleEditSpot = (spot) => {
    setEditingSpot(spot);
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-page">
      <section className="form-section">
        <h2>{editingSpot ? 'Edit Study Spot' : 'Add New Study Spot'}</h2>
        <SpotForm 
          onSpotAdded={handleSpotAdded} 
          editingSpot={editingSpot}
        />
      </section>
      
      <section className="spots-section">
        <h2>Study Spots</h2>
        {loading ? (
          <p>Loading spots...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <SpotList 
            spots={spots} 
            onEdit={handleEditSpot} 
            onDelete={fetchSpots} 
          />
        )}
      </section>
    </div>
  );
};

export default HomePage;
