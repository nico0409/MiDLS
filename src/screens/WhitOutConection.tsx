import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Backgrond } from '../components/Backgrond'

export const WhitOutConection = () => {
    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <Backgrond srcImg="" />
            <View style={styles.butonContainer}>
                <TouchableOpacity activeOpacity={0.3}
                    style={styles.button}
                    onPress={() => { }}
                >
                    <Text style={styles.buttonText}>
                        Sin Coneccion
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({


    butonContainer: {
        alignItems: "center",
        top: 650





    },
    button: {
        // borderWidth:3,
        //borderColor:'rgba(0,0,0,0.3)',
        //paddingHorizontal :20,
        //paddingVertical:5,
        //borderRadius:10,
        //backgroundColor:'rgba(255,255,255,0.6)'



    },
    buttonText: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.8)',
        fontFamily: 'StagSans-Light',
        fontStyle: 'italic',
        textDecorationLine: 'underline',



    }

});
