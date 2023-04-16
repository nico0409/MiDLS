import React, { useContext, useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from 'react-native-splash-screen'

import { TopTapNavigator } from './TopTapNavigator';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ContactScreen } from '../screens/ContactScreen';
import { useNetInfo } from '@react-native-community/netinfo';
import { MenuInterno } from '../components/DrawerMenuFlatList';
import { RrhhScreen } from '../screens/RrhhScreen';
import { PaycheckScreen } from '../screens/PaycheckScreen';
import { MyProfileScreenDrawer } from '../screens/MyProfileScreenDrawer';
import { colors } from '../Themes/DlsTheme';
import { NavigateProvider } from '../context/NavigateContext';
import { StorageTypes } from '../interfaces/prompInterfaces';
import { GetPrompt } from '../components/GetPrompt';
import { Asingstorage, GetStorage } from '../components/Storage';
import { StackNavigatorObserve } from './StackNavigatorObserve';
import { CheckUpdateAndroid } from '../components/CheckUpdateAndroid';
import { CheckUpdateIos } from '../components/CheckUpdateIos';
import { GetDeviceId } from '../components/GetDeviceId';
import { getDeviceInfo } from '../components/getDeviceInfo';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const NavigateState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <NavigateProvider>
      {children}
    </NavigateProvider>
  )
}

export const DrawerNavigation = () => {
  const { isConnected } = useNetInfo();
  /* const [needsUpdate, setNeedsUpdate] = useState(false);
  const [lockScreen, setLockScreen] = useState(false); */
  const [endGetPrompt, setendGetPrompt] = useState(false);
  /* const [link, setLink] = useState(""); */
  const [isErrorResponse, setIsErrorResponse] = useState(false);

  const {setAppNeedsUpdate, setAppLockScreen, setAppLinkUpdateIos} = useContext(AuthContext)

  useEffect(() => {

    if (isConnected !== null) {
      if (isConnected === true) {
        console.log("SE EJECUTO GET PROMPTS");

        GetPrompts();

      }
      else {

        setendGetPrompt(true);
        SplashScreen.hide();
      }

    }

  }, [isConnected])

  const GetPrompts = async () => {

    const prompts: StorageTypes = { StorageType: 'prompt' };

    Asingstorage(prompts, await GetPrompt(setIsErrorResponse));

    const { deviceId, deviceName, brand, model, externalIp } = await getDeviceInfo();

    if (!deviceId) {

      const deviceId: StorageTypes = { StorageType: 'deviceId' };

      Asingstorage(deviceId, await GetDeviceId(deviceName, brand, model, externalIp));

    }

    await CheckUpdateAndroid({ setAppNeedsUpdate, setAppLockScreen });
    await CheckUpdateIos({ setAppNeedsUpdate, setAppLockScreen, setAppLinkUpdateIos });

    SplashScreen.hide();
    setendGetPrompt(true);
  }




  return (
    <NavigateState>
      <SafeAreaView style={styles.container}>
        {/* {!isConnected && isConnected !== null ? 
        <WhitOutConection />
        :*/}
        {endGetPrompt && <Drawer.Navigator

          // drawerContent={(props: any) => <DrawerMenu {...props} />}
          drawerContent={(props: any) => <MenuInterno {...props} />}
        >
          <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} />
          {/*   <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} /> */}
          <Drawer.Screen name="ContactScreen" component={ContactScreen} />
          <Drawer.Screen name="RrhhScreen" component={RrhhScreen} />
          {/*  <Drawer.Screen name="NewsScreen" component={NewsScreen} /> */}
          <Drawer.Screen name="MyProfileScreenDrawer" component={MyProfileScreenDrawer} />
          <Drawer.Screen name="PaycheckScreen" component={PaycheckScreen} />
          <Drawer.Screen name="StackNavigatorObserve" component={StackNavigatorObserve} />
        </Drawer.Navigator>}

      </SafeAreaView>
    </NavigateState>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dlsGrayPrimary,
    flex: 1,
  },
});