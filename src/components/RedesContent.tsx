import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';

import WebView from 'react-native-webview';

import { IconDescrRedes } from './IconDescrRedes';
import { listRedes } from '../data/listRedes';
import { styless } from '../Themes/DlsTheme';

export const RedesContent = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [pressedRow, setPressedRow] = useState(0);

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text>Nuestras Redes!</Text>
            </View>

            <FlatList
                horizontal={false}
                data={listRedes}
                keyExtractor={({ id }, index) => id.toString()}
                numColumns={2}
                renderItem={({ item,index }) => (
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            setPressedRow(index);
                            setIsVisible(true);
                        }}
                    >
                        <IconDescrRedes
                            type={item.props.type}
                            nameOrUrl={item.props.nameOrUrl}
                            color={item.props.color}
                            size={item.props.size}
                            descr={item.props.descr}
                        />
                    </TouchableOpacity>
                )}
            />

            <Modal
                animationType="fade"
                visible={isVisible}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}>
                        <Text>Cerrar Ventana</Text>
                    </TouchableOpacity>

                    <WebView
                        style={styless.webview}
                        source={{ uri: listRedes[pressedRow].url }}
                    />

                </View>

            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        marginTop: '10%',
        alignItems: 'center'
    },
})