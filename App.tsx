import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { AuthContext } from './src/Context/AuthContext';
import LoginScreen from './src/Screen/Login';
import TabNavigator from './src/Navigations/AppNavigator';
import HospitalTabNavigator from './src/Navigations/HospitalTabNavigator';

interface User {
  role: 'admin' | 'hospital';
}

interface AuthContextType {
  login: (userData: User) => void;
  logout: () => void;
  user: User | null;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const authContext: AuthContextType = {
    login: (userData: User) => setUser(userData),
    logout: () => setUser(null),
    user
  };

  return (
    <Provider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {!user ? (
            <LoginScreen />
          ) : user.role === 'admin' ? (
            <TabNavigator />
          ) : (
            <HospitalTabNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;