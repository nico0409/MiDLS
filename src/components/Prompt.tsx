import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

import { ModalPrompt } from './ModalPrompt';
import { DlhrEmplBussinesUnit, Fields, promptType, StorageTypes, promptField, objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';
import { onChange } from 'react-native-reanimated';



interface Props {
 
   
   
    onChange?: (value: string, field: keyof objUseForm) => void;
    promptType: promptType;
    setemplid?: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
    form?:M38GetCompIntfcDLHRTAOBSERVCIResponse
    
}
export const Prompt = ({ setemplid,onChange, promptType,form }: Props) => {
    const [isVisible, setisVisible] = useState(false)

   let strPLaceHolder = ''
    switch (promptType.type) {
        case 'DLHR_EMPL_BUSSINES_UNIT':
            strPLaceHolder =  'Emplid'
            break;
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
                onChange={onChange}
                setemplid={setemplid}
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