import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { MyProfileScreen } from '../screens/MyProfileScreen';
import { MapScreen } from '../screens/MapScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { ToggleDrawerHeader } from '../components/ToggleDrawerHeader';

interface Props extends DrawerScreenProps<any, any> { };

const Tab = createMaterialTopTabNavigator();

export const TopTapNavigator = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>

      <ToggleDrawerHeader navigation={navigation} route={route} />

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