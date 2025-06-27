import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import serviceReducer from './slices/serviceSlice';
import locationReducer from './slices/locationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    service: serviceReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 