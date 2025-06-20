import { useState, useEffect, useRef } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import VehicleInfoPopup from './VehicleInfoPopup';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const { currentPosition, dataPoints } = useSelector((state: RootState) => state.trip);
  const [viewState, setViewState] = useState({
    longitude: 55.27,
    latitude: 25.20,
    zoom: 12
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (currentPosition) {
      setViewState(prev => ({
        ...prev,
        longitude: currentPosition.lng,
        latitude: currentPosition.lat
      }));
    }
  }, [currentPosition]);

  const tripPathGeoJSON = {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: dataPoints.map(p => [p.lng, p.lat])
    }
  };

  const vehicleGeoJSON = currentPosition ? {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'Point' as const,
      coordinates: [currentPosition.lng, currentPosition.lat]
    }
  } : null;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        {...viewState}
        onMoveEnd={(evt: any) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken="pk.eyJ1IjoiZmFyaGF0YmFpZyIsImEiOiJjam9zb3J6Z20wMTB4M3BveGhoY3V5dWY0In0.ti_w1acFkNHWPNyFuCPbvg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Trip Path Layer */}
        <Source id="trip-path" type="geojson" data={tripPathGeoJSON}>
          <Layer
            id="trip-path-layer"
            type="line"
            paint={{
              'line-color': '#308552',
              'line-width': 4
            }}
          />
        </Source>

        {/* Vehicle Marker */}
        {currentPosition && (
          <Marker
            longitude={currentPosition.lng}
            latitude={currentPosition.lat}
            onClick={() => setShowPopup(true)}
          >
            <div
              style={{
                cursor: 'pointer',
                width: '36px',
                height: '37px'
              }}
            >
              <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.5" width="36" height="36" rx="18" fill="#2D2D2D"/>
                <path d="M25.1834 15.5413C24.3084 11.6913 20.9501 9.95801 18.0001 9.95801C18.0001 9.95801 18.0001 9.95801 17.9917 9.95801C15.0501 9.95801 11.6834 11.683 10.8084 15.533C9.83341 19.833 12.4667 23.4747 14.8501 25.7663C15.7334 26.6163 16.8667 27.0413 18.0001 27.0413C19.1334 27.0413 20.2667 26.6163 21.1417 25.7663C23.5251 23.4747 26.1584 19.8413 25.1834 15.5413ZM18.0001 19.7163C16.5501 19.7163 15.3751 18.5413 15.3751 17.0913C15.3751 15.6413 16.5501 14.4663 18.0001 14.4663C19.4501 14.4663 20.6251 15.6413 20.6251 17.0913C20.6251 18.5413 19.4501 19.7163 18.0001 19.7163Z" fill="#BABABA"/>
              </svg>
            </div>
          </Marker>
        )}

        {showPopup && currentPosition && (
          <Marker
            longitude={currentPosition.lng}
            latitude={currentPosition.lat}
            offset={[0, -37]}
            anchor="bottom"
          >
            <VehicleInfoPopup />
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#E0E0E0'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;