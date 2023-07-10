import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJson = async (key) => {
  try {
    const string = await AsyncStorage.getItem(key);
    return string != null ? JSON.parse(string) : null;
  } catch (e) { 
    // error reading value
  }
};

export const storeJson = async (key, value) => {
  try {
    const string = JSON.stringify(value);
    await AsyncStorage.setItem(key, string);
  } catch (e) {
    // saving error
  }
};
