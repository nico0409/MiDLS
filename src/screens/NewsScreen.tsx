
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';




 export const NewsScreen= () => {
  return (
   
      <View style={styless.containerWebView}>
          <WebView 
          style={styless.webview}
          source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=419' }} />
      </View>
   
  )
}


