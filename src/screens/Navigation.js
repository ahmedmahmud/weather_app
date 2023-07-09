import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Forecast from './Forecast';
import Result from './Result';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Forecast" component={Forecast} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}

export default Navigation;