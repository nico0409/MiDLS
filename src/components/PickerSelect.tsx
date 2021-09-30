import React, { useState } from 'react'
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
    placeholder: string;
    item: item[]
}

interface item {
    label: string;
    value: string;
}

export const PickerSelect = ({ placeholder, item }: Props) => {

    const [state, setstate] = useState({
        label: placeholder,
        value: null,
    })

    return (
        <View>
            <RNPickerSelect
                onValueChange={(value) => setstate({
                    ...state,
                    value,
                    label: item.find(element => { return element.value === value })?.label!
                })}
                placeholder={state}
                items={item}
            />
            <Text style={{ width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0 }}>{' '}</Text>
        </View>
    )
}
