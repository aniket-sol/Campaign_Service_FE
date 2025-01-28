import {store} from '../store/store';
// utils.js - Utility file for API helpers

export const getRequestParams = () => {
    const { user } = store.getState().auth;
    const practice_id = user?.practice_id || null;

    // Return params object, including practice_id only if it exists
    return practice_id ? { practice_id } : {};
};

export const getAuthHeader = () => {
    const { user } = store.getState().auth; // Access Redux state directly
    const token = user?.session_token; // Retrieve session_token
    return { Authorization: `Bearer ${token}` }; // Return the Authorization header
};