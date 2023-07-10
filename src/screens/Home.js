import React from "react";
import { View, ScrollView } from "react-native";

import CityDropdown from "../components/CityDropdown";
import { usePlaces } from "../contexts/PlacesContext";
import useWeather from "../hooks/useWeather";
import PlaceInfo from "../components/PlaceInfo";
import CurrentWeather from "../components/CurrentWeather";

function Home({ navigation }) {
  const places = usePlaces();
  const [savedData, refresh] = useWeather(places);

  return (
    <ScrollView
      // keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      className="flex-1 bg-slate-900"
    >
      <View className="px-3 mt-2">
        <CityDropdown navigation={navigation} />
        <CurrentWeather navigation={navigation} />
        {places.map((place) => (
          <PlaceInfo place={place} />
        ))}
      </View>
    </ScrollView>
  );
}

export default Home;
