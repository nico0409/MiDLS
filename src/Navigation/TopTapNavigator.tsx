import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Pagina1Screeen } from '../screens/Pagina1screen';
import { Pagina2Screeen } from '../screens/Pagina2screen';
import { SafeAreaView, StyleSheet } from 'react-native';


const Tab = createMaterialTopTabNavigator();

export const TopTapNavigator=()=> {
  return (
    <SafeAreaView style={styles.container}>
    <Tab.Navigator>
      <Tab.Screen name="Pagina1Screeen" component={Pagina1Screeen} />
      <Tab.Screen name="Pagina2Screeen" component={Pagina2Screeen} /> 
    </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});