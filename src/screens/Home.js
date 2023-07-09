import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import useCurrentWeather from "../hooks/useCurrentWeather";
import CityDropdown from "../components/CityDropdown";

function Home({ navigation }) {
  const [data, loading, error] = useCurrentWeather();

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
          <TouchableOpacity onPress={() => navigation.navigate('Forecast', {
            daily: data.daily
          })}>
            <Text>View forecast</Text>
          </TouchableOpacity>
          <CityDropdown navigation={navigation} />
        </View>
      )}
    </View>
    </ScrollView>
  );
}

export default Home;
