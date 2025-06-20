# Front-End Developer Skills Assessment Task

This project is a web UI for a Location Intelligence System, visualizing the live location and trip information of a single vehicle on an interactive map. It was built with React, Redux Toolkit, and Mapbox GL JS.

## Features

-   Live vehicle tracking on a Mapbox map.
-   Real-time updates via WebSockets.
-   Vehicle information popup with plate number, average speed, trip mileage, and status.
-   Responsive design for desktop and mobile.
-   Redux Toolkit for state management.
-   TypeScript for type safety.

## Architecture Overview

The application is structured as follows:

-   **`src/components`**: Contains the main React components:
    -   `Map.tsx`: The core component that renders the Mapbox map, the vehicle marker, and the popup.
    -   `VehicleInfoPopup.tsx`: The component for the popup content.
-   **`src/store`**: Manages the application's state using Redux Toolkit.
    -   `tripSlice.ts`: Defines the state structure and reducers for the vehicle and trip data. It includes logic for calculating average speed and mileage.
    -   `socketMiddleware.ts`: A custom middleware that handles the WebSocket connection, subscribes to vehicle data, and dispatches actions based on server events.
    -   `index.ts`: Configures and creates the Redux store.
-   **`src/assets`**: Contains static assets like the vehicle icon.
-   **`App.tsx`**: The main application component that orchestrates the UI.
-   **`main.tsx`**: The entry point of the application, where the Redux store is provided to the React app.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   A Mapbox Access Token

### Setup and Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/EmcodeTech/prod-assignment.git
    cd prod-assignment
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd client
    npm install
    ```

4.  **Set up Mapbox token:**
    Create a `.env.local` file in the `client` directory:
    ```
    VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
    ```
    Replace `your_mapbox_access_token` with your actual token from [Mapbox](https://www.mapbox.com/).

5.  **Start the backend data simulator:**
    In the root directory of the project, run:
    ```bash
    npm run start:dev
    ```
    The backend will start on `http://localhost:3000`.

6.  **Start the frontend development server:**
    In the `client` directory, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Testing

Unit tests have been added for the Redux state logic using Jest and `ts-jest`.

To run the tests, execute the following command in the root directory of the project:

```bash
npm test -- jest.json client/src/store/tripSlice.test.ts
```

## Assumptions

-   The backend simulator is running and available at `ws://localhost:3000`.
-   The Haversine formula is used for mileage calculation, which provides a good approximation for the Earth's curvature.
-   The provided triangle icon is used for the vehicle marker.
-   The `DXB-CX-36357` vehicle is the one to be tracked as per the requirements.

## Bonus Points

-   **TypeScript:** The project is written entirely in TypeScript, ensuring type safety.
-   **Modern Best Practices:** The project uses modern React features like hooks and functional components, along with Redux Toolkit for efficient state management.
-   **Clean Architecture:** The code is organized into logical modules for components, state management, and services.
-   **Animation:** The vehicle marker smoothly rotates to its new angle.
