import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import useCurrentWeather from "../hooks/useCurrentWeather";

function Home({ navigation }) {
  const [data, loading, error] = useCurrentWeather();

  return (
    <View className="justify-center items-center flex-1 bg-white">
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>
          <Text>Today: {data.current_weather.temperature} °C</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Forecast')}>
            <Text>View forecast</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Home;
