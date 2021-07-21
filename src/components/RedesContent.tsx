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
                horizontal={false}
                data={listRedes}
                keyExtractor={({ id }, index) => id.toString()}
                numColumns={2}
                renderItem={({ item, index }) => (

                    <View style={styles.cardContainer}>
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
                        <View style={styles.backGIcon}/>
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
        width: '50%',
        height: ((height * 0.9) * 0.70) / 3
    },
    closeBtn: {
        backgroundColor: colors.dlsGrayPrimary,
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 50,
        right: 25,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backGIcon:{
        backgroundColor: colors.dlsBluePrimary,
        position: 'absolute',
        borderRadius: 100,
        width: 20,
        height: 20,

    }
})