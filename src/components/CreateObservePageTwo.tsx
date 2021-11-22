
import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import { objUseForm } from '../interfaces/prompInterfaces';
import { CustomSwitchObserve } from './CustomSwitchObserve';
import { colors } from '../Themes/DlsTheme';
import { Prompt } from './Prompt';
import { InputModal } from './InputModal';
import { RalationchipBtn } from './RalationchipBtn';

interface Props {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const CreateObservePageTwo = ({ form, onChange }: Props) => {

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

                <CustomSwitchObserve title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="m38:DL_POLITINTERTAREA" />

                <CustomSwitchObserve title="Requiere APS de seguimiento" onChange={onChange} switchType="m38:DL_REQAPSSEG" />

                {form["m38:DL_REQAPSSEG"] === 'Y' &&
                <View>
                    <Prompt
                        form={form}
                        onChange={onChange}
                        promptType={{ type: 'DLHR_APS' }}
                    />
                    <RalationchipBtn form={form} />
                    </View>
                }

                <CustomSwitchObserve title="Cuasi accidente" onChange={onChange} switchType="m38:DL_CUASIACC" />

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
                    marginBottom:50
                }}>
                    <Text style={{ color: colors.dlsTextwhite, fontSize: 15 }}>A destacar</Text>
                    <CheckBox
                        tintColors={{ true: colors.dlsYellowSecondary, false: colors.dlsBtonColosWhite }}
                        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => {
                            setToggleCheckBox(newValue);
                            onChange(newValue ? 'Y' : 'N', 'm38:DL_ADESTACAR');
                        }}
                    />
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