import axios from 'axios';
import { getRequestParams, getAuthHeader } from './utils';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const authAPI = {
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}user/login/`, credentials);
        return response.data;
    },

    signup: async (userData) => {
        console.log(userData);
        const response = await axios.post(`${API_URL}user/signup/`, userData);
        return response.data;
    },

    logout: async () => {
        try {
            // Make the POST request with the Authorization header
            const response = await axios.post(
                `${API_URL}user/logout/`,
                {}, // Empty body for logout
                {
                    headers: getAuthHeader(),
                });

            return response.data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error; // Rethrow error to handle it where `logout` is called
        }
    },

    userRequests: async () =>{
        const response = await axios.get(`${API_URL}user/request/`, {
            headers: getAuthHeader(),
        });
        console.log(response.data)
        return response.data;
    },

    practiceUserRequests: async(practiceId)=>{
        console.log(getRequestParams);
        try {
            const response = await axios.get(`${API_URL}user/request/${practiceId}`, {
                headers: getAuthHeader(),
                params: getRequestParams(),  // Send params only if practice_id exists
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching requests:", error);
            throw error;
        }
    },

    requestJoin: async (data) => {
        const response = await axios.post(`${API_URL}user/request/`, data, {
            headers: getAuthHeader(),
        });
        // console.log(response.data)
        return response.data;
    },

    updateRequestStatus: async (id, updatedData) => {
        console.log(updatedData);
        const response = await axios.patch(`${API_URL}user/request/${id}/`, updatedData,{
            headers: getAuthHeader(),
            params: getRequestParams(),
        });
        // console.log(response.data);
        return response.data;
    }
};