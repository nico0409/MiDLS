
import React, { useState } from 'react'

import { View, Modal, Text, Button, SectionList, TouchableOpacity, FlatList, useWindowDimensions, StyleSheet, Platform } from 'react-native';
import { listSearchOptions, listSearchOptions2 } from '../data/listSearchOptios';
import { HeaderTitle } from './HeaderTitle';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { colors } from '../Themes/DlsTheme';
import { DlhrEmplBussinesUnit, DlhrObserveEmplid, DlhrEquipTbl, Fields } from '../interfaces/prompInterfaces';
import { FlatlistPrompt } from './FlatlistPrompt';
import { SearchInput } from './SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';




interface Props {
    data: any[],
    isVisible: boolean
    setisVisible: React.Dispatch<React.SetStateAction<boolean>>
    field1: Fields
    field2: Fields
    placeholder?: string
    setValueSelect:React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
}


export const ModalPrompt = ({ isVisible, setisVisible, data, field1, field2, placeholder,setValueSelect }: Props) => {
    const [state, setstate] = useState(0)
    const height = useWindowDimensions().height
    const width = useWindowDimensions().width
    const { top } = useSafeAreaInsets();

    const [term, setTerm] = useState('')

    return (
        <View style={{}}>
            <Modal animationType='fade'
                visible={isVisible}
                transparent
                onRequestClose={() => {

                    setisVisible(!isVisible);

                }}
            >
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', }}
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
                    }}>

                        <SearchInput
                            onDebounce={(value) => setTerm(value)}
                            placeholder={placeholder ? placeholder : ''}
                            style={{...styles.SearchInput,
                                width: width - 40,
                                top: (Platform.OS === 'ios') ? top : top + 10
                            }
                            }

                        />

                        <FlatlistPrompt 
                        data={data} 
                        field1={field1} 
                        field2={field2} 
                        closePrompt={setisVisible} 
                        setValueSelect={setValueSelect}
                        />

                    </View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
})