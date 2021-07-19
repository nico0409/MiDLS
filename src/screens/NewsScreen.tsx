
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import React,{useEffect,useContext} from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';
import { AuthContext } from '../context/AuthContext';




interface Props extends MaterialTopTabScreenProps <ParamListBase,'PersonaScreen'>{

}

 export const NewsScreen= ({navigation}:Props) => {
  const {signIn,status,changeURLNews} = useContext(AuthContext)
 
  
  console.log('estado afuera:'+status)
  /* useEffect(() => {
    navigation.addListener('tabPress',()=>console.log('entre a notcias'))
     
   }, []) */

  return (
   
      <View style={styless.containerWebView}>
          <WebView 
          key={status}
          onLoadEnd={()=>signIn()}
          onNavigationStateChange={navstate=>changeURLNews(navstate.url)} 
          style={styless.webview}
          source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=419' }} />
      </View>
   
  )
}


