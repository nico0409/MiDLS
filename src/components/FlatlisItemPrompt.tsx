

import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { objUseForm, promptType } from '../interfaces/prompInterfaces';




interface Props {
    field1: string
    field2: string
    closePrompt: React.Dispatch<React.SetStateAction<boolean>>
    onChange?: (value: string, field: keyof objUseForm) => void;
    setplaceHolder:React.Dispatch<React.SetStateAction<string>>
    fieldtype: keyof objUseForm
    setemplid?: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
    promptType:promptType
}


export const FlatListItemPrompt = ({ setemplid, promptType,fieldtype, setplaceHolder,field1, field2, closePrompt, onChange }: Props) => {

    return (
        <TouchableOpacity activeOpacity={0.5}
            onPress={() => {
                setplaceHolder(field2),
                closePrompt(false),
                 promptType.type==='DLHR_OBSERVE_EMPLID'? 
                


            }}
        >
            <View style={styles.container}>
                <View>
                    <Text style={styles.itemText}>
                        {field1}
                    </Text>
                </View>
                <View>
                    <Text style={styles.itemText}>
                        {field2}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40

    },
    itemText: {
        marginLeft: 10,
        fontSize: 20,
        fontFamily: 'StagSans-Light',

        color: colors.dlsTextwhite,
        /* fontStyle: 'italic',*/
    },
});