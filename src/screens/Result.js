import React from "react";
import { View, Text } from 'react-native'

const Result = ({ route, navigation }) => {
  const { place } = route.params;
  return (
    <View>
      <Text>{place.name}</Text>
      <Text>{place.latitude}</Text>
      <Text>{place.longitude}</Text>
    </View>
  )
};

export default Result;