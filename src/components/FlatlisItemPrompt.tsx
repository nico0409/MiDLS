

import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../Themes/DlsTheme';




interface Props {
    field1: string
    field2: string
    closePrompt: React.Dispatch<React.SetStateAction<boolean>>
    setValueSelect: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
}


export const FlatListItemPrompt = ({ field1, field2, closePrompt, setValueSelect }: Props) => {

    return (
        <TouchableOpacity activeOpacity={0.5}
            onPress={() => {
                closePrompt(false),
                    setValueSelect({
                        fieldValue1: field1,
                        fieldValue2: field2,
                    })
                  
                    
            }}
        >
            <View style={styles.container}>

                <Text style={styles.itemText}>
                    {field1}
                </Text>
                <Text style={styles.itemText}>
                    {field2}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'StagSans-Light',

        color: colors.dlsYellowSecondary,
        /* fontStyle: 'italic',*/
    },
});