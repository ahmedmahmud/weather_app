import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { usePlacesDispatch } from "../contexts/PlacesContext";
import { weatherIcon } from "../utils";

const PlaceInfo = ({ place: { name, admin1, id }, weather, navigation }) => {
  const dispatch = usePlacesDispatch();
  const removePlace = (id) => {
    dispatch({
      type: "remove",
      id,
    });
  };

  return (
    <View className="rounded-[40px] bg-slate-800 p-2 flex-row justify-between">
      <View className="justify-center p-3">
        <Text className="font-inter-700 text-white text-base">
          {name}, {admin1}
        </Text>
        {weather ? (
          weather.error ? (
            <Text className="text-white/80 mt-4 font-inter-800 text-base">
              Failed to get weather
            </Text>
          ) : (
            <View className="flex-row items-center space-x-5">
              <View className="flex-row">
                <Text className="text-white font-inter-500 text-4xl tracking-tighter">
                  {weather.current_weather?.temperature}
                </Text>
                <Text className="text-white font-inter-600 text-xl tracking-tighter">
                  °C
                </Text>
              </View>
              <Image
                source={weatherIcon(weather?.current_weather?.weathercode)}
                className="w-14 h-14"
              />
            </View>
          )
        ) : (
          <ActivityIndicator color="white" size="large" className="mt-4" />
        )}
      </View>
      <View className="space-y-2 justify-center">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Forecast", {
              daily: weather.daily,
            })
          }
          className="w-14 h-14 bg-slate-700 rounded-full items-center justify-center"
          disabled={!weather || weather.error}
        >
          <Feather name="calendar" size={24} color={!weather || weather.error ? '#ffffff44' : 'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-14 h-14 bg-slate-700 rounded-full items-center justify-center"
          onPress={() => removePlace(id)}
        >
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceInfo;
