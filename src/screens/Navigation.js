import React from 'react';
import { View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from './Home';
import Forecast from './Forecast';
import Result from './Result';

const Stack = createNativeStackNavigator();

function Navigation() {
  const insets = useSafeAreaInsets();

  return (
    <View
    className="bg-slate-900 flex-1"
    style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}
  >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Forecast" component={Forecast} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </View>
  );
}

export default Navigation;