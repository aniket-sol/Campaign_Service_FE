import axios from 'axios';
import { getRequestParams, getAuthHeader } from './utils';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const campaignAPI = {
    
    createCampaign: async (campaignData) => {
        const response = await axios.post(`${API_URL}campaign/`, campaignData, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    createCampaignSequence: async(sequenceData) =>{
        const response = await axios.post(`${API_URL}campaign/sequence`, sequenceData, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    // Get a list of all campaigns
    getCampaigns: async () => {
        try {
            const response = await axios.get(`${API_URL}campaign/`, {
                headers: getAuthHeader(),
                params: getRequestParams(),  // Send params only if practice_id exists
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            throw error;
        }
    },


    // Get a single campaign by ID
    getCampaignById: async (campaignId) => {
        // const response = await axios.get(`${API_URL}campaign/${campaignId}/`);
        const response = await axios.get(`${API_URL}campaign/${campaignId}/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    // Update an existing campaign
    updateCampaign: async (campaignId, updatedData) => {
        const response = await axios.patch(`${API_URL}campaign/${campaignId}/`, updatedData, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    // Delete a campaign by ID
    deleteCampaign: async (campaignId) => {
        const response = await axios.delete(`${API_URL}campaign/${campaignId}/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    },

    // Additional campaign-related functionality
    // Example: Get campaign analytics
    getCampaignAnalytics: async (campaignId) => {
        const response = await axios.get(`${API_URL}campaign/${campaignId}/analytics/`);
        return response.data;
    }
};
