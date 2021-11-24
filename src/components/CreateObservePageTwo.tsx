import React, { useState } from 'react'
import { View, Switch, Platform } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { PickerSelect } from './PickerSelect';

export const CreateObservePageTwo = () => {
    const deportes = [
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
        { label: 'Basket', value: 'basket' },
    ]

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled( !isEnabled );
        //onChange( !isEnabled );
    };

    return (
        <View>
            <PickerSelect placeholder="Puesto" item={deportes} />
        <Switch
            trackColor={{ false: 'gray', true: colors.dlsYellowSecondary}}
            thumbColor={ (Platform.OS === 'android' ) ? colors.dlsYellowSecondary : '' }
            onValueChange={ toggleSwitch }
            value={ isEnabled }
        />
        </View>
    )
}
