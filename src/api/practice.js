import axios from 'axios';
import {store} from '../store/store';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => {
    const { user } = store.getState().auth; // Access Redux state directly
    const token = user?.session_token; // Retrieve session_token
    return { Authorization: `Bearer ${token}` }; // Return the Authorization header
};
export const practiceAPI = {
    
    createPractice: async (practiceData) => {
        // console.log(getAuthHeader());
        const response = await axios.post(`${API_URL}practice/`, practiceData, {
            headers: getAuthHeader(),
        });
        console.log(response.data);
        return response.data;
    },

    // Get a list of all practices
    getPractice: async () => {
        const response = await axios.get(`${API_URL}practice/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    // Get a single Practice by ID
    getPracticeById: async (practiceId) => {
        // const response = await axios.get(`${API_URL}Practice/${practiceId}/`);
        const response = await axios.get(`${API_URL}practice/${practiceId}/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    // Update an existing Practice
    updatePractice: async (practiceId, updatedData) => {
        const response = await axios.put(`${API_URL}practice/${practiceId}/`, updatedData, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    // Delete a Practice by ID
    deletePractice: async (practiceId) => {
        console.log(practiceId);
        const response = await axios.delete(`${API_URL}practice/${practiceId}/`, {
            headers: getAuthHeader(),
        });
        console.log(response);
        return response.data;
    },

    // Additional Practice-related functionality
    // Example: Get Practice analytics
    getPracticeAnalytics: async (practiceId) => {
        const response = await axios.get(`${API_URL}practice/${practiceId}/analytics/`);
        return response.data;
    }
};
