import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity,  useWindowDimensions } from 'react-native';

import { ModalPrompt } from './ModalPrompt';
import { DlhrEmplBussinesUnit, Fields, promptType, StorageTypes } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';


interface Props {
    data: any[],
    placeHolder: string
    field1: Fields
    field2: Fields
    setValueSelect:React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
    promptType:promptType
}
export const Prompt = ({ data, placeHolder, field1, field2 ,setValueSelect,promptType}: Props) => {
    const [isVisible, setisVisible] = useState(false)
const{width}=useWindowDimensions()

    return (
        <View style={{}} >
            <TouchableOpacity
            activeOpacity={0.8}
                onPress={() => { setisVisible(true) }}>
                <View style={styles.btnContainer}>
                    <Text style={styles.textBtn}>{placeHolder}</Text>
                </View>
            </TouchableOpacity>
            <ModalPrompt data={data}
                isVisible={isVisible}
                setisVisible={setisVisible}
                field1={field1}
                field2={field2}
                placeholder={placeHolder} 
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
        borderRadius:10,
        backgroundColor:colors.dlsBtonColosWhite,
        justifyContent:'center',
        alignItems:'center',
        
      
        
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
         
       elevation:15
    },
   
    textBtn:{
fontSize:20
    }






});