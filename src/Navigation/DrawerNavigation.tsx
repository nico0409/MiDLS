import React, { useEffect, useState } from 'react'
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
import { Asingstorage } from '../components/Storage';
import { StackNavigatorObserve } from './StackNavigatorObserve';
import { CheckUpdateAndroid } from '../components/CheckUpdateAndroid';
/* import checkVersion from 'react-native-store-version'; */
import { CheckUpdateIos } from '../components/CheckUpdateIos';

export type DrawerRoutParams = {

  TopTapNavigator: {
    needsUpdate: boolean,
    lockScreen: boolean,
    link:string
  }
}



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
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [lockScreen, setLockScreen] = useState(false);
  const [endGetPrompt, setendGetPrompt] = useState(false);
  const [link, setLink] = useState("");
  const [isErrorResponse,setIsErrorResponse] = useState(false); 
 
  useEffect(() => {

    if (isConnected !== null) {
      if (isConnected === true) {
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

    await CheckUpdateAndroid({ setNeedsUpdate, setLockScreen });
    await CheckUpdateIos({ setNeedsUpdate, setLockScreen ,setLink});


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
          <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} initialParams={{ needsUpdate, lockScreen ,link}} />
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