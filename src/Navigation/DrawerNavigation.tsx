import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { Pagina3Screeen } from '../screens/Pagina3screen';

const Drawer = createDrawerNavigator();

export const DrawerNavigation =()=> {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="tackNavigator" component={StackNavigator} />
      <Drawer.Screen name="Pagina3Screeen" component={Pagina3Screeen} />
    </Drawer.Navigator>
  );
}