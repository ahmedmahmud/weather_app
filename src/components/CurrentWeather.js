import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import useCurrentWeather from "../hooks/useCurrentWeather";

const CurrentWeather = ({ navigation }) => {
  const [data, loading, error] = useCurrentWeather();

  if (loading) return (
    <Text>Loaidng...</Text>
  );

  if (error) return (
    <Text>Error: { error }</Text>
  );

  return (
    <View className="rounded-[40px] bg-slate-800">
      <View className="p-6 space-y-5">
        <View className="flex-row justify-between px-2">
          <Text className="text-white/80 text-lg tracking-tight font-inter-700">
            Monday
          </Text>
          <Text className="text-white/80 text-lg tracking-tight font-inter-700">
            12:34 pm
          </Text>
        </View>
        <View className="items-center space-y-5">
          <Image source={require("../../assets/weather_icons/drizzle.png")} />
          <View className="flex-row">
            <Text className="text-white font-inter-500 text-6xl tracking-tighter">
              {data.current_weather.temperature}
            </Text>
            <Text className="text-white font-inter-600 text-2xl tracking-tighter">
              °C
            </Text>
          </View>
        </View>
        <View className="flex-row">
          <View className="flex-1 justify-center items-center">
            <Text className="text-white/80 font-bold tracking-tight text-base">
              Wind
            </Text>
            <Text className="text-white tracking-tight font-bold text-base">
              5-8 km/h
            </Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <Text className="text-white/80 font-bold tracking-tight text-base">
              Humidity
            </Text>
            <Text className="text-white tracking-tight font-bold text-base">
              50%
            </Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <Text className="text-white/80 font-bold tracking-tight text-base">
              Rain
            </Text>
            <Text className="text-white tracking-tight font-bold text-base">
              3%
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="bg-slate-700 rounded-b-[40px]"
        onPress={() =>
          navigation.navigate("Forecast", {
            daily: data.daily,
          })
        }
      >
        <Text className="text-center font-inter-900 text-white/80 py-2">
          VIEW FORECAST
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentWeather;
