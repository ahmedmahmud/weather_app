import React from "react";
import { View, Text } from "react-native";
import { getDayName } from "../utils";

function Forecast({ route, navigation }) {
  const { daily } = route.params;

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>Forecast Screen</Text>
      {daily.time.map((date, i) => (
        <View>
          <Text>Day: { getDayName(date) }</Text>
          <Text>Max: { daily.temperature_2m_max[i] }</Text>
          <Text>Min: { daily.temperature_2m_min[i] }</Text>
        </View>
      ))}
    </View>
  );
}

export default Forecast;
