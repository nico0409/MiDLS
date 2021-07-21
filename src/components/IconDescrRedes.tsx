import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { PropsRedes } from '../interfaces/PropsRedes';

export const IconDescrRedes = ({ type, nameOrUrl, color, size, descr }: PropsRedes) => {
    return (
            <View style={styles.button}>
                <Icon name={nameOrUrl} color={color} size={size} />
                <Text>{descr}</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    button:{
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    }
})