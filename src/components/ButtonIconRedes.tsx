import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { PropsRedes } from '../interface/PropsRedes';

export const ButtonIconRedes = ({ type, nameOrUrl, color, size, descr }: PropsRedes) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Icon name={nameOrUrl} color={color} size={size} />
                <Text>{descr}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        width: '80%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }
})