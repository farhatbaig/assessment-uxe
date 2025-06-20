import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { subscriptionSuccess, subscriptionError, newVehicleData, subscribeToVehicle } from './tripSlice';

const socketMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isSubscribeAction = subscribeToVehicle.match(action);

    if (isSubscribeAction) {
      if (socket) {
        socket.disconnect();
      }

      socket = io('ws://localhost:3000');

      socket.on('connect', () => {
        console.log('Socket connected');
        socket.emit('subscribeToVehicle', { plate: action.payload });
      });

      socket.on('subscribed', () => {
        store.dispatch(subscriptionSuccess());
      });

      socket.on('vehicleData', (data) => {
        // The server emits { plate, data }, we just need data
        store.dispatch(newVehicleData(data.data));
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
        store.dispatch(subscriptionError(error.message || 'An unknown error occurred.'));
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }

    return next(action);
  };
};

export default socketMiddleware; 