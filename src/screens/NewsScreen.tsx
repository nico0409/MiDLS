
import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, Button, Modal, Text, FlatList } from 'react-native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { styless } from '../Themes/DlsTheme';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContext } from '../context/NavigateContext';
import { dataTest } from '../data/testData';
import { GetPrompt } from '../components/GetPrompt';
import { GetAllObserve } from '../components/GetAllObserve';
import { NewObservCard } from '../components/NewObservCard';
import { EditObservCard } from '../components/EditObserveCard';





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

  const [isVisible, setisVisible] = useState(false);

  const [dataTemp, setDataTemp] = useState<any[]>([]);

  const cargarAsyncDatos = () => {
    
    //GetPrompt();
    
   // GetAllObserve('2020-01-01','B019445');
  // NewObservCard();
  EditObservCard();
    /* await AsyncStorage.setItem('datatest', JSON.stringify(dataTest));
    console.log('datos cargados') */
  }

  const mostrarAsyncDatos = async() => {
    const mostrarDatos = await AsyncStorage.getItem('datatest');
    
    
    setisVisible(true);
    setDataTemp(JSON.parse(mostrarDatos!));

  }

  const renderItem = (item:any) => {
    return(
      <View>
        <Text style={{fontSize:20}}>legajo: {item.item.legajo} nombre: {item.item.nombre}</Text>
      </View>
    )
  }

  return (

    <View style={styless.containerWebView}>
      <Button onPress={cargarAsyncDatos} title="cargar" />
      <Button onPress={mostrarAsyncDatos} title="mostrar" />
      <WebView
        key={status}
        onLoadEnd={() => { signIn(), setLoad(false) }}
        onNavigationStateChange={navstate => changeURLNews(navstate.url)}
        style={styless.webview}
        source={{ uri: 'https://midls.dls-archer.com/midls/?page_id=419' }} />
      {load &&
        <View style={{ flex: 1, position: 'absolute', top: '50%', right: '50%' }}>
          <ActivityIndicator size={35} color="rgba(245,217,47,1)" style={{ marginTop: '60%' }}></ActivityIndicator>
        </View>
      }

      <View>
        <Modal animationType='fade'
          visible={isVisible}
          transparent
        >
          <View style={{
            flex: 1,
            //       height:100,
            //     width:100,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center'


          }}>
            {/* contenido del modal */}
            <View style={{
              backgroundColor: 'white',
              width: '80%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              shadowOffset: {
                width: 0,
                height: 10
              },
              elevation: 10,
              borderRadius: 15,
              shadowOpacity: 0.25



            }}>
              <Text style={{ fontSize: 16, fontWeight: '300', marginBottom: 20 }}>Cuerpo del modal</Text>

              <FlatList
              data={dataTemp}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              >

              </FlatList>

              <Button
                title='Cerrar'
                onPress={() => setisVisible(false)}
              ></Button>
            </View>

          </View>

        </Modal>
      </View>
    </View>

  )
}


