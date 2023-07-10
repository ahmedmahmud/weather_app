import React from "react";
import { View, ScrollView, RefreshControl } from "react-native";

import CityDropdown from "../components/CityDropdown";
import { usePlaces } from "../contexts/PlacesContext";
import useWeatherList from "../hooks/useWeatherList";
import PlaceInfo from "../components/PlaceInfo";
import CurrentWeather from "../components/CurrentWeather";

function Home({ navigation }) {
  const places = usePlaces();
  const [savedData, refresh] = useWeatherList(places);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="flex-1 bg-slate-900"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="px-3 mt-3">
        <CityDropdown navigation={navigation} />
        <CurrentWeather navigation={navigation} />
        <View className="mt-5">
          {places.map((place) => (
            <View className="mb-5" key={place.id}>
              <PlaceInfo place={place} weather={savedData[place.id]} navigation={navigation} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;
