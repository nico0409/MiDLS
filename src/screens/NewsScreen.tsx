
import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, Linking, Platform } from 'react-native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { NavigationContext } from '../context/NavigateContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import { DrawerRoutParams } from '../Navigation/DrawerNavigation';
import { useNetInfo } from '@react-native-community/netinfo';


interface Props extends MaterialTopTabScreenProps<DrawerRoutParams, "TopTapNavigator"> { }

export const NewsScreen = ({ navigation, route }: Props) => {
  const { signIn, status, changeURLNews } = useContext(AuthContext)
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
          source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=419' }}
        />
      }
      {load &&
        <View style={{ position: 'absolute', alignSelf: 'center' }}>
          <ActivityIndicator size={35} color="rgba(245,217,47,1)" ></ActivityIndicator>
        </View>
      }
      {route.params.needsUpdate && !load &&
        < AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Aviso"
          message={route.params.lockScreen ?
            "MiDLS necesita actualizarse a una nueva versión. Por favor, presione el botón para poder continuar."
            :
            "MiDLS necesita actualizarse a una nueva versión, ¿desea hacerlo ahora?"}
          closeOnTouchOutside={!route.params.lockScreen}
          closeOnHardwareBackPress={!route.params.lockScreen}
          showCancelButton={!route.params.lockScreen}
          showConfirmButton={true}
          cancelText="No"
          confirmText={route.params.lockScreen ? "Actualizar" : "Si"}
          confirmButtonColor='#00875F'
          cancelButtonStyle={{ paddingHorizontal: 30 }}
          confirmButtonStyle={{ paddingHorizontal: 30 }}
          onCancelPressed={() => {

            setShowAlert(false)

          }}
          onConfirmPressed={() => {
            {
              const GOOGLE_PACKAGE_NAME = 'com.midls';
             
              const link = 'Apps.apple.com';
              Platform.OS === 'android' ?
                Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`)
                :

                console.log(route.params.link);
                Linking.canOpenURL(route.params.link).then(supported => {
                
                  
                   Linking.openURL(route.params.link).catch(err=>{
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


