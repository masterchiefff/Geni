// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null, // Add user information
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload; 
    },
    clearToken(state) {
      state.token = null;
      state.user = null; // Clear user information on logout
    },
  },
});

export const { setToken, setUser, clearToken } = authSlice.actions;
export default authSlice.reducer;