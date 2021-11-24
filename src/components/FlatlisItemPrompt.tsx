

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