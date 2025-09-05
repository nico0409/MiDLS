import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';



import { AuthProvider } from './src/context/AuthContext';
import { DrawerNavigation } from './src/Navigation/DrawerNavigation';



const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <AppState>
          <DrawerNavigation />
        </AppState>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}


export default App;