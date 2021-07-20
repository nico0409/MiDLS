import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends DrawerScreenProps<any, any> { };

export const ToggleDrawerHeader = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    marginLeft: 10
                }}
                onPress={() => navigation.toggleDrawer()}
            >
                <Icon
                    name="menu-outline"
                    color="black"
                    size={35}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        justifyContent: 'center'
    }
})