import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';

import WebView from 'react-native-webview';

import { IconDescrRedes } from './IconDescrRedes';
import { listRedesDLS } from '../data/listRedes';
import { colors, styless } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatListRedes } from './FlatListRedes';
import { color } from 'react-native-reanimated';

const { height } = Dimensions.get("window");

export const RedesContent = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [pressedRow, setPressedRow] = useState(0);



    return (
        <View style={styles.container}>
            <Text style={styles.textRedes}>DLS Latinoamérica</Text>
            <FlatListRedes lista={listRedesDLS} setVisible={setIsVisible} setPressedRow={setPressedRow} owner='DLS' />
            <Text style={{ ...styles.textRedes }}>Archer - the well company</Text>
            <View style={{ height: '40%' }}>
                <FlatListRedes lista={listRedesDLS} setVisible={setIsVisible} setPressedRow={setPressedRow} owner='ARCHER' />
            </View>
            <Modal
                animationType="fade"
                visible={isVisible}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "white" }}>

                    <WebView
                        style={styless.webview}
                        source={{ uri: listRedesDLS[pressedRow].url }}
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
        // paddingTop: '5%'
        margin: 5


    },
    cardContainer: {

        /*  alignItems: 'center',
         justifyContent: 'center',
         width: '40%',
         height: ((height * 0.5) * 0.5) / 6,
          */

    },
    contentButtons: {
        /*  flexDirection: 'row',
         alignItems: 'center',
         height: '80%',
         width: '75%', */
    }, textRedes: {
        fontSize: 18,
        fontFamily: 'StagSans-Light',
        color: colors.dlsYellowSecondary,
        marginLeft: 10,





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