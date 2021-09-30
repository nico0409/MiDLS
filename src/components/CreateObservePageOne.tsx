import React, { useState } from 'react'
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export const CreateObservePageOne = () => {

    const [state, setstate] = useState({
        label: 'Unidad de negocio',
        value: null,
    })

    const deportes = [
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
        { label: 'Basket', value: 'basket' },
    ]
    console.log(state.label);
    
    return (
        <View>
            <RNPickerSelect
                onValueChange={(value) => setstate({
                    ...state,
                    value,
                    label: deportes.find(element => { return element.value === value })?.label!
                })}
                placeholder={state}
                items={deportes}
            />
            <Text style={{ width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0 }}>{' '}</Text>
        </View>
    )
}
