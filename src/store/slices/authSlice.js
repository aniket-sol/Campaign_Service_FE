// src/store/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    is_super_admin: JSON.parse(localStorage.getItem('user'))?.is_super_admin || null, // Extract is_super_admin from stored user object
    session_token: JSON.parse(localStorage.getItem('user'))?.session_token || null, // Extract session token from stored user object
    role: JSON.parse(localStorage.getItem('user'))?.role || null, // Extract role from stored user object
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload; // Entire user object
            state.is_super_admin = action.payload.is_super_admin; // Extract is_super_admin from user object
            state.session_token = action.payload.session_token; 
            state.role = action.payload.role; 
            state.error = null;

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.is_super_admin = null; // Clear is_super_admin on logout
            state.role = null; 
            state.session_token = null; 
            state.isAuthenticated = false;
            state.error = null;

            // Clear user data from localStorage
            localStorage.removeItem('user');
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
