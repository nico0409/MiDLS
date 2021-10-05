import React, { useState } from 'react'
import { View } from 'react-native';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import { CustomSwitch } from './CustomSwitch';
import { PickerSelect } from './PickerSelect';

interface Props {
    form: M38GetCompIntfcDLHRTAOBSERVCIResponse;
    onChange: (value: string, field: keyof M38GetCompIntfcDLHRTAOBSERVCIResponse) => void;
}

export const CreateObservePageTwo = ({ form, onChange }: Props) => {

    return (
        <View>
            <PickerSelect placeholder="Puesto" type={"DLHR_PUESTO"} onChange={onChange} />

            <CustomSwitch title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="m38:DL_POLITINTERTAREA"/>
            <CustomSwitch title="Requiere APS de seguimiento" onChange={onChange} switchType="m38:DL_REQAPSSEG"/>
            <CustomSwitch title="Cuasi accidente" onChange={onChange} switchType="m38:DL_CUASIACC"/>

        </View>
    )
}
