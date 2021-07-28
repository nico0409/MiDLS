import React, { useState } from 'react'
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
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




export const MenuInterno = (DrawerNavigation: DrawerContentComponentProps<DrawerContentOptions>) => {

  const { navigation } = DrawerNavigation;
  const [isVisible, setIsVisible] = useState(false);

  return (


    <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

      <View style={{ ...styless.avatarContainer, marginBottom: 40 }}>
        <Image
          source={require('../assets/minidls.png')}
          style={styless.avatar}
        />
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
                   <TouchableOpacity
                    style={styless.closebtn}
                    onPress={() => setIsVisible(false)}
                  >
                    <Icon name="close-outline" size={30} color={'white'} />
                  </TouchableOpacity>
                  </View>  

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
    height: '33%',
    width: '90%',
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
    //backgroundColor: 'red',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
    top: 10
  },

});