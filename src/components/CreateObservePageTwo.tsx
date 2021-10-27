
import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import { objUseForm } from '../interfaces/prompInterfaces';
import { CustomSwitchObserve } from './CustomSwitchObserve';
import { colors } from '../Themes/DlsTheme';
import { Prompt } from './Prompt';
import { InputModal } from './InputModal';

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

                <View style={styles.marginField}>
                    <CustomSwitchObserve title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="m38:DL_POLITINTERTAREA" />
                </View>

                <View style={styles.marginField}>
                    <CustomSwitchObserve title="Requiere APS de seguimiento" onChange={onChange} switchType="m38:DL_REQAPSSEG" />
                </View>
                {form["m38:DL_REQAPSSEG"] === 'Y' &&
                    <Prompt
                        form={form}
                        onChange={onChange}
                        promptType={{ type: 'DLHR_APS' }}
                    />
                }

                <View style={styles.marginField}>
                    <CustomSwitchObserve title="Cuasi accidente" onChange={onChange} switchType="m38:DL_CUASIACC" />
                </View>
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

                <View style={[{ flexDirection: 'row', alignItems: 'center' }]
                }>
                    <Text style={{ color: colors.dlsTextwhite, fontSize: 15 }}>A destacar</Text>
                    <CheckBox
                        tintColors={{ true: colors.dlsYellowSecondary, false: colors.dlsBtonColosWhite }}
                        style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
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