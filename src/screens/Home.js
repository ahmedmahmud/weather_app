import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from 'expo-location';

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    let { status } = await Location.getForegroundPermissionsAsync()
    if (status !== 'granted') {
      setError("Don't have location permissions!");
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    console.log("loc:", coords);

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
    );
    const data = await response.json();
    setData(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }
      console.log("wow");
      // setLocation(location);
    })();

    fetchWeather();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>Today: { data.current_weather.temperature } °C</Text>
        </View>
      )}
    </View>
  );
}

export default Home;
