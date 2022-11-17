
import React, { useState } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import { objUseForm } from '../interfaces/prompInterfaces';
import { CustomSwitchObserve } from './CustomSwitchObserve';
import { colors } from '../Themes/DlsTheme';
import { Prompt } from './Prompt';
import { InputModal } from './InputModal';
import { RalationchipBtn } from './RalationchipBtn';
import { PickerSelect } from './PickerSelect';

interface Props {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
    poliInterTareaErrorAnim: boolean;
    cuasiAccErrorAnim: boolean;
    reqApsErrorAnim: boolean;
}

export const CreateObservePageTwo = ({ form, onChange,poliInterTareaErrorAnim, cuasiAccErrorAnim, reqApsErrorAnim }: Props) => {

    //CheckBox
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <ScrollView>

            <View style={{ alignItems: 'center' }}>

                <InputModal
                    placeholder={"Descripción del Acto / Condición "}
                    textSelect={""}
                    type={'DL_DESCACTO'}
                    onChange={onChange}
                    form={form}
                />
                <InputModal
                    placeholder={"Acción para evitar reiteración"}
                    textSelect={""}
                    type={'DL_ACCEVITREIT'}
                    onChange={onChange}
                    form={form}
                />

                <PickerSelect placeholder="¿Aplico interrupción de tareas?" type="DLHR_POLITINTERTAREA" onChange={onChange} activeBorderError={poliInterTareaErrorAnim} />

                <PickerSelect placeholder="Cuasi accidente" type="DLHR_CUASIACC" onChange={onChange} activeBorderError={cuasiAccErrorAnim} />

                {form["m38:DL_CUASIACC"] === 'Y' &&
                    <View>
                        <InputModal
                            placeholder={"Más Detalles"}
                            type={'PTLT_DETAILS'}
                            onChange={onChange}
                            form={form}
                        />
                        <InputModal
                            placeholder={"Accion"}
                            type={'DL_ACCION'}
                            onChange={onChange}
                            form={form}
                        />
                    </View>
                }

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30,
                    marginVertical: Platform.OS==='ios'?10:0 
                }}>
                    <Text style={{ color: colors.dlsTextwhite, fontSize: 15 }}>A destacar</Text>
                    <CheckBox
                        tintColors={{ true: colors.dlsYellowSecondary, false: colors.dlsBtonColosWhite }}
                        style={{ transform: [{ scaleX: 1 }, { scaleY: 1}] }}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => {
                            setToggleCheckBox(newValue);
                            onChange(newValue ? 'Y' : 'N', 'm38:DL_ADESTACAR');
                        }}
                    />
                </View>

                <PickerSelect placeholder="Requiere APS de seguimiento *" type="DLHR_REQAPSSEG" onChange={onChange} activeBorderError={reqApsErrorAnim} />

                {form["m38:DL_REQAPSSEG"] === 'Y' &&
                    <View>
                        <Prompt
                            form={form}
                            onChange={onChange}
                            promptType={{ type: 'DLHR_APS' }}
                        />
                        <View style={{ marginVertical: 10 }}>
                            <RalationchipBtn form={form} />
                        </View>
                    </View>
                }

                <View style={{marginHorizontal:30}}>
                    <Text style={{ color: 'white' }}>
                        * No es necesario que cargues los datos del número y responsable si no lo conocés. Podés guardar y enviar la tarjeta de todos modos.
                    </Text>
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