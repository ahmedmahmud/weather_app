import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { usePlaces, usePlacesDispatch } from "../contexts/PlacesContext";
import Header from "../components/Header";
import useWeather from "../hooks/useWeather";
import { weatherIcon } from "../utils";

const Result = ({ route, navigation }) => {
  const { place } = route.params;

  const places = usePlaces();
  const saved = useMemo(
    () => places.some(({ id }) => id == place.id),
    [places]
  );

  const [data, loading, error] = useWeather(place);

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
          {loading ? (
            <ActivityIndicator color="white" size={34} />
          ) : error || !data ? (
            <Text className="text-white/80 font-inter-800 text-base">
              Failed to get weather
            </Text>
          ) : (
            <>
              <Image
                source={weatherIcon(data.current_weather?.weathercode)}
              />
              <View className="flex-row">
                <Text className="text-white font-inter-500 text-6xl tracking-tighter">
                  {data.current_weather?.temperature}
                </Text>
                <Text className="text-white font-inter-600 text-2xl tracking-tighter">
                  °C
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        className="bg-slate-800 items-center p-2 mx-5 mt-5 rounded-[40px]"
        onPress={() => addPlace(place)}
        disabled={saved}
      >
        <Text
          className={`${
            saved ? "text-white/40" : "text-white/100"
          } font-inter-600 text-lg`}
        >
          {saved ? "SAVED" : "SAVE"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
