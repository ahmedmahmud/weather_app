import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import useCurrentWeather from "../hooks/useCurrentWeather";
import { todayName, weatherIcon } from "../utils";

const CurrentWeather = ({ navigation }) => {
  const [data, loading, error] = useCurrentWeather();

  if (loading) return (
    <View className="rounded-[40px] bg-slate-800 items-center mt-5 p-5">
      <ActivityIndicator color='white' size={40} />
    </View>
  );

  if (error) return (
    <View className="rounded-[40px] bg-slate-800 items-center mt-5 p-5">
      <Text className="text-white font-inter-800 text-base">Failed to get current weather</Text>
    </View>
  );

  return (
    <View className="rounded-[40px] bg-slate-800 mt-5">
      <View className="p-6 space-y-5">
        <View className="items-center space-y-5">
          <Text className="text-white/80 text-lg tracking-tight font-inter-700">
            {todayName()}
          </Text>
          <Image source={weatherIcon(data.current_weather.weathercode)} />
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
          <View className="flex-1 flex-row justify-center items-center space-x-2">
            <Feather name="wind" color="#ffffffbb" size={24} />
            <Text className="text-white font-inter-600 tracking-tight text-base">
              {data.current_weather.windspeed} km/h
            </Text>
          </View>
          <View className="flex-1 flex-row justify-center items-center space-x-2">
          <Feather name="compass" color="#ffffffbb" size={24} />
            <Text className="text-white font-inter-600 tracking-tight text-base">
            {data.current_weather.winddirection}°
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
