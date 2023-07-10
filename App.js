import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import Navigation from "./src/screens/Navigation";
import { PlacesProvider } from "./src/contexts/PlacesContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AutocompleteDropdownContextProvider>
          <PlacesProvider>
            <StatusBar style="light" />
              <Navigation />
          </PlacesProvider>
        </AutocompleteDropdownContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
