import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';

import { TopTapNavigator } from './TopTapNavigator';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ContactScreen } from '../screens/ContactScreen';
import { DrawerMenu } from '../components/DrawerMenu';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Navigator
        drawerContent={(props: any) => <DrawerMenu {...props} />}
      >
        <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} />
        <Drawer.Screen name="ContactScreen" component={ContactScreen} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});