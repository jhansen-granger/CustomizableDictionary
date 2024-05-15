// src/services/termService.js
import api from '../api';

export const getTerms = async () => {
  try {
    const response = await api.get('/terms');
    return response.data;
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};

export const addTerm = async (term) => {
  try {
    const response = await api.post('/terms', term);
    return response.data;
  } catch (error) {
    console.error('Error adding term:', error);
    throw error;
  }
};

export const updateTerm = async (id, term) => {
  try {
    const response = await api.put(`/terms/${id}`, term);
    return response.data;
  } catch (error) {
    console.error('Error updating term:', error);
    throw error;
  }
};

export const deleteTerm = async (id) => {
  try {
    const response = await api.delete(`/terms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting term:', error);
    throw error;
  }
};