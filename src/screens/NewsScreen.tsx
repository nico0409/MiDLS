
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import React,{useEffect,useContext} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../../../pruductosApp/src/Navigation/Tabs';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';





interface Props extends MaterialTopTabScreenProps <ParamListBase,'PersonaScreen'>{

}

 export const NewsScreen= ({navigation}:Props) => {
  const {signIn,status,currentUrl} = useContext(AuthContext)
 
  
 
 
 return (
   
      <View style={styless.containerWebView}>
        {
          (false)?
            <ActivityIndicator size={35} color="rgba(245,217,47,1)" style={{marginTop:20}}></ActivityIndicator>
            :
            <WebView 
              key={status}
              onNavigationStateChange={navstate=>signIn(navstate.url)}
              style={styless.webview}
              source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=419' }} />
        }
        
        </View>
        
  )
}


