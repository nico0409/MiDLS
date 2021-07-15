import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigation } from './src/Navigation/DrawerNavigation';
import { TopTapNavigator } from './src/Navigation/TopTapNavigator';
import { Backgrond } from './src/components/Backgrond';
import { WhitOutConection } from './src/screens/WhitOutConection';

 const App = () => {
  return (
    <NavigationContainer>
     {/*  <DrawerNavigation/> */}
     <WhitOutConection/>
    </NavigationContainer>
  )
}


export default App;