
import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { NavigationContext } from '../context/NavigateContext';

interface Props extends MaterialTopTabScreenProps<ParamListBase, string> {

}

export const NewsScreen = ({ navigation, route }: Props) => {
  const { signIn, status, changeURLNews } = useContext(AuthContext)
  const [load, setLoad] = useState(true)
  const { state, setNavigator, setstate } = useContext(NavigationContext)


  useEffect(() => {
    setstate(false)
  }, [state])

  useEffect(() => {
    if (status === 'not-authenticated') setLoad(true)
  }, [status])

  return (

    <View style={styless.containerWebView}>

      <WebView
        key={status}
        onLoadEnd={() => { signIn(), setLoad(false) }}
        onNavigationStateChange={navstate => changeURLNews(navstate.url)}
        style={styless.webview}
        source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=419' }} />
      {load &&
        <View style={{ position: 'absolute', alignSelf: 'center' }}>
          <ActivityIndicator size={35} color="rgba(245,217,47,1)" ></ActivityIndicator>
        </View>
      }

    </View>

  )
}


