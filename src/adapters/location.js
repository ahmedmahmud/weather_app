import * as Location from 'expo-location';

const getCurrentCoords = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return { error: 'Permission to access location was denied' }
    }
  } catch {
    return { error: 'Failed to request for location permissions' }
  }

  try {
    let { coords } = await Location.getCurrentPositionAsync();
    return coords;
  } catch {
    return { error: 'Failed to get current position' }
  }
  
}

export { getCurrentCoords };