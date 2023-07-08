import * as Location from 'expo-location';

const getCurrentCoords = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return { error: 'Permission to access location was denied' }
  }

  let { coords } = await Location.getCurrentPositionAsync();
  return coords;
}

export { getCurrentCoords };