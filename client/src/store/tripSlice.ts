import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VehicleDataPoint {
  lat: number;
  lng: number;
  angle: number;
  speed: number;
  status: string;
  timestamp: string;
  currentAddress: string;
}

interface TripState {
  plate: string | null;
  dataPoints: VehicleDataPoint[];
  subscriptionStatus: 'idle' | 'subscribed' | 'unsubscribed' | 'error';
  error: string | null;
  currentPosition: { lat: number; lng: number } | null;
  averageSpeed: number;
  mileage: number;
  angle: number;
  vehicleStatus: string;
  currentAddress: string;
}

export const initialState: TripState = {
  plate: null,
  dataPoints: [],
  subscriptionStatus: 'idle',
  error: null,
  currentPosition: null,
  averageSpeed: 0,
  mileage: 0,
  angle: 0,
  vehicleStatus: 'N/A',
  currentAddress: '',
};

// Haversine formula to calculate distance between two lat/lng points
const haversineDistance = (
  coords1: { lat: number; lng: number },
  coords2: { lat: number; lng: number },
): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    subscribeToVehicle: (state, action: PayloadAction<string>) => {
      state.plate = action.payload;
      state.subscriptionStatus = 'idle'; // Will be updated by socket middleware
    },
    subscriptionSuccess: state => {
      state.subscriptionStatus = 'subscribed';
      state.error = null;
    },
    subscriptionError: (state, action: PayloadAction<string>) => {
      state.subscriptionStatus = 'error';
      state.error = action.payload;
    },
    newVehicleData: (state, action: PayloadAction<VehicleDataPoint>) => {
      const newDataPoint = action.payload;
      if (state.currentPosition) {
        state.mileage += haversineDistance(state.currentPosition, {
          lat: newDataPoint.lat,
          lng: newDataPoint.lng,
        });
      }

      state.dataPoints.push(newDataPoint);
      state.currentPosition = { lat: newDataPoint.lat, lng: newDataPoint.lng };
      
      const totalSpeed = state.dataPoints.reduce((sum, dp) => sum + dp.speed, 0);
      state.averageSpeed = totalSpeed / state.dataPoints.length;
      
      state.angle = newDataPoint.angle;
      state.vehicleStatus = newDataPoint.status;
    },
    resetTrip: () => initialState,
  },
});

export const {
  subscribeToVehicle,
  subscriptionSuccess,
  subscriptionError,
  newVehicleData,
  resetTrip,
} = tripSlice.actions;

export default tripSlice.reducer; 