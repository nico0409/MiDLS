import React, { useState } from 'react'
import { View } from 'react-native';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';
import { CustomSwitchObserve } from './CustomSwitchObserve';
import { PickerSelect } from './PickerSelect';

interface Props {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const CreateObservePageTwo = ({ form, onChange }: Props) => {

    return (
        <View>
            <PickerSelect placeholder="Puesto" type={"DLHR_PUESTO"} onChange={onChange} />

            <CustomSwitchObserve title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="InterupcionTarea"/>
            <CustomSwitchObserve title="Requiere APS de seguimiento" onChange={onChange} switchType="RequiereAps"/>
            <CustomSwitchObserve title="Cuasi accidente" onChange={onChange} switchType="cuasiAccidente"/>

        </View>
    )
}
