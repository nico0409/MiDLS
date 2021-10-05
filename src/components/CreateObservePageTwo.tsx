import React, { useState } from 'react'
import { View } from 'react-native';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import { CustomSwitchObserve } from './CustomSwitchObserve';
import { PickerSelect } from './PickerSelect';

interface Props {
    form: M38GetCompIntfcDLHRTAOBSERVCIResponse;
    onChange: (value: string, field: keyof M38GetCompIntfcDLHRTAOBSERVCIResponse) => void;
}

export const CreateObservePageTwo = ({ form, onChange }: Props) => {

    return (
        <View>
            <PickerSelect placeholder="Puesto" type={"DLHR_PUESTO"} onChange={onChange} />

            <CustomSwitchObserve title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="m38:DL_POLITINTERTAREA"/>
            <CustomSwitchObserve title="Requiere APS de seguimiento" onChange={onChange} switchType="m38:DL_REQAPSSEG"/>
            <CustomSwitchObserve title="Cuasi accidente" onChange={onChange} switchType="m38:DL_CUASIACC"/>

        </View>
    )
}
