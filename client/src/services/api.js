// API base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for fetch with common options
const fetchWithOptions = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  
  // Handle non-2xx responses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  
  // Handle no content responses
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

// Spots API
export const getAllSpots = async () => {
  try {
    return await fetchWithOptions(`${API_BASE_URL}/spots`);
  } catch (error) {
    console.error('API Error - getAllSpots:', error);
    throw error;
  }
};

export const getSpotById = async (spotId) => {
  try {
    return await fetchWithOptions(`${API_BASE_URL}/spots/${spotId}`);
  } catch (error) {
    console.error('API Error - getSpotById:', error);
    throw error;
  }
};

export const createSpot = async (spotData) => {
  try {
    return await fetchWithOptions(`${API_BASE_URL}/spots`, {
      method: 'POST',
      body: JSON.stringify(spotData)
    });
  } catch (error) {
    console.error('API Error - createSpot:', error);
    throw error;
  }
};

export const updateSpot = async (spotId, spotData) => {
  try {
    return await fetchWithOptions(`${API_BASE_URL}/spots/${spotId}`, {
      method: 'PUT',
      body: JSON.stringify(spotData)
    });
  } catch (error) {
    console.error('API Error - updateSpot:', error);
    throw error;
  }
};

export const deleteSpot = async (spotId) => {
  try {
    return await fetchWithOptions(`${API_BASE_URL}/spots/${spotId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('API Error - deleteSpot:', error);
    throw error;
  }
};

// Reviews API
export const getReviewsBySpotId = async (spotId) => {
  try {
    return await fetchWithOptions(`${API_BASE_URL}/reviews/spot/${spotId}`);
  } catch (error) {
    console.error('API Error - getReviewsBySpotId:', error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    return await fetchWithOptions(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  } catch (error) {
    console.error('API Error - createReview:', error);
    throw error;
  }
};
