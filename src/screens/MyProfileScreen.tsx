
import React,{useState,useRef, useEffect, useContext  } from 'react';
import { View, Text, Button } from 'react-native';
import { styless } from '../Themes/DlsTheme';
import { WebView } from 'react-native-webview';
import { useNetInfo } from '@react-native-community/netinfo';
import { LoadingScreen } from './LoadingScreen';

import { WhitOutConection } from './WhitOutConection';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';





interface Props extends MaterialTopTabScreenProps <ParamListBase,'PersonaScreen'>{

}


 export const MyProfileScreen = ( {navigation}:Props ) => {


  const {signIn,logOut,status} = useContext(AuthContext)
 
 

 console.log('estado afuera:'+status)

  
/* useEffect(() => {
  navigation.addListener('tabPress',()=>console.log('entre a miprofile'))
   
 }, []) */

/*   if (webviewRef.current != null)
  {
   //  console.log(webviewRef.current!.props.source.uri);
   // console.log(webviewRef.current!.startUrl); 
  }  */
  
 // console.log(status);

  return (
    <View style={styless.containerWebView}>
         <WebView
            onNavigationStateChange={navstate=>signIn(navstate.url)} 
            style={styless.webview}
            key={status}
            source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=48' }} 
            /> 
    </View>    
         )
}

