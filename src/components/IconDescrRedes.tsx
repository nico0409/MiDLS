import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { PropsRedes } from '../interfaces/PropsRedes';
import { colors } from '../Themes/DlsTheme';

const alternativePath = require('../assets/logoArcher.png');

export const IconDescrRedes = ({ type, nameIcon, requireImage = alternativePath, color, size, descr }: PropsRedes) => {

    return (
        <>
            {/* <View style={styles.button}> */}

            {type === "image"
                ?
                <>
                    <View style={styles.imageContainer}>
                        <Image
                            source={requireImage}
                            style={{
                                flex: 1,
                                width: '70%',
                                height: '100%',
                                resizeMode: 'center',
                            }}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textDescr}>{descr}</Text>
                    </View>
                </>
                :
                <>
                    <View style={styles.imageContainer}>
                        <Icon name={nameIcon} color={color} size={size} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textDescr}>{descr}</Text>
                    </View>
                </>
            }

            {/* </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    /* button: {
        backgroundColor: 'orange',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, */
    textDescr: {
        fontFamily: 'StagSans-Light',
        fontSize: 14,
        //color: '#37424a'
        color:colors.dlsYellowSecondary
    },
    imageContainer: {
        alignItems: 'center',
        height: '100%',
        width: '40%',
        justifyContent: 'center'
    },
    textContainer: {
        marginLeft: 5,
    }
    /* iconContainer: {
        alignItems: 'flex-end',
        height: '100%',
        width: '40%',
    } */
})