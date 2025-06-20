import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RootState } from '../store';
import VehicleInfoPopup from './VehicleInfoPopup';

const vehicleMarkerSvg = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="24" fill="#1976D2" fill-opacity="0.2"/>
  <circle cx="24" cy="24" r="16" fill="#1976D2"/>
  <path d="M24 16L29 27H19L24 16Z" fill="white"/>
</svg>`;

const vehicleIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(vehicleMarkerSvg)}`,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

const MapComponent = () => {
  const { currentPosition, dataPoints } = useSelector((state: RootState) => state.trip);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([25.20, 55.27]);

  useEffect(() => {
    if (currentPosition) {
      setMapCenter([currentPosition.lat, currentPosition.lng]);
    }
  }, [currentPosition]);

  const tripPath: LatLngExpression[] = dataPoints.map(p => [p.lat, p.lng]);

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ width: '100vw', height: '100vh' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=4899IdJEktm3G5ORGZOCjnPxzYRs8TKcZOJtv0zXnx21gl6FkrmpGQXob4yi3Eah"
          attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">JawgMaps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Polyline pathOptions={{ color: '#308552', weight: 4 }} positions={tripPath} />

        {currentPosition && (
          <Marker position={[currentPosition.lat, currentPosition.lng]} icon={vehicleIcon}>
            <Popup>
              <VehicleInfoPopup />
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default MapComponent;