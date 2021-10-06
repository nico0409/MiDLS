import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image, Button ,Animated} from 'react-native';




import { useNavigation } from '@react-navigation/native';
import { DlhrAllObserve } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';
import { transform } from '@babel/core';
import { Extrapolate } from 'react-native-reanimated';





const windowWhidth = Dimensions.get('window').width
const height = Dimensions.get('window').height

interface props {
    y:Animated.Value
    observe: DlhrAllObserve
    setTerm: (string: string) => void
    index:number
}

export const ObserveCard = ({ observe, setTerm, y,index }: props) => {


    const isMounted = useRef(true)
    const navigation = useNavigation();

const translateY=  Animated.add(y,y.interpolate({
    inputRange:[0,0.00001+index * (height * 0.25)],
    outputRange:[0,index * (height * 0.25)] ,
    extrapolateRight:"clamp",
}))  


    return (
        <TouchableOpacity

            activeOpacity={0.9}
            onPress={
                () => (navigation.navigate('EditObvservCardScreen' ,
                    {
                        busineesUnit: observe.BUSINESS_UNIT,
                        IdentifDt: observe.DL_IDENTIF_DT,
                        Ntarjeta: observe.NroTarjeta
                    } ), setTerm(''))
            }
        >
            <Animated.View style={
                [ {...styles.cardContainer,
                    width: windowWhidth * 0.8,
                    height: height * 0.25,
                    backgroundColor: colors.dlsGrayPrimary,
                },
                 { transform : [{translateY}]}]
            }>
                <View>
                    <Text style={styles.name}>
                        {observe.BUSINESS_UNIT}
                        {'\n#' + observe.NroTarjeta}
                    </Text>
                </View>



            </Animated.View>


        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    cardContainer: {

        marginHorizontal: 10,
        height: 160,
        // width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    name: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10

    },



});