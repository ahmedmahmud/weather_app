import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { usePlaces, usePlacesDispatch } from "../contexts/PlacesContext";
import Header from "../components/Header";

const Result = ({ route, navigation }) => {
  const { place } = route.params;

  const places = usePlaces();
  const saved = useMemo(
    () => places.some(({ id }) => id == place.id),
    [places]
  );

  const dispatch = usePlacesDispatch();
  const addPlace = (place) => {
    dispatch({
      type: "add",
      place,
    });
  };

  return (
    <View className="bg-slate-900 flex-1">
      <Header navigation={navigation} title={place.name} />
      <View className="rounded-[40px] bg-slate-800 mx-5 mt-2 p-6 space-y-5">
        <View className="items-center space-y-5">
          <Image source={require("../../assets/weather_icons/drizzle.png")} />
          <View className="flex-row">
            <Text className="text-white font-inter-500 text-6xl tracking-tighter">
              10
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
        className="bg-slate-800 items-center p-2 mx-5 mt-5 rounded-[40px]"
        onPress={() => addPlace(place)}
        disabled={saved}
      >
        <Text className={`${saved ? 'text-white/40' : 'text-white/100'} font-inter-600 text-lg`}>
          {saved ? "SAVED" : "SAVE"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
