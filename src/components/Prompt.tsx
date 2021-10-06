import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

import { ModalPrompt } from './ModalPrompt';
import { DlhrEmplBussinesUnit, Fields, promptType, StorageTypes, promptField } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';



interface Props {
 
    setValueSelect: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
    promptType: promptType
}
export const Prompt = ({ setValueSelect, promptType }: Props) => {
    const [isVisible, setisVisible] = useState(false)

    let strPLaceHolder = ''
    switch (promptType.type) {
        case 'DLHR_EQUIP_TBL':
            strPLaceHolder = 'Equipos'
            break;
        case 'DLHR_CUSTOMER':
            strPLaceHolder = 'Clientes'
            break;
        case 'DLHR_SECTOR':
            strPLaceHolder = 'Sector'
            break;
            case 'DLHR_OBSERVE_EMPLID':
            strPLaceHolder = 'Observador'
            break;

    }

    const [placeHolder, setplaceHolder] = useState(strPLaceHolder)
    return (
        <View style={{}} >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setisVisible(true) }}>
                <View style={styles.btnContainer}>
                    <Text style={styles.textBtn}>{placeHolder}</Text>
                </View>
            </TouchableOpacity>
            <ModalPrompt /* data={data} */
                isVisible={isVisible}
                setisVisible={setisVisible}
                setplaceHolder={setplaceHolder}
                setValueSelect={setValueSelect}
                promptType={promptType}


            />


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
    }

});