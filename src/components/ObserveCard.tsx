import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image, Button } from 'react-native';




import { useNavigation } from '@react-navigation/native';
import { DlhrAllObserve } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';




const windowWhidth = Dimensions.get('window').width
const height = Dimensions.get('window').height

interface props {
    observe: DlhrAllObserve
    setTerm: (string: string) => void
}

export const ObserveCard = ({ observe, setTerm }: props) => {


    const isMounted = useRef(true)
    const navigation = useNavigation();




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
            <View style={{
                ...styles.cardContainer,
                width: windowWhidth * 0.8,
                height: height * 0.25,
                backgroundColor: colors.dlsGrayPrimary

            }}>
                <View>
                    <Text style={styles.name}>
                        {observe.BUSINESS_UNIT}
                        {'\n#' + observe.NroTarjeta}
                    </Text>
                </View>



            </View>


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