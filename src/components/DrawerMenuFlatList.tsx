import React, { useState } from 'react'
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text, Modal , Dimensions, Linking} from 'react-native';
import { menuItems } from '../data/MenuItems';
import { FlatLIstMenuItem } from './FlatLIstMenuItem';
import { ItemSeparator } from './ItemSeparator';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerMenu } from './DrawerMenu';
import { colors } from '../Themes/DlsTheme';
import { Contact } from './Contact';
import Icon from 'react-native-vector-icons/Ionicons';
import { RedesContent } from './RedesContent';
import { color } from 'react-native-reanimated';
import SendIntentAndroid from 'react-native-send-intent';

const { height } = Dimensions.get('window');



export const MenuInterno = (DrawerNavigation: DrawerContentComponentProps<DrawerContentOptions>) => {

  const { navigation } = DrawerNavigation;
  const [isVisible, setIsVisible] = useState(false);

const openExtApp = () =>{
  // Linking.openURL("market://details?id=com.urbetrack.fslite");

  SendIntentAndroid.isAppInstalled("com.urbetrack.fslite").then(isInstalled => {

    isInstalled ? 
    SendIntentAndroid.openApp("com.urbetrack.fslite",{}).then(wasOpened => {console.log("wasOpened: ",wasOpened)})
    :
    Linking.openURL("market://details?id=com.urbetrack.fslite");

  });
}

  return (


    <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

      <View style={{ ...styless.avatarContainer, marginBottom: 40 }}>

        <Image
          source={
            height >= 1000 ?
              require('../assets/BGDlsLarge.jpg')
              :
              require('../assets/BGDlsSmall.jpg')
          }
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />

        {/* <View style={styless.skewContainer3}>
          <View style={styless.skewable3} />
        </View>

        <View style={styless.skewContainer2}>
          <View style={styless.skewable2} />
        </View> */}

        <View style={styless.skewContainer3}>
          <View style={{
            backgroundColor: colors.dlsBluePrimary,
            position: 'absolute',
            left: 0,
            width: '50%',
            height: '100%',
          }} />
          <View style={styless.skewable3} />
        </View>

        <View style={styless.skewContainer2}>
          <View style={{
            backgroundColor: colors.dlsGrayPrimary,
            position: 'absolute',
            left: 0,
            width: '50%',
            height: '100%',
          }} />
          <View style={styless.skewable2} />
        </View>

        <View style={styless.skewContainer}>
          <View style={{
            backgroundColor: colors.dlsYellowSecondary,
            position: 'absolute',
            left: 0,
            width: '50%',
            height: '100%',
          }} />
          <View style={styless.skewable} />
          <Text style={styless.textSkew}>#DLS2022EnergíaQueImpulsa</Text>
        </View>



      </View>


      <View style={{ flex: 1, ...styless.globalMargin }}>

        <FlatList
          data={menuItems}
          renderItem={({ item }) => <FlatLIstMenuItem menuItem={item} navigation={navigation} />}
          keyExtractor={(item) => item.name}
          //ListHeaderComponent={ () => <HeaderTitle title="Opciones de menú"></HeaderTitle>}
          /* ListFooterComponent={() => <DrawerMenu />} */
          ItemSeparatorComponent={() => <ItemSeparator />}
        />
      </View>
      <View style={{ alignItems: 'center', paddingBottom: 30 }}>

        <TouchableOpacity
           onPress={openExtApp}
        >
          <Text style={styless.textModal}>Abrir app externa</Text>
        </TouchableOpacity>

        <TouchableOpacity
           onPress={() => (navigation.toggleDrawer(),
            setIsVisible(true))}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styless.textModal} >Visítanos</Text>
            <Icon
              name='globe-outline'
              size={20}
              color={colors.dlsBluePrimary}


            />
          </View>
          <Modal
            animationType="slide"
            visible={isVisible}
            transparent={true}
          >
            <View style={styless.modalContainer}>
              <View style={styless.modalBackground}>

                   <View style={styless.titleContainer}> 
                   </View>  
                   <TouchableOpacity
                    style={styless.closebtn}
                    onPress={() => setIsVisible(false)}
                  >
                    <Icon name="close-outline" size={30} color={colors.dlsYellowSecondary} />
                  </TouchableOpacity>
                   

                <RedesContent />

                {/* <View style={styles.footerContainer}>
                            <TouchableOpacity
                                style={styles.botonRedesClose}
                                onPress={() => setIsVisible(false)}>
                                <Text style={styles.textFooterBtn}>Cerrar Ventana</Text>
                            </TouchableOpacity>
                        </View> */}

              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        {/*  <Contact/> */}
      </View>
    </View>

  );
}
export const styless = StyleSheet.create({

  globalMargin: {
    marginHorizontal: 20
  },

  avatarContainer: {
    width: '100%',
    height: '20%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    


  }, container: {
    alignItems: 'center',
    paddingVertical: 20
  },
  botonRedes: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalBackground: {
    backgroundColor: colors.dlsGrayPrimary,
    height: '35%',
    width: '95%',
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,

  },
  textBtn: {
    fontFamily: 'Stagsans-Light',
    color: colors.dlsYellowSecondary,
    fontSize: 20
  },
  titleContainer: {
    
    backgroundColor: colors.dlsGrayPrimary,
    
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  skewContainer: {
    width: '80%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
  },
  skewable: {
    backgroundColor: colors.dlsYellowSecondary,
    width: '88%',
    /* height: '200%', */
    height: '300%',
    transform: [{ rotate: '15deg' }]
  },
  textSkew: {
    position: 'absolute',
    /* alignSelf: 'center', */
    left: 7,
    fontFamily: 'Stag-Semibold',
    color: colors.dlsGrayPrimary
  },
  skewContainer2: {
    position: 'absolute',
    width: '65%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    top: 10,
    left: -10
  },
  skewable2: {
    backgroundColor: colors.dlsGrayPrimary,
    width: '88%',
    height: '200%',
    transform: [{ rotate: '15deg' }]
  },
  skewContainer3: {
    position: 'absolute',
    width: '65%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    top: 20,
    left: -20
  },
  skewable3: {
    backgroundColor: colors.dlsBluePrimary,
    width: '88%',
    height: '200%',
    transform: [{ rotate: '15deg' }]
  },
  textModal: {
    fontFamily: 'Stag-Semibold',
    color: colors.dlsYellowSecondary,
    fontSize: 20,
    marginRight: 5
  },
  closebtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    height:'15%',
    width:50,
    zIndex:9,
    justifyContent:'center',
    alignItems:'center'
    
    
    
    
  },

});