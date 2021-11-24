import { useNavigation } from '@react-navigation/core';
import { useTheme, Theme, ParamListBase } from '@react-navigation/native';
import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../interfaces/appInterfaces';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { colors } from '../Themes/DlsTheme';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NavigationContext } from '../context/NavigateContext';
import { menuItems } from '../data/MenuItems';


interface Props {
    menuItem: MenuItem
    navigation?: DrawerNavigationHelpers
}


export const FlatLIstMenuItem = ({ menuItem, navigation }: Props) => {
    const {setstate} = useContext(NavigationContext)
    //const navigation2= useNavigation();

    //const {colors}=useTheme()
    return (
        <TouchableOpacity activeOpacity={0.5}
            onPress={() => {
                navigation!.jumpTo(menuItem.components)
                ,menuItem.components==='TopTapNavigator'&& setstate(true)
         
       }
    }
           
            
        >
            <View style={styles.container}>
                <Icon
                    name={menuItem.icon}
                    size={23}
                    color={colors.dlsYellowSecondary}

                />
                <Text style={styles.itemText}>
                    {menuItem.name}
                </Text>
                <View style={{ flex: 1 }}></View>
                <Icon
                    name="chevron-forward-outline"
                    size={30}
                    color={colors.dlsBluePrimary}
                />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'StagSans-Light',
        
        color: colors.dlsYellowSecondary,
        /* fontStyle: 'italic',*/
    },
});