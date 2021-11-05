import React, { useState, useEffect } from 'react';
import { Switch, Text, View, Platform } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';


interface Props {
    title: string;
    switchType: "m38:DL_POLITINTERTAREA" | "m38:DL_REQAPSSEG" | "m38:DL_CUASIACC";
    onChange: (value: string, field: keyof objUseForm) => void;
    form?: M38GetCompIntfcDLHRTAOBSERVCIResponse;
}

export const CustomSwitchObserve = ({ title, onChange, switchType, form }: Props) => {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        onChange(!isEnabled ? 'Y' : 'N', switchType);
        setIsEnabled(!isEnabled);
    };


    useEffect(() => {

        if (form !== undefined) {
            switch (switchType) {
                case 'm38:DL_CUASIACC':

                    setIsEnabled(form?.['m38:DL_CUASIACC'] === 'Y' ? true : false)
                    break;

                case 'm38:DL_POLITINTERTAREA':
                   
                    
                    setIsEnabled(form?.['m38:DL_POLITINTERTAREA'] === 'Y' ? true : false)
                    break;

                case 'm38:DL_REQAPSSEG':
                    setIsEnabled(form?.['m38:DL_REQAPSSEG'] === 'Y' ? true : false)
                    break;

            }
        }
    }, [])

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center',marginVertical:10 ,backgroundColor:'red',width:'100%'}}>
            <Text style={{ color: colors.dlsTextwhite,fontSize:15 }}>{title}</Text>
            <Switch
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                trackColor={{ false: 'gray', true: colors.dlsYellowSecondary }}
                thumbColor={(Platform.OS === 'android') ? colors.dlsYellowSecondary : ''}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}
