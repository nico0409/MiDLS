import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../Themes/DlsTheme';
import { RedesContent } from './RedesContent';




export const DrawerMenu = ( ) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.botonRedes}
                onPress={() => setIsVisible(true)}>
                <Icon name="share-social-sharp" size={30} color={colors.dlsYellowSecondary} />
                <View style={{ marginRight: 5 }}>
                    <Text style={styles.textBtn}>Visítanos</Text>
                </View>

            </TouchableOpacity>

            <Modal
                animationType="slide"
                visible={isVisible}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBackground}>

                        <View style={styles.titleContainer}>
                            {/*  <Text style={styles.textModal}>Nuestras Redes!</Text> */}


                            <TouchableOpacity
                                style={styles.closebtn}
                                onPress={() => setIsVisible(false)}
                            >
                                <Icon name="close-outline" size={30} color={'white'} />
                            </TouchableOpacity>
                        </View>

                        <RedesContent />

                        {/* <View style={styles.footerContainer}>
                            <TouchableOpacity
                                style={styles.botonRedesClose}
                                onPress={() => setIsVisible(false)}>
                                <Text style={styles.textFooterBtn}>Cerrar Ventana</Text>
                            </TouchableOpacity>
                        </View> */}

                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20
    },
    botonRedes: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalBackground: {
        backgroundColor: colors.dlsGrayPrimary,   
        height: '35%',
        width: '90%',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

    },
    textBtn: {
        fontFamily: 'Stagsans-Light',
        color: colors.dlsYellowSecondary,
        fontSize: 20
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: colors.dlsGrayPrimary,
        //backgroundColor: 'red',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    textModal: {
        fontFamily: 'Stag-Semibold',
        color: 'white',
        fontSize: 20
    },
    closebtn: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    /* footerContainer: {
        backgroundColor: colors.dlsGrayPrimary,
        height: '10%',
        justifyContent: 'center',
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    }, */
    /* botonRedesClose: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 12,
        paddingVertical: 5
    }, */
    /* textFooterBtn: {
        fontFamily: 'StagSans-Semibold',
        color: 'white',
        fontSize: 20
    } */
})