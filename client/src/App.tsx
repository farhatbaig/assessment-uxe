import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToVehicle } from './store/tripSlice';
import './App.css';
import MapComponent from './components/Map';

// Placeholder components for now
// const MapComponent = () => <div style={{ height: '100vh', width: '100%', backgroundColor: '#f0f0f0' }}>Map will be here</div>;
// const VehicleInfo = () => <div style={{ position: 'absolute', top: 20, left: 20, background: 'white', padding: 10, borderRadius: 5 }}>Vehicle info</div>;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Subscribe to the specific vehicle mentioned in the requirements
    dispatch(subscribeToVehicle('DXB-CX-36357'));
  }, [dispatch]);

  return (
    <>
      <MapComponent />
    </>
  );
}

export default App;
