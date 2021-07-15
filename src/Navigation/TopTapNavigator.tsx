import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet } from 'react-native';



import { MyProfileScreen } from '../screens/MyProfileScreen';
import { MapScreen } from '../screens/MapScreen';
import { NewsScreen } from '../screens/NewsScreen';


const Tab = createMaterialTopTabNavigator();

export const TopTapNavigator=()=> {
  return (
    <SafeAreaView style={styles.container}>
    <Tab.Navigator>
      <Tab.Screen name="NewScreen" component={NewsScreen} />
      <Tab.Screen name="MapScreen" component={MapScreen} /> 
      <Tab.Screen name="MyProfileScreen" component={MyProfileScreen} /> 
    </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});