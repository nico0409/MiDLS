
import React from 'react';
import { View, Text } from 'react-native';
import WebView from 'react-native-webview';

import { useNetInfo } from '@react-native-community/netinfo';

import { styless } from '../Themes/DlsTheme';
import { WhitOutConection } from './WhitOutConection';

export const MapScreen = () => {
  const { isConnected } = useNetInfo();
  return (

    <View style={styless.containerWebView}>
      {isConnected ? <WebView
        style={styless.webview}
        source={{ uri: 'https://www.google.com/maps/d/u/0/embed?mid=1RstH1PUHyNfyMUr0KSTgThfmuDLvGwIs' }}
      /> :
        <WhitOutConection />
      }
    </View>

  )
}


