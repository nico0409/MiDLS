import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Pagina1Screeen } from '../screens/Pagina1screen';
import { Pagina2Screeen } from '../screens/Pagina2screen';
import { Pagina3Screeen } from '../screens/Pagina3screen';

const Stack = createStackNavigator();

export const StackNavigator=()=> {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pagina1Screeen" component={Pagina1Screeen} />
      <Stack.Screen name="Pagina2Screeen" component={Pagina2Screeen} />
      <Stack.Screen name="Pagina3Screeen" component={Pagina3Screeen} />
      
    </Stack.Navigator>
  );
}