import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { NewsScreen } from '../screens/NewsScreen';

const Stack = createStackNavigator();

export const StackNavigator=()=> {
  return (
    <Stack.Navigator>
     {/*  <Stack.Screen name="NewsScreen" component={NewsScreen} /> */}
     {/*  <Stack.Screen name="Pagina2Screeen" component={Pagina2Screeen} />
      <Stack.Screen name="Pagina3Screeen" component={Pagina3Screeen} /> */}
      
    </Stack.Navigator>
  );
}