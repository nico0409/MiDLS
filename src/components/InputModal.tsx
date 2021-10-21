import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Modal, useWindowDimensions, TextInput, Dimensions } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import { onChange, Value } from 'react-native-reanimated';
import RNTextArea from "@freakycoder/react-native-text-area";
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    placeholder: string;
    type: "PTLT_DETAILS" | "DL_ACCION" | "DL_DESCACTO" | "DL_ACCEVITREIT";
    onChange: (value: string, field: keyof objUseForm) => void;
    form: M38GetCompIntfcDLHRTAOBSERVCIResponse
    textSelect?: string;
}

const { width: ScreenWidth } = Dimensions.get("window");
export const InputModal = ({ placeholder, type, onChange, textSelect, form }: Props) => {
    const height = useWindowDimensions().height
    const width = useWindowDimensions().width
    const [isVisible, setisVisible] = useState(false)

    let str = ''
    const setText = (value: string) => {

        switch (type) {
            case 'DL_DESCACTO':
                onChange(value, 'm38:DL_DESCACTO')
                str = form['m38:DL_DESCACTO']!
                break;
            case 'DL_ACCEVITREIT':
                onChange(value, 'm38:DL_ACCEVITREIT')
                break;
            case 'PTLT_DETAILS':
                onChange(value, 'm38:PTLT_DETAILS')
                break;
            case 'DL_ACCION':
                onChange(value, 'm38:DL_ACCION')
                break;

        }
    }
    switch (type) {
        case 'DL_DESCACTO':

            str = form['m38:DL_DESCACTO']!
            break;
        case 'DL_ACCEVITREIT':
            str = form['m38:DL_ACCEVITREIT']!
            break;
        case 'PTLT_DETAILS':
            str = form['m38:PTLT_DETAILS']!
            break;
        case 'DL_ACCION':
            str = form['m38:DL_ACCION']!
            break;

    }



    return (
        <View style={{marginVertical:10}} >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setisVisible(true) }}>
                <View style={styles.btnContainer}>
                    <Text style={styles.textBtn}>{placeholder}</Text>
                    <Icon name="radio-button-on" size={25} color='white' style={{ right: 13 }} />
                </View>
            </TouchableOpacity>
            <Modal animationType='fade'
                visible={isVisible}
                transparent
                onRequestClose={() => {

                    setisVisible(!isVisible);

                }}
            >
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', }}
                    activeOpacity={1}
                    onPressOut={() => { setisVisible(false) }}
                >
                </TouchableOpacity>
                <View style={{
                    ...styles.conteinerModal,
                    top: height * 0.25,
                    left: width * 0.1,
                    height: height * 0.5,
                    width: width * 0.8,

                }}>

                    <View style={{
                        ...styles.cardPrompt,
                        height: height * 0.4,
                        width: width * 0.8,
                        backgroundColor: colors.dlsGrayPrimary
                    }}>





                        <RNTextArea
                            defaultCharCount={str.length}
                            textInputStyle={{ fontSize: 20, color: colors.dlsTextwhite }}
                            style={{
                                borderRadius: 12,
                                top: 25,
                                height: height * 0.3,
                                backgroundColor: colors.dlsGrayPrimary
                            }}
                            value={str}
                            maxCharLimit={150}
                            placeholderTextColor="black"
                            exceedCharCountColor="#990606"
                            placeholder={"Write your review..."}

                            onChangeText={(text) => { setText(text) }}
                        />


                    </View>

                </View>
            </Modal>


        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        height: 50,
        width: ScreenWidth * 0.87,

        borderRadius: 15,
        backgroundColor: '#2b2c32',
        justifyContent: 'space-between',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',



        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 15
    },
    

    textBtn: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'

    },
    conteinerModal: {
        position: 'absolute',
        zIndex: 999,
        flex: 1,
    },
    cardPrompt: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10
        },
        elevation: 10,
        borderRadius: 15,
        shadowOpacity: 0.25

    },
    SearchInput: {
        position: 'absolute',
        zIndex: 998,

    }

});

