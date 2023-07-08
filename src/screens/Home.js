import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchWeather = async () => {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true"
    );
    const data = await response.json();
    setData(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
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
