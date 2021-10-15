import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Modal, useWindowDimensions, TextInput } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import { onChange, Value } from 'react-native-reanimated';

interface Props {
    placeholder: string;
    type: "PTLT_DETAILS" | "DL_ACCION" | "DL_DESCACTO" | "DL_ACCEVITREIT";
    onChange: (value: string, field: keyof objUseForm) => void;
    form:M38GetCompIntfcDLHRTAOBSERVCIResponse
    textSelect?: string;
}

export const InputModal = ({ placeholder, type, onChange,textSelect,form }: Props) => {
    const height = useWindowDimensions().height
    const width = useWindowDimensions().width
    const [isVisible, setisVisible] = useState(false)

    let str=''
    const setText=(value:string)=>{

     switch (type) {
         case 'DL_DESCACTO':
             onChange(value,'m38:DL_DESCACTO')
            str= form['m38:DL_DESCACTO']!
             break;
             case 'DL_ACCEVITREIT':
                onChange(value,'m38:DL_ACCEVITREIT')
                break;
                case 'PTLT_DETAILS':
             onChange(value,'m38:PTLT_DETAILS')
             break;
             case 'DL_ACCION':
             onChange(value,'m38:DL_ACCION')
             break;
        
     }   
    }
    switch (type) {
        case 'DL_DESCACTO':
        
           str= form['m38:DL_DESCACTO']!
            break;
            case 'DL_ACCEVITREIT':
                str= form['m38:DL_ACCEVITREIT']! 
               break;
               case 'PTLT_DETAILS':
                str= form['m38:PTLT_DETAILS']!
            break;
            case 'DL_ACCION':
                str= form['m38:DL_ACCION']!
            break;
       
    }
    


    return (
        <View style={{}} >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setisVisible(true) }}>
                <View style={styles.btnContainer}>
                    <Text style={styles.textBtn}>{placeholder}</Text>
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
                        height: height * 0.5,
                        width: width * 0.8,
                        backgroundColor: colors.dlsGrayPrimary
                    }}>


                        <View style={{
                            top: 25,
                            height: height * 0.4,

                            backgroundColor: colors.dlsGrayPrimary
                        }}>
                            <TextInput
                            value={str}
                                keyboardType="name-phone-pad"
                                onChangeText={(text)=>{setText(text)}}
                            />
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
        width: 250,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.dlsBtonColosWhite,
        justifyContent: 'center',
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
        fontSize: 20
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

