import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'

import Navigation from './src/screens/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}