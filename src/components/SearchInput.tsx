import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Platform, StyleProp, ViewStyle, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { colors } from '../Themes/DlsTheme';






interface Props {
    onDebounce: (value: string) => void
    style?: StyleProp<ViewStyle>
    //setisVisible?:React.Dispatch<React.SetStateAction<boolean>>
    placeholder?:string
}

export const SearchInput = ({ style, onDebounce,placeholder }: Props) => {

    const [textValue, setTextValue] = useState('')
    const debouncedValue = useDebouncedValue(textValue)
    
    useEffect(() => {
        onDebounce(debouncedValue)

    }, [debouncedValue])
    return (
        <View style={{
            ...styles.container,
            ...style as any
        }}>
          {/*   <TouchableOpacity
            onPress={()=>{setisVisible(true)}}>
            <IconAwesome
                name="filter"
                color='white'
                size={25}
            />
            </TouchableOpacity> */}
            <View style={styles.textBackground}>
                <TextInput
                    placeholder={placeholder?placeholder:''}
                    style={{
                        ...styles.textInput,
                        top: (Platform.OS === 'ios' ? 0 : 2)
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
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
         
       elevation:15

    },
    textBackground: {
        backgroundColor: colors.dlsBtonColosWhite,
        borderRadius: 50,
        height: 40,
        width: 280,
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
