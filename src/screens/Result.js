import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { usePlaces, usePlacesDispatch } from "../contexts/PlacesContext";

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
    <View>
      <Text>{place.name}</Text>
      <Text>{place.latitude}</Text>
      <Text>{place.longitude}</Text>
      {saved ? (
        <Text>Saved</Text>
      ) : (
        <TouchableOpacity onPress={() => addPlace(place)}>
          <Text>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Result;
