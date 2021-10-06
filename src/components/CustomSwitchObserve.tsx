import React, { useState } from 'react';
import { Switch, Text, View, Platform } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';

interface Props {
    title: string;
    switchType: "m38:DL_POLITINTERTAREA" | "m38:DL_REQAPSSEG" | "m38:DL_CUASIACC";
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const CustomSwitchObserve = ({title,onChange,switchType}:Props) => {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        onChange(!isEnabled ? 'Y' : 'N', switchType);
        setIsEnabled(!isEnabled);
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>{title}</Text>
            <Switch
                trackColor={{ false: 'gray', true: colors.dlsYellowSecondary }}
                thumbColor={(Platform.OS === 'android') ? colors.dlsYellowSecondary : ''}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}
