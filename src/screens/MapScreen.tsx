
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';

import { useNetInfo } from '@react-native-community/netinfo';

import { styless } from '../Themes/DlsTheme';
import { WhitOutConection } from './WhitOutConection';

export const MapScreen = () => {
  const { isConnected } = useNetInfo();

  
  
  return (

    <View style={[styless.containerWebView, { paddingTop: 0 }]}>

      {isConnected ?
        <WebView
          style={styless.webview}
          source={{ uri: 'https://www.google.com/maps/d/u/0/embed?mid=1RstH1PUHyNfyMUr0KSTgThfmuDLvGwIs' }}
        />
        :
        <View style={{ position: 'absolute', alignSelf: 'center' }}>
          <ActivityIndicator size={35} color="rgba(245,217,47,1)" ></ActivityIndicator>
        </View>

      }

    </View>

  )
}


