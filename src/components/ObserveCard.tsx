import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image, Button } from 'react-native';




import { useNavigation } from '@react-navigation/native';
import { DlhrAllObserve } from '../interfaces/prompInterfaces';




const windowWhidth = Dimensions.get('window').width
const height= Dimensions.get('window').height

interface props {
    observe: DlhrAllObserve
 setTerm:(string:string)=>void
}

export const ObserveCard = ({ observe ,setTerm}: props) => {

  
    const isMounted = useRef(true)
    const  navigation=useNavigation();
  
  
  
   
    return (
        <TouchableOpacity
        
            activeOpacity={0.9}
            onPress={
                () =>( navigation.navigate('PokemonScreen' as never, { }as never),setTerm(''))
            }
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWhidth * 0.8,
                height:height*0.25,
                backgroundColor: 'white'

            }}>
                <View>
                    <Text style={styles.name}>
                        {observe.BUSINESS_UNIT}
                        {'\n#' + observe.NroTarjeta}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                  {/*   <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    /> */}
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
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25


    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -10,
        bottom: -5

    },
    pokebolaContainer: {


        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
});