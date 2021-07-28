import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { PropsRedes, PropsRedespro } from '../interfaces/PropsRedes';
import { colors } from '../Themes/DlsTheme';
import { color } from 'react-native-reanimated';

const alternativePath = require('../assets/logoArcher.png');

export const IconDescrRedes = ({ type, nameIcon, requireImage = alternativePath, color, size, descr ,index}: PropsRedespro) => {
    let margin
    if(index===4)
    {
        margin= 22}
else{
    margin=5
}


    return (
       
        <View style={{...styles.iconContainer,marginLeft:margin}}>
            {type === 'image' ?
                <View style={styles.imageContainer}>
                    <Image
                        source={requireImage}
                        resizeMethod='auto'
                        resizeMode='contain'
                        style={{

                            width: 50,
                            height: 50,

                        }}
                    />
                </View> :
                <View style={styles.imageContainer}>
                    <Icon
                        name={nameIcon}
                        size={size}
                        color={color}
                    />

                </View>
            }


        </View>
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
        color: colors.dlsYellowSecondary
    },
    imageContainer: {
        alignItems: 'center',
        height: '100%',
        width: '70%',
        //backgroundColor: 'black',
        justifyContent: 'center',
       
        
    },
    textContainer: {
        marginLeft: 5,
    },
    iconContainer: {
        // alignItems: 'flex-end',
        height: '100%',
        width: '100%',
       // marginRight:20
        // alignItems:'center',
        //backgroundColor: 'orange'
    }
})