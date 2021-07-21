import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';

import { TopTapNavigator } from './TopTapNavigator';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { ContactScreen } from '../screens/ContactScreen';
import { DrawerMenu } from '../components/DrawerMenu';
import { useNetInfo } from '@react-native-community/netinfo';
import { WhitOutConection } from '../screens/WhitOutConection';
import { MenuInterno } from '../components/DrawerMenuFlatList';
import { RrhhScreen } from '../screens/RrhhScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';
import { PaycheckScreen } from '../screens/PaycheckScreen';
import { MyProfileScreenDrawer } from '../screens/MyProfileScreenDrawer';
import { colors } from '../Themes/DlsTheme';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const { isConnected } = useNetInfo();



  return (
    <SafeAreaView style={styles.container}>
      {!isConnected && isConnected !== null ?
        <WhitOutConection />
        :
        <Drawer.Navigator

          // drawerContent={(props: any) => <DrawerMenu {...props} />}
          drawerContent={(props: any) => <MenuInterno {...props} />}
        >

          <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} />
          <Drawer.Screen name="ContactScreen" component={ContactScreen} />
          <Drawer.Screen name="RrhhScreen" component={RrhhScreen} />
          <Drawer.Screen name="NewsScreen" component={NewsScreen} />
          <Drawer.Screen name="MyProfileScreenDrawer" component={MyProfileScreenDrawer} />
          <Drawer.Screen name="PaycheckScreen" component={PaycheckScreen} />
        </Drawer.Navigator>
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.dlsGrayPrimary,
    flex: 1,
  },
});