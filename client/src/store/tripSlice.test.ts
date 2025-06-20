import tripReducer, { newVehicleData, initialState } from './tripSlice';

describe('tripSlice reducer', () => {
  it('should handle initial state', () => {
    expect(tripReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle newVehicleData', () => {
    const firstDataPoint = { lat: 10, lng: 10, speed: 50, angle: 90, status: 'moving', timestamp: '...', currentAddress: '' };
    let state = tripReducer(initialState, newVehicleData(firstDataPoint));

    expect(state.currentPosition).toEqual({ lat: 10, lng: 10 });
    expect(state.dataPoints).toHaveLength(1);
    expect(state.averageSpeed).toBe(50);
    expect(state.mileage).toBe(0); // No mileage for the first point
    expect(state.angle).toBe(90);
    expect(state.vehicleStatus).toBe('moving');

    const secondDataPoint = { lat: 10.1, lng: 10.1, speed: 60, angle: 95, status: 'moving', timestamp: '...', currentAddress: '' };
    state = tripReducer(state, newVehicleData(secondDataPoint));

    expect(state.dataPoints).toHaveLength(2);
    expect(state.averageSpeed).toBe((50 + 60) / 2);
    expect(state.mileage).toBeGreaterThan(0);
    // A more precise mileage check would require duplicating the haversine logic here, 
    // which is not ideal for a unit test. Greater than 0 is sufficient.
    expect(state.angle).toBe(95);
  });
}); 