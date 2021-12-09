import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Platform, StyleProp, ViewStyle, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { colors } from '../Themes/DlsTheme';

interface Props {
    onDebounce: (value: string) => void;
    style?: StyleProp<ViewStyle>;
    placeholder?: string;
    term?: string;
    onSeeFlatList: (value: React.SetStateAction<boolean>) => void;
}

export const SearchInput = ({ style, onDebounce, placeholder, term, onSeeFlatList }: Props) => {

    const [textValue, setTextValue] = useState('')
    const debouncedValue = useDebouncedValue(textValue)

    useEffect(() => {
        onDebounce(debouncedValue)

    }, [debouncedValue])

    /* useEffect(() => {
        setTextValue(term!)

    }, [term]) */

    return (
        <View style={{
            ...styles.container,
            ...style as any
        }}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder={placeholder ? placeholder : ''}
                    style={{
                        ...styles.textInput,
                        top: (Platform.OS === 'ios' ? 0 : 2)
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={(value) => {
                        setTextValue(value);
                        onSeeFlatList(false);
                    }}
                />
                <Icon
                    name="search-outline"
                    color='gray'
                    size={25}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

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
    textBackground: {
        backgroundColor: colors.dlsBtonColosWhite,
        borderRadius: 50,
        height: 40,
        width: '90%',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

    },
    textInput: {
        flex: 1,
        fontSize: 18,

    }
});
