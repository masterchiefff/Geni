// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import callWidgetReducer from './callWidgetSlice';

export const store = configureStore({
  reducer: {
    callWidget: callWidgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;