import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { PropsRedes, PropsRedespro } from '../interfaces/PropsRedes';
import { colors } from '../Themes/DlsTheme';
import { color } from 'react-native-reanimated';

const alternativePath = require('../assets/logoArcher.png');

export const IconDescrRedes = ({ type, nameIcon, requireImage = alternativePath, color, size, descr ,index}: PropsRedespro) => {
  
 



    return (
       
        <View style={styles.iconContainer}>
            {type === 'image' ?
                <View style={styles.imageContainer}>
                    <Image
                        source={requireImage}
                        resizeMethod='auto'
                        resizeMode='contain'
                        
                        style={{
                            
                            width: 60,
                            height:  60,

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
            
         {   (index==3|| index==4)&& 
           <View style={styles.textContainer}><Text style={styles.textDescr}>{descr}</Text></View>
         }
          
            

        </View>
    )
}

const styles = StyleSheet.create({

    /* button: {
       
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, */
    textDescr: {
        fontFamily: 'StagSans-Light',
        fontWeight:'bold',
        fontSize: 12,
        color: colors.dlsWhiteBackGround
    },
    imageContainer: {
        alignItems: 'center',
       // width: '100%', 
       backgroundColor:colors.dlsGrayPrimary 
    },
    textContainer: {
    
    },
    iconContainer: {
        height: '100%',
        width: '100%',
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:colors.dlsGrayPrimary 
    }
})