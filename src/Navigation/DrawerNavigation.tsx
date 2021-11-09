import React, { useEffect,useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from 'react-native-splash-screen'

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
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import { NavigateProvider } from '../context/NavigateContext';
import { PromptObserve, StorageTypes, TarjetaObserve } from '../interfaces/prompInterfaces';
import { GetPrompt } from '../components/GetPrompt';
import { Asingstorage, GetStorage } from '../components/Storage';
import { TarjetaObserveScreen } from '../screens/TarjetaObserveScreen';
import { StackNavigatorObserve } from './StackNavigatorObserve';
import { types } from '@babel/core';
import { CheckUpdateAndroid } from '../components/CheckUpdateAndroid';
/* import checkVersion from 'react-native-store-version'; */
import { getVersion } from 'react-native-device-info';
import { SendObserveStorage } from '../components/SendObserveStorage';

export type DrawerRoutParams = {

  TopTapNavigator: {needsUpdate:boolean }
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
 const [needsUpdate, setNeedsUpdate] = useState(false)
  const [endGetPrompt, setendGetPrompt] = useState(false)

  useEffect(() => {
    
    if(isConnected!==null){
      if (isConnected===true)
      {GetPrompts();
      
      }
      else{
        setendGetPrompt(true);
        SplashScreen.hide();
      }
      
    }
   

  }, [isConnected])

  const GetPrompts = async () => {
  

    const prompts: StorageTypes = { StorageType: 'prompt' };
   /*  GetStorage({StorageType:'prompt'})===undefined && */
  
     await SendObserveStorage();
    Asingstorage(prompts, await GetPrompt());
    setNeedsUpdate( await CheckUpdateAndroid());
   SplashScreen.hide();
    setendGetPrompt(true);
  }



 
  return (
    <NavigateState>
      <SafeAreaView style={styles.container}>
        {/* {!isConnected && isConnected !== null ? 
        <WhitOutConection />
        :*/}
      {endGetPrompt &&  <Drawer.Navigator

// drawerContent={(props: any) => <DrawerMenu {...props} />}
drawerContent={(props: any) => <MenuInterno {...props} />}
>
<Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} initialParams={{needsUpdate}} />
{/*   <Drawer.Screen name="TopTapNavigator" component={TopTapNavigator} /> */}
<Drawer.Screen name="ContactScreen" component={ContactScreen} />
<Drawer.Screen name="RrhhScreen" component={RrhhScreen} />
{/*  <Drawer.Screen name="NewsScreen" component={NewsScreen} /> */}
<Drawer.Screen name="MyProfileScreenDrawer" component={MyProfileScreenDrawer} />
<Drawer.Screen name="PaycheckScreen" component={PaycheckScreen} />
<Drawer.Screen name="StackNavigatorObserve" component={StackNavigatorObserve} />
</Drawer.Navigator> }
         
      
        
        {/*  } */}


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