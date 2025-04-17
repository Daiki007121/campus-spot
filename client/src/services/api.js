import axios from 'axios';

// API基本URL
const API_BASE_URL = 'http://localhost:5000/api';

// APIクライアントの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// スポットAPI
export const getAllSpots = async () => {
  try {
    const response = await apiClient.get('/spots');
    return response.data;
  } catch (error) {
    console.error('API Error - getAllSpots:', error);
    throw error;
  }
};

export const getSpotById = async (spotId) => {
  try {
    const response = await apiClient.get(`/spots/${spotId}`);
    return response.data;
  } catch (error) {
    console.error('API Error - getSpotById:', error);
    throw error;
  }
};

export const createSpot = async (spotData) => {
  try {
    const response = await apiClient.post('/spots', spotData);
    return response.data;
  } catch (error) {
    console.error('API Error - createSpot:', error);
    throw error;
  }
};

export const updateSpot = async (spotId, spotData) => {
  try {
    const response = await apiClient.put(`/spots/${spotId}`, spotData);
    return response.data;
  } catch (error) {
    console.error('API Error - updateSpot:', error);
    throw error;
  }
};

export const deleteSpot = async (spotId) => {
  try {
    const response = await apiClient.delete(`/spots/${spotId}`);
    return response.data;
  } catch (error) {
    console.error('API Error - deleteSpot:', error);
    throw error;
  }
};

// レビューAPI
export const getReviewsBySpotId = async (spotId) => {
  try {
    const response = await apiClient.get(`/reviews/spot/${spotId}`);
    return response.data;
  } catch (error) {
    console.error('API Error - getReviewsBySpotId:', error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await apiClient.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    console.error('API Error - createReview:', error);
    throw error;
  }
};
