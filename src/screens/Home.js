import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import useCurrentWeather from "../hooks/useCurrentWeather";

function Home() {
  const [data, loading, error] = useCurrentWeather();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>
          <Text>Today: {data.current_weather.temperature} °C</Text>
        </View>
      )}
    </View>
  );
}

export default Home;
