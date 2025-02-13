import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Navigations/AppNavigator';
import { Provider } from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <Provider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;