import { configureStore } from '@reduxjs/toolkit';
import callReducer from './callWidgetSlice'; 
import authReducer from './authSlice';
import agentReducer from './agentsSlice';

const store = configureStore({
  reducer: {
    call: callReducer,
    auth: authReducer,
    agents: agentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;