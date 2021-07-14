import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigation } from './src/Navigation/DrawerNavigation';
import { TopTapNavigator } from './src/Navigation/TopTapNavigator';

 const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation/>
    </NavigationContainer>
  )
}


export default App;