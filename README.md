# Vehicle Tracking Application

A real-time vehicle tracking application built with React, Redux, and NestJS that displays vehicle location, speed, and trip data on an interactive map.

## Overview

This application consists of:
- **Frontend**: React + TypeScript application with Redux state management
- **Backend**: NestJS WebSocket server that streams vehicle data
- **Map**: Interactive map using Leaflet with Jawg Maps (free alternative to Mapbox)

## Architecture

### Frontend (React + TypeScript)
- **Components**:
  - `Map.tsx`: Main map component using react-leaflet
  - `VehicleInfoPopup.tsx`: Popup component showing vehicle details
- **State Management**:
  - Redux store with `tripSlice` for vehicle data
  - `socketMiddleware` for WebSocket connection management
- **Map Provider**: Jawg Maps (free alternative to Mapbox)

### Backend (NestJS)
- WebSocket server using Socket.IO
- Vehicle data simulation service
- Real-time data streaming

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the project root:
   ```bash
   cd /path/to/prod-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run start:dev
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

## Running the Application

1. Start the backend server first (see Backend Setup)
2. Start the frontend application (see Frontend Setup)
3. Open your browser and navigate to `http://localhost:5173`
4. The map will automatically connect to the WebSocket server and start displaying vehicle data

## Testing Instructions

### Frontend Tests
Run the test suite from the client directory:
```bash
cd client
npm test
```

The test suite includes:
- Redux slice tests (`tripSlice.test.ts`)
- Component tests (if any)

### Manual Testing
1. **WebSocket Connection**: Verify the application connects to the backend
2. **Map Display**: Check that the map loads with the dark theme
3. **Vehicle Tracking**: Confirm the vehicle marker moves in real-time
4. **Popup Functionality**: Click on the vehicle marker to see trip details
5. **Route Display**: Verify the green polyline shows the vehicle's path

## Key Features

- **Real-time Vehicle Tracking**: Live updates of vehicle position, speed, and status
- **Interactive Map**: Dark-themed map with vehicle location and route visualization
- **Trip Information**: Click on vehicle marker to see detailed trip data
- **Route History**: Green polyline showing the complete trip path
- **Responsive Design**: Works on desktop and mobile devices

## Technical Decisions

### Map Provider Choice
- **Jawg Maps**: Used instead of Mapbox due to cost considerations
- **Free Tier**: Jawg Maps provides a free tier with dark theme support
- **Leaflet Integration**: Used react-leaflet for better React integration

### State Management
- **Redux Toolkit**: For predictable state management
- **Socket Middleware**: Custom middleware for WebSocket connection handling
- **Real-time Updates**: Automatic state updates when new vehicle data arrives

### Component Architecture
- **Functional Components**: Modern React with hooks
- **TypeScript**: Full type safety throughout the application
- **Modular Design**: Separated concerns between map, popup, and state management

## Assumptions Made

1. **WebSocket Protocol**: Assumed the backend uses Socket.IO for real-time communication
2. **Data Format**: Vehicle data includes lat, lng, speed, angle, status, timestamp, and currentAddress
3. **Map Requirements**: Dark theme map was preferred for better UX
4. **Free Map Service**: Used Jawg Maps as a free alternative to Mapbox
5. **Browser Support**: Modern browsers with ES6+ support
6. **Network**: Stable internet connection for map tiles and WebSocket communication

## Dependencies

### Frontend
- `react`: ^18.0.0
- `react-dom`: ^18.0.0
- `react-redux`: ^8.0.0
- `@reduxjs/toolkit`: ^1.9.0
- `react-leaflet`: ^4.2.1
- `leaflet`: ^1.9.0
- `socket.io-client`: ^4.7.0
- `vite`: ^4.0.0
- `typescript`: ^5.0.0

### Backend
- `@nestjs/core`: Latest
- `@nestjs/websockets`: Latest
- `socket.io`: Latest

## Troubleshooting

### Map Not Loading
- Check your internet connection
- Verify the Jawg Maps access token is valid
- Clear browser cache and reload

### WebSocket Connection Issues
- Ensure the backend server is running on port 3000
- Check browser console for connection errors
- Verify firewall settings aren't blocking the connection

### Build Issues
- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility
- Verify TypeScript configuration

## License

This project is for educational/demonstration purposes.
