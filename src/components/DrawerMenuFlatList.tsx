import React from 'react'
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Image, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { menuItems } from '../data/MenuItems';
import { FlatLIstMenuItem } from './FlatLIstMenuItem';
import { ItemSeparator } from './ItemSeparator';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerMenu } from './DrawerMenu';
import { colors } from '../Themes/DlsTheme';
import { Contact } from './Contact';

const { height } = Dimensions.get('window');

export const MenuInterno = ({ navigation }: DrawerContentComponentProps<DrawerContentOptions>) => {


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
          <Text style={styless.textSkew}>#DLS2021SomosEnergía</Text>
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

      <DrawerMenu />
      {/*  <Contact/> */}
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
  },
  skewContainer: {
    width: '65%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
  },
  skewable: {
    backgroundColor: colors.dlsYellowSecondary,
    width: '88%',
    height: '200%',
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
  }
});