import React, { useState, useEffect, useReducer } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import useCurrentWeather from "../hooks/useCurrentWeather";
import CityDropdown from "../components/CityDropdown";
import { usePlaces, usePlacesDispatch } from "../contexts/PlacesContext";
import useWeather from "../hooks/useWeather";

function Home({ navigation }) {
  const [data, loading, error] = useCurrentWeather();

  const places = usePlaces();
  const [savedData, refresh] = useWeather(places);

  const dispatch = usePlacesDispatch();
  const removePlace = (id) => {
    dispatch({
      type: "remove",
      id,
    });
  };

  return (
    <ScrollView
      nestedScrollEnabled
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
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
            {places.map(({ name, id }) => (
              <View>
                <Text>{name}</Text>
                <TouchableOpacity onPress={() => removePlace(id)}>
                  <Text>Remove</Text>
                </TouchableOpacity>
                {savedData[id] ? (
                  savedData[id].error ? (
                    <Text>Error</Text>
                  ) : (
                    <Text>{savedData[id].current_weather.temperature}</Text>
                  )
                ) : (
                  <Text>Loading...</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Home;
