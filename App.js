import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import Navigation from './src/screens/Navigation';
import { PlacesProvider } from './src/contexts/PlacesContext';

export default function App() {
  return (
    <NavigationContainer>
      <AutocompleteDropdownContextProvider>
        <PlacesProvider>
          <Navigation />
        </PlacesProvider>
      </AutocompleteDropdownContextProvider>
    </NavigationContainer>
  );
}