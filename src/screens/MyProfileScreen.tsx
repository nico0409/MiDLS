
import React,{useState,useRef, useEffect, useContext  } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { styless } from '../Themes/DlsTheme';
import { WebView } from 'react-native-webview';
import { useNetInfo } from '@react-native-community/netinfo';
import { LoadingScreen } from './LoadingScreen';

import { WhitOutConection } from './WhitOutConection';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { NavigationContext } from '../context/NavigateContext';





interface Props extends MaterialTopTabScreenProps <ParamListBase,'PersonaScreen'>{

}


 export const MyProfileScreen = ( {navigation}:Props ) => {


  const {signIn,changeURLProfile,status} = useContext(AuthContext)
  const [load, setLoad] = useState(true)
  const {state,setNavigator} = useContext(NavigationContext)
  const { isConnected } = useNetInfo();
  useEffect(() => {
    if (status==='not-authenticated') setLoad(true)
   }, [status])
   
  

 
 useEffect(() => {
  if (state===true){
    setNavigator(navigation)
  }
 }, [state])
 
  

  return (
    <View style={styless.containerWebView}>
        {isConnected &&
         <WebView
           onLoadEnd={()=>{signIn(), setLoad(false)}}
          onNavigationStateChange={navstate=>changeURLProfile(navstate.url)} 
            style={styless.webview}
            key={status}
            source={{ uri: 'https://midls.dls-archer.com/midls/user/' }} 
            /> 
        }
            {load &&
        <View style={{flex:1, position:'absolute',top:'50%',right:'50%'}}>
        <ActivityIndicator size={35} color="rgba(245,217,47,1)" style={{marginTop:'60%'}}></ActivityIndicator>
        </View>      
        }
    </View>    
         )
}

