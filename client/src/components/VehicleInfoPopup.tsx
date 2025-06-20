import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './VehicleInfoPopup.css';
import speedIcon from '../assets/speed-icon.svg';

const VehicleInfoPopup = () => {
  const { plate, averageSpeed, mileage, vehicleStatus } = useSelector((state: RootState) => state.trip);

  return (
    <div className="vehicle-info-popup">
      <div className="info-header">
        <span>{plate}</span>
      </div>
      <div className="info-body">
        <div className="info-stats">
          <div className="stat-item">
            <img src={speedIcon} alt="speed" />
            <span>{averageSpeed.toFixed(0)} km/h</span>
          </div>
          <div className="stat-item">
            <span>{vehicleStatus}</span>
          </div>
          <div className="stat-item">
            <span>{mileage.toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoPopup; 