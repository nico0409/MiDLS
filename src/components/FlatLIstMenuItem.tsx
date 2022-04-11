import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../interfaces/appInterfaces';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { colors } from '../Themes/DlsTheme';
import { NavigationContext } from '../context/NavigateContext';
import SendIntentAndroid from 'react-native-send-intent';

interface Props {
    menuItem: MenuItem
    navigation?: DrawerNavigationHelpers
}

export const FlatLIstMenuItem = ({ menuItem, navigation }: Props) => {
    const { setstate } = useContext(NavigationContext)

    const openExtApp = () => {

        SendIntentAndroid.isAppInstalled("com.urbetrack.fslite").then(isInstalled => {

            isInstalled ?
                SendIntentAndroid.openApp("com.urbetrack.fslite", {}).then(wasOpened => { })
                :
                Linking.openURL("market://details?id=com.urbetrack.fslite");

        });
    }

    //const {colors}=useTheme()
    return (
        <TouchableOpacity activeOpacity={0.5}
            onPress={() => {

                if (menuItem.components === 'linkExternalApp') {
                    openExtApp();
                } else {
                    navigation!.jumpTo(menuItem.components)
                        , menuItem.components === 'TopTapNavigator' && setstate(true)
                }
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