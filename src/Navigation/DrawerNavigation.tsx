import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';

import { TopTapNavigator } from './TopTapNavigator';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ContactScreen } from '../screens/ContactScreen';
import { DrawerMenu } from '../components/DrawerMenu';
import { useNetInfo } from '@react-native-community/netinfo';
import { WhitOutConection } from '../screens/WhitOutConection';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const {isConnected}=useNetInfo();



  return (
    <SafeAreaView style={styles.container}>
     {!isConnected && isConnected!==null?
    
     
      <WhitOutConection/>

     
     
     :
      <Drawer.Navigator
        drawerContent={(props: any) => <DrawerMenu {...props} />}
      >
      
        <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} />
        <Drawer.Screen name="ContactScreen" component={ContactScreen} />
      </Drawer.Navigator>
      }
     
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});