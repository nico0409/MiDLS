import React,{useState,useEffect } from 'react'
import { View, StyleSheet, Text, Platform, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';




interface Props{
    onDebounce:(value:string)=>void
    style?:StyleProp<ViewStyle>
}

export const SearchInput = ({style,onDebounce}:Props) => {

    const [textValue, setTextValue] = useState('')
    const debouncedValue=useDebouncedValue(textValue)

    useEffect(() => {
        onDebounce(debouncedValue)
     
    }, [debouncedValue])
    return (
        <View style={{
            ...styles.container,
            ...style as any
            }}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder='Pokemon Search'
                    style={{
                        ...styles.textInput,
                    top: (Platform.OS ==='ios'?0:2)}}
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
        
    },
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
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
