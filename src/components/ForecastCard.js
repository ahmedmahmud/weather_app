import React from "react";
import { View, Text, Image } from 'react-native';

import { getDayName } from "../utils";

const ForecastCard = ({ date, max, min }) => {
  return (
    <View className="p-5 bg-slate-800 mx-5 my-2 rounded-3xl flex-row justify-between items-center">
      <View>
        <Text className="text-white/95 font-inter-600 text-base mb-3">
          {getDayName(date)}
        </Text>
        <Text className="text-white/75 font-inter-600 text-lg">
          Max:
          <Text className="text-white"> {max}°C</Text>
        </Text>
        <Text className="text-white/75 font-inter-600 text-lg">
          Min:
          <Text className="text-white"> {min}°C</Text>
        </Text>
      </View>
      <Image
        source={require("../../assets/weather_icons/drizzle.png")}
        className="h-24 w-24"
      />
    </View>
  );
};

export default ForecastCard;
