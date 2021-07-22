import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';

import WebView from 'react-native-webview';

import { IconDescrRedes } from './IconDescrRedes';
import { listRedes } from '../data/listRedes';
import { colors, styless } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get("window");

export const RedesContent = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [pressedRow, setPressedRow] = useState(0);

    return (
        <View style={styles.container}>

            <FlatList
                data={listRedes}
                keyExtractor={(item) => item.id.toString()}
                /* keyExtractor={({ id }, index) => id.toString()} 
                numColumns={2} */
                renderItem={({ item, index }) => (

                    <View style={styles.cardContainer}>
                        <TouchableOpacity
                            style={styles.contentButtons}
                            onPress={() => {
                                setPressedRow(index);
                                setIsVisible(true);
                            }}
                        >
                            <IconDescrRedes
                                type={item.props.type}
                                nameIcon={item.props.nameIcon}
                                requireImage={item.props.requireImage}
                                color={item.props.color}
                                size={item.props.size}
                                descr={item.props.descr}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Modal
                animationType="fade"
                visible={isVisible}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "white" }}>

                    <WebView
                        style={styless.webview}
                        source={{ uri: listRedes[pressedRow].url }}
                    />

                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => setIsVisible(false)}>
                        <View style={styles.backGIcon} />
                        <Icon name="close-circle" color={colors.dlsYellowSecondary} size={35} />
                    </TouchableOpacity>

                </View>

            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%'
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: ((height * 0.8) * 0.8) / 6
    },
    contentButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '80%',
        width: '75%',
    },
    closeBtn: {
        backgroundColor: colors.dlsGrayPrimary,
        //width: 60,
        //height: 60,
        width: '14.5%',
        height: '7%',
        position: 'absolute',
        bottom: '2%',
        right: '2%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backGIcon: {
        backgroundColor: colors.dlsBluePrimary,
        position: 'absolute',
        borderRadius: 100,
        width: '30%',
        height: '30%',

    }
})