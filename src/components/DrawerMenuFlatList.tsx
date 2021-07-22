import React from 'react'
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { menuItems } from '../data/MenuItems';
import { FlatLIstMenuItem } from './FlatLIstMenuItem';
import { ItemSeparator } from './ItemSeparator';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerMenu } from './DrawerMenu';
import { colors } from '../Themes/DlsTheme';
import { Contact } from './Contact';

export const MenuInterno = ({ navigation }: DrawerContentComponentProps<DrawerContentOptions>) => {

  return (


    <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

      <View style={{ ...styless.avatarContainer, marginBottom: 40 }}>
        <Image
          source={require('../assets/minidls.png')}
          style={styless.avatar}
        />
      </View>


      <View style={{ flex: 1, ...styless.globalMargin}}>

        <FlatList
          data={menuItems}
          renderItem={({ item }) => <FlatLIstMenuItem menuItem={item} navigation={navigation} />}
          keyExtractor={(item) => item.name}
          //ListHeaderComponent={ () => <HeaderTitle title="Opciones de menú"></HeaderTitle>}
          /* ListFooterComponent={() => <DrawerMenu />} */
          ItemSeparatorComponent={() => <ItemSeparator />}
        />
      </View>

       <DrawerMenu/> 
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
    resizeMode:'stretch',
    
    
  },

});