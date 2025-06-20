import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToVehicle } from './store/tripSlice';
import './App.css';
import MapComponent from './components/Map';



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
