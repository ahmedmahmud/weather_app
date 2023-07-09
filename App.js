import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'

import Navigation from './src/screens/Navigation';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

export default function App() {
  return (
    <NavigationContainer>
      <AutocompleteDropdownContextProvider>
        <Navigation />
      </AutocompleteDropdownContextProvider>
    </NavigationContainer>
  );
}