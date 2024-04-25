
import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, Linking, Platform } from 'react-native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { NavigationContext } from '../context/NavigateContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNetInfo } from '@react-native-community/netinfo';


export const NewsScreen = () => {
  const { signIn, status, changeURLNews, appNeedsUpdate, appLockScreen, appLinkUpdateIos } = useContext(AuthContext)
  const [load, setLoad] = useState(true)
  const { state, setNavigator, setstate } = useContext(NavigationContext)
  const [showAlert, setShowAlert] = useState(true)

  const { isConnected } = useNetInfo();


  useEffect(() => {
    setstate(false)
  }, [state])

  useEffect(() => {
    if (status === 'not-authenticated') setLoad(true)
  }, [status])


  return (
    <View style={styless.containerWebView}>
      {isConnected &&
        <WebView
          key={status}
          onLoadEnd={() => { signIn(), setLoad(false) }}
          onNavigationStateChange={navstate => changeURLNews(navstate.url)}
          style={styless.webview}
          source={{ uri: 'https://midls-dev.dls-archer.com/midls/noticias/' }}
        />
      }
      {load &&
        <View style={{ position: 'absolute', alignSelf: 'center' }}>
          <ActivityIndicator size={35} color="rgba(245,217,47,1)" ></ActivityIndicator>
        </View>
      }
      {appNeedsUpdate &&
        < AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Aviso"
          message={appLockScreen ?
            "MiDLS necesita actualizarse a una nueva versión. Por favor, presione el botón para poder continuar."
            :
            "MiDLS necesita actualizarse a una nueva versión, ¿desea hacerlo ahora?"}
          closeOnTouchOutside={!appLockScreen}
          closeOnHardwareBackPress={!appLockScreen}
          showCancelButton={!appLockScreen}
          showConfirmButton={true}
          cancelText="No"
          confirmText={appLockScreen ? "Actualizar" : "Si"}
          confirmButtonColor='#00875F'
          cancelButtonStyle={{ paddingHorizontal: 30 }}
          confirmButtonStyle={{ paddingHorizontal: 30 }}
          onCancelPressed={() => {

            setShowAlert(false)

          }}
          onConfirmPressed={() => {
            {

              const linkApple = 'Apps.apple.com';
              Platform.OS === 'android' ?
                Linking.openURL("market://details?id=com.midls")
                :

                Linking.canOpenURL(appLinkUpdateIos).then(supported => {


                  Linking.openURL(appLinkUpdateIos).catch(err => {
                    console.log(err);

                  })
                    ;
                }, (err) => console.log(err));
            }
          }}
        />
      }
    </View>
  )
}