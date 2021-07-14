import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { Pagina3Screeen } from '../screens/Pagina3screen';
import { TopTapNavigator } from './TopTapNavigator';
import { SafeAreaView, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

export const DrawerNavigation =()=> {
  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Navigator>
        <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} />
        <Drawer.Screen name="Pagina3Screeen" component={Pagina3Screeen} /> 
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});