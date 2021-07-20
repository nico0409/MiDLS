import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { RedesContent } from './RedesContent';

export const DrawerMenu = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.container}>
           
            <TouchableOpacity
                style={styles.botonRedes}
                onPress={() => setIsVisible(true)}>
                <Text>Visitanos</Text>
            </TouchableOpacity>
              <Modal
                animationType="slide"
                visible={isVisible}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBackground}>

                        <RedesContent />

                        <TouchableOpacity
                            style={styles.botonRedesClose}
                            onPress={() => setIsVisible(false)}>
                            <Text>Cerrar Ventana</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:'40%'
    },
    botonRedes: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBackground:{
        backgroundColor: 'white',
        height: '90%',
        width: '90%',
        borderWidth: 2
    },
    botonRedesClose:{
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        marginVertical: 15
    }
})