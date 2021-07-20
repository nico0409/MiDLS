
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import React,{useEffect,useContext} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';





interface Props extends MaterialTopTabScreenProps <ParamListBase,'PersonaScreen'>{

}

 export const NewsScreen= ({navigation}:Props) => {
  const {signIn,status,changeURLNews} = useContext(AuthContext)
  const [load, setLoad] = useState(true)
  
 useEffect(() => {
  if (status==='not-authenticated') setLoad(true)
 }, [status])

  /* useEffect(() => {
    navigation.addListener('tabPress',()=>console.log('entre a notcias'))
     
   }, []) */

   console.log('estado afuera:'+status) 
  return (
   
      <View style={styless.containerWebView}>
          <WebView 
          key={status}
          onLoadEnd={()=>{signIn(), setLoad(false)}}
          onNavigationStateChange={navstate=>changeURLNews(navstate.url)} 
          style={styless.webview}
          source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=419' }} />
           {load &&
        <View style={{flex:1, position:'absolute',top:'50%',right:'50%'}}>
        <ActivityIndicator size={35} color="rgba(245,217,47,1)" style={{marginTop:'60%'}}></ActivityIndicator>
        </View>      
        }
      </View>
   
  )
}


