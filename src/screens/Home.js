import React, { useState, useEffect, useReducer } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import useCurrentWeather from "../hooks/useCurrentWeather";
import CityDropdown from "../components/CityDropdown";
import { usePlaces, usePlacesDispatch } from "../contexts/PlacesContext";

function Home({ navigation }) {
  const [data, loading, error] = useCurrentWeather();

  const places = usePlaces();
  const dispatch = usePlacesDispatch();

  const removePlace = (id) => {
    dispatch({
      type: 'remove',
      id,
    });
  };

  return (
    <ScrollView
      nestedScrollEnabled
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      // contentContainerStyle={{ paddingBottom: 200 }}
      style={{ flex: 1 }}
    >
      <View className="justify-center items-center flex-1 bg-white">
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View>
            <Text>Today: {data.current_weather.temperature} °C</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Forecast", {
                  daily: data.daily,
                })
              }
            >
              <Text>View forecast</Text>
            </TouchableOpacity>
            <CityDropdown navigation={navigation} />
            {
              places.map((place) => (
                <View>
                  <Text>{place.name}</Text>
                  <TouchableOpacity onPress={() => removePlace(place.id)}>
                    <Text>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Home;
