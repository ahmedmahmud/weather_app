import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Feather from "@expo/vector-icons/Feather";

import { usePlacesDispatch } from "../contexts/PlacesContext";

const PlaceInfo = ({ place: { id, name } }) => {
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
        <Text className="font-inter-700 text-white text-base">Widnes, UK</Text>
        <View className="flex-row items-center space-x-5">
          <View className="flex-row">
            <Text className="text-white font-inter-500 text-4xl tracking-tighter">
              22
            </Text>
            <Text className="text-white font-inter-600 text-xl tracking-tighter">
              °C
            </Text>
          </View>
          <Image
            source={require("../../assets/weather_icons/drizzle.png")}
            className="w-14 h-14"
          />
        </View>
      </View>
      <View className="space-y-2 justify-center">
        <TouchableOpacity className="w-14 h-14 bg-slate-700 rounded-full items-center justify-center">
          <Feather name="calendar" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="w-14 h-14 bg-slate-700 rounded-full items-center justify-center">
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceInfo;
