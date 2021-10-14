import React from 'react'
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { objUseForm } from '../interfaces/prompInterfaces';
import { CustomSwitchObserve } from './CustomSwitchObserve';
import { PickerSelect } from './PickerSelect';
import { Prompt } from './Prompt';

interface Props {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const CreateObservePageTwo = ({ form, onChange }: Props) => {

    return (
        <ScrollView>

            <View style={{ alignItems: 'center' }}>

                <View style={styles.marginField}>
                    <Prompt onChange={onChange} promptType={{ type: 'DLHR_OBSERVE_EMPLID' }} />
                </View>

                <View style={styles.marginField}>
                    <PickerSelect placeholder="Puesto" type={"DLHR_PUESTO"} onChange={onChange} />
                </View>

                <View style={styles.marginField}>
                    <CustomSwitchObserve title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="m38:DL_POLITINTERTAREA" />
                </View>

                <View style={styles.marginField}>
                    <CustomSwitchObserve title="Requiere APS de seguimiento" onChange={onChange} switchType="m38:DL_REQAPSSEG" />
                </View>

                <View style={styles.marginField}>
                    <CustomSwitchObserve title="Cuasi accidente" onChange={onChange} switchType="m38:DL_CUASIACC" />
                </View>

            </View >

        </ScrollView >
    )
}


const styles = StyleSheet.create({
    marginField: {
        marginVertical: 12
    }
});