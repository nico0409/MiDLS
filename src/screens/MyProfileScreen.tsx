
import React from 'react';
import {View, Text} from 'react-native';
import { styless } from '../Themes/DlsTheme';
import { WebView } from 'react-native-webview';
import { useNetInfo } from '@react-native-community/netinfo';
import { LoadingScreen } from './LoadingScreen';
import { ModalScreen } from './ModalScreen';
import { WhitOutConection } from './WhitOutConection';


 export const MyProfileScreen = () => {
  const {isConnected}=useNetInfo();
  /* setTimeout(() => {
        
  }, 80000); */

  

 
  
  return (
   
    
   
      <View style={styless.containerWebView}>
          {isConnected? <WebView  
          style={styless.webview}
          source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=48' }} 
          />:/* <ModalScreen/>  */
          /* <LoadingScreen/> */
          <WhitOutConection/>
          }
      </View>
   
 
   
  )
}

