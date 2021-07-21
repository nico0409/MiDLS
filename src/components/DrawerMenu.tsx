import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { RedesContent } from './RedesContent';

export const DrawerMenu = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.botonRedes}
                onPress={() => setIsVisible(true)}>
                <Text style={styles.textBtn}>Visitanos</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                visible={isVisible}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBackground}>

                        <View style={styles.titleContainer}>
                            <Text style={styles.textModal}>Nuestras Redes!</Text>
                        </View>

                        <RedesContent />

                        <View style={styles.footerContainer}>
                            <TouchableOpacity
                                style={styles.botonRedesClose}
                                onPress={() => setIsVisible(false)}>
                                <Text style={styles.textFooterBtn}>Cerrar Ventana</Text>
                            </TouchableOpacity>
                        </View>

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
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBackground: {
        backgroundColor: '#e9e9e9',
        height: '90%',
        width: '90%',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textBtn: {
        fontFamily: 'Stag-Semibold',
        color: 'white',
        fontSize: 24
    },
    titleContainer: {
        alignItems: 'center',
        backgroundColor: colors.dlsGrayPrimary,
        height: '15%',
        justifyContent: 'center',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    textModal: {
        fontFamily: 'Stag-Semibold',
        color: 'white',
        fontSize: 26
    },
    footerContainer: {
        backgroundColor: colors.dlsGrayPrimary,
        height: '10%',
        justifyContent: 'center',
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    botonRedesClose: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        /* marginVertical: 20, */
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 12,
        paddingVertical: 5
    },
    textFooterBtn: {
        fontFamily: 'StagSans-Semibold',
        color: 'white',
        fontSize: 20
    }
})