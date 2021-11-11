import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Modal, useWindowDimensions, Dimensions } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import RNTextArea from "@freakycoder/react-native-text-area";
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    placeholder: string;
    type: "PTLT_DETAILS" | "DL_ACCION" | "DL_DESCACTO" | "DL_ACCEVITREIT";
    onChange: (value: string, field: keyof objUseForm) => void;
    form: M38GetCompIntfcDLHRTAOBSERVCIResponse
    textSelect?: string;
    disabled?: boolean;
}

const { width: ScreenWidth } = Dimensions.get("window");
export const InputModal = ({ placeholder, type, onChange, textSelect, form, disabled = false }: Props) => {
    const height = useWindowDimensions().height
    const width = useWindowDimensions().width
    const [isVisible, setisVisible] = useState(false)

    let str = ''

    /* const setText = (value: string) => {

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
    } */

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

    const [opacitySaveBtn, setOpacitySaveBtn] = useState(0.5);
    const [newText, setNewText] = useState(str);

    const saveDescrBtn = () => {

        switch (type) {
            case 'DL_DESCACTO':
                onChange(newText, 'm38:DL_DESCACTO')
                break;
            case 'DL_ACCEVITREIT':
                onChange(newText, 'm38:DL_ACCEVITREIT')
                break;
            case 'PTLT_DETAILS':
                onChange(newText, 'm38:PTLT_DETAILS')
                break;
            case 'DL_ACCION':
                onChange(newText, 'm38:DL_ACCION')
                break;
        }
        setisVisible(false)
        setOpacitySaveBtn(0.5);
    }

    return (
        <View style={{ marginVertical: 10 }} >
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
                <View
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', }}
                /* activeOpacity={1}
                onPressOut={() => { setisVisible(false) }} */
                >
                </View>
                <View style={{
                    ...styles.conteinerModal,
                    top: height * 0.25,
                    left: width * 0.1,
                    height: height * 0.5,
                    width: width * 0.8,

                }}>
                    <View
                        style={{
                            ...styles.cardPrompt,
                            height: height * 0.50,
                            width: width * 0.90,
                            backgroundColor: colors.dlsGrayPrimary
                        }}
                    >
                        <View
                            pointerEvents={disabled ? "none" : "auto"}>
                            <RNTextArea
                                defaultCharCount={newText.length}
                                textInputStyle={{ fontSize: 20, color: colors.dlsTextwhite }}
                                style={{
                                    borderRadius: 12,
                                    alignItems: 'flex-start',
                                    height: height * 0.35,
                                    width: width * 0.8,
                                    backgroundColor: '#2b2c32',
                                    marginTop: 20
                                }}
                                value={newText}
                                maxCharLimit={300}
                                exceedCharCountColor="#990606"
                                placeholder={"Escriba su comentario aquí..."}
                                placeholderTextColor="white"
                                onChangeText={(text) => {
                                    /* setText(text)  */
                                    setNewText(text)
                                    if (text.length > 300) {
                                        opacitySaveBtn === 0.5 ? {} : setOpacitySaveBtn(0.5);
                                    } else {
                                        opacitySaveBtn === 1 ? {} : setOpacitySaveBtn(1)
                                    }
                                }}
                            />
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            width: '85%',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity
                                style={[styles.backSaveBtn, { width: '35%' }]}
                                onPress={() => { setisVisible(false) }}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>{disabled ? "Volver" :"Cancelar"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: '35%' }}
                                disabled={opacitySaveBtn === 1 ? false : true}
                                onPress={saveDescrBtn}
                            >
                                <View
                                    style={[styles.backSaveBtn, { opacity: opacitySaveBtn }]}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>Guardar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

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
        alignItems: 'center',
        position: 'absolute',
        zIndex: 999,
        flex: 1,
    },
    cardPrompt: {
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    backSaveBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2c32',
        height: 50,
        borderRadius: 15
    }
});