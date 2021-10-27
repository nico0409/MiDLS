import React, { useContext } from 'react'
import { View, ScrollView, StyleSheet, } from 'react-native';
import { PickerSelect } from './PickerSelect';
import { objUseForm } from '../interfaces/prompInterfaces';
import { Prompt } from './Prompt';
import { AuthContext } from '../context/formContext/AuthContext';
import { DatePickerSelect } from './DatePickerSelect';

interface Props {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const CreateObservePageOne = ({ form, onChange }: Props) => {

    const { emplidSelect } = useContext(AuthContext)

    const { setCardDescr, cardDescr } = useContext(AuthContext);

    return (
        <ScrollView>

            <View style={{ alignItems: 'center' }}>

                <PickerSelect placeholder="Unidad de negocio" type="DLHR_EMPL_BUSSINES_UNIT" onChange={onChange} setCardDescr={setCardDescr} cardDescr={cardDescr} emplid={emplidSelect} />

                <DatePickerSelect onChange={onChange} />

                <PickerSelect placeholder="Origen" type="DLHR_ORIGEN" onChange={onChange} />

                <Prompt onChange={onChange} promptType={{ type: 'DLHR_EQUIP_TBL' }} setCardDescr={setCardDescr} cardDescr={cardDescr} />

                <PickerSelect placeholder="Turno" type="DLHR_TURNO" onChange={onChange} setCardDescr={setCardDescr} cardDescr={cardDescr} />

                <Prompt onChange={onChange} promptType={{ type: 'DLHR_CUSTOMER' }} />

                <Prompt onChange={onChange} promptType={{ type: 'DLHR_SECTOR' }} />

                <View style={styles.marginField}>
                    <Prompt onChange={onChange} promptType={{ type: 'DLHR_OBSERVE_EMPLID' }} />
                </View>

                <View style={styles.marginField}>
                    <PickerSelect placeholder="Puesto" type={"DLHR_PUESTO"} onChange={onChange} />
                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    marginField: {
        marginVertical: 12
    }
});