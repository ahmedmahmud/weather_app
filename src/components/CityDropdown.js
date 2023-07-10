import React, { memo, useCallback, useRef, useState } from "react";
import { Dimensions, Text, Image, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const CityDropdown = memo(({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== "string" || q.length < 1) {
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

  const onSelectItem = (item) => {
    if (item) {
      navigation.navigate("Result", {
        place: item,
      });
      setSuggestionsList(null);
    }
  };

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
        style: {
          color: "#fff",
          paddingLeft: 18,
        },
      }}
      inputContainerStyle={{
        backgroundColor: "#1E293B",
        borderRadius: 25,
      }}
      suggestionsListContainerStyle={{
        backgroundColor: "#1E293B",
        borderRadius: 25,
      }}
      ItemSeparatorComponent={<View className="h-0" />}

      renderItem={({ name, admin1, country_code }) => (
        <View className="flex-row items-center pl-2 py-2 rounded-full">
          <Image
            className="w-10 aspect-square rounded-full"
            source={{
              uri: `https://flagcdn.com/w160/${(country_code || '').toLowerCase()}.png`,
            }}
          />
          <Text className="text-white" style={{ padding: 15 }}>
            {name}, {admin1}
          </Text>
        </View>
      )}

      inputHeight={50}
      showChevron={false}
      closeOnBlur={false}
    />
  );
});

export default CityDropdown;
