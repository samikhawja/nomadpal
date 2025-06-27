import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Service {
  id: string;
  providerId: string;
  type: 'guide' | 'driver' | 'host' | 'tour';
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  rating: number;
  verified: boolean;
}

interface ServiceState {
  services: Service[];
}

const initialState: ServiceState = {
  services: [],
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<Service[]>) {
      state.services = action.payload;
    },
    addService(state, action: PayloadAction<Service>) {
      state.services.push(action.payload);
    },
  },
});

export const { setServices, addService } = serviceSlice.actions;
export default serviceSlice.reducer; 