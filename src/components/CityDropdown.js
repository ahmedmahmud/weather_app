import React, { memo, useCallback, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Text,
  View,
  Platform,
  ScrollView,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

// import Feather from '@expo/vector-icons/Feather'
// Feather.loadFont()

const CityDropdown = memo(({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    console.log("search place", q);
    if (typeof q !== "string" || q.length < 2) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${filterToken}&count=10&language=en&format=json`
    );
    const { results } = await response.json();
    setSuggestionsList(results);
    setLoading(false);
  }, []);

  const onSelectItem = ((item) => {
    item && navigation.navigate("Result", {
      place: item
    })
  })

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  return (

      <AutocompleteDropdown
        ref={searchRef}
        controller={(controller) => {
          dropdownController.current = controller;
        }}
        dataSet={suggestionsList}
        onChangeText={getSuggestions}
        onSelectItem={onSelectItem}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
        onClear={onClearPress}
        loading={loading}
        useFilter={false}
        textInputProps={{
          placeholder: "Search city...",
          autoCorrect: false,
          autoCapitalize: "none",
          // style: {
          //   borderRadius: 25,
          //   backgroundColor: "#383b42",
          //   color: "#fff",
          //   paddingLeft: 18,
          // },
        }}

        renderItem={(item, text) => (
          <Text style={{ padding: 15 }}>{item.name}</Text>
        )}

        inputHeight={50}
        showChevron={false}
        closeOnBlur={false}
      />
  );
});

export default CityDropdown;
