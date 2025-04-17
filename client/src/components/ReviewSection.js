import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { getReviewsBySpotId, createReview } from '../services/api';
import '../styles/ReviewSection.css';

const ReviewSection = ({ spotId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [spotId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsBySpotId(spotId);
      setReviews(data);
      setError('');
    } catch (err) {
      setError('Failed to load reviews. Please try again later.');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleCommentChange = (e) => {
    setNewReview({ ...newReview, comment: e.target.value });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      setError('Please select a rating before submitting');
      return;
    }
    
    try {
      setSubmitting(true);
      await createReview({
        spotId,
        rating: newReview.rating,
        comment: newReview.comment
      });
      
      setNewReview({ rating: 0, comment: '' });
      fetchReviews();
      setError('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-section">
      <h4>Reviews</h4>
      
      <form className="review-form" onSubmit={handleSubmitReview}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="rating-input">
          <label>Your Rating:</label>
          <StarRating
            rating={newReview.rating}
            onRatingChange={handleRatingChange}
          />
        </div>
        
        <div className="comment-input">
          <label htmlFor="review-comment">Your Comment:</label>
          <textarea
            id="review-comment"
            value={newReview.comment}
            onChange={handleCommentChange}
            placeholder="Share your experience with this study spot..."
            maxLength={500}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-review-button"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      
      <div className="reviews-list">
        <h5>Previous Reviews</h5>
        
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="no-reviews-message">No reviews yet. Be the first to review this spot!</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <div className="rating-display">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
              <p className="review-comment">{review.comment}</p>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ReviewSection.propTypes = {
  spotId: PropTypes.string.isRequired
};

export default ReviewSection;
