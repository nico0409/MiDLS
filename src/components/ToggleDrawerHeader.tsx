import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome'
import { colors } from '../Themes/DlsTheme';

interface Props extends DrawerScreenProps<any, any> { };

export const ToggleDrawerHeader = ({ navigation, route }: Props) => {
    console.log(route.name);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    marginLeft: 10
                }}
                onPress={() => route.name === 'TopTapNavigator' ?
                    navigation.toggleDrawer() :
                    navigation.goBack()}
            >
                {route.name === 'TopTapNavigator' ?
                    <Icon
                        name="menu-outline"
                        color={colors.dlsYellowSecondary}
                        size={35}
                    />
                    :
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginEnd:10}}>
                        <Icon
                            name="caret-back-outline"
                            color={colors.dlsYellowSecondary}
                            size={35}
                        />
                        <IconFont
                            name="home"
                            color={colors.dlsBluePrimary}
                            size={35}
                        />
                    </View>
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dlsGrayPrimary,
        width: '100%',
        height: 50,
        justifyContent: 'center'
    }
})