
import React, { useState, useEffect } from 'react'

import { View, Modal, Text, Button, SectionList, TouchableOpacity } from 'react-native';
import { listSearchOptions } from '../data/listSearchOptios';
import { HeaderTitle } from './HeaderTitle';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { colors, styles } from '../Themes/DlsTheme';
import { fieldSearchType } from '../interfaces/prompInterfaces';



interface Props {
    isVisible: boolean
    setisVisible: React.Dispatch<React.SetStateAction<boolean>>
    setTerm: React.Dispatch<React.SetStateAction<string>>
    setPlaceHolder: React.Dispatch<React.SetStateAction<fieldSearchType>>
}
export const ModalSearch = ({ isVisible, setisVisible, setTerm, setPlaceHolder }: Props) => {
    const [searchValue, setsearchValue] = useState(0)
    const [typeSearh, setTypeSearch] = useState<fieldSearchType>({
        type: 'DLHR_NTARJETA',
        label: 'Numero de tarjeta'
    })

    const changeType = (Value: number) => {

        switch (Value) {
            case 0:
                setTypeSearch!({
                    type: 'DLHR_NTARJETA',
                    label: 'Numero de tarjeta'
                })
                break;
            case 1:
                setTypeSearch!({ type: 'DLHR_BUSSINES', label: 'Unidadad de negocio' })
                break;
            case 2:
                setTypeSearch!({ type: 'DLHR_EQUIPO', label: 'Equipo' })
                break;
            case 3:
                setTypeSearch!({ type: 'DLHR_FECHA', label: 'Fecha' })
                break;
            case 4:
                setTypeSearch!({ type: 'DLHR_TURNO', label: 'Turno' })
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        setTerm('');
        setPlaceHolder({ ...typeSearh })
    }, [typeSearh])

    return (
        <View>
            <Modal animationType='fade'
                visible={isVisible}
                transparent
                onRequestClose={() => { setisVisible(!isVisible); }}
            >
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    activeOpacity={1}
                    onPressOut={() => { setisVisible(false) }}
                />

                {/* contenido del modal */}
                <View style={{
                    backgroundColor: colors.dlsGrayPrimary,
                    width: 230,
                    height: 200,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOffset: {
                        width: 0,
                        height: 10
                    },
                    elevation: 10,
                    borderRadius: 15,
                    shadowOpacity: 0.25,
                    top: 90,
                    left: 30,

                }}>

                    {/*   <RadioForm
                        radio_props={listSearchOptions}
                        initial={searchValue}
                        onPress={(value) => { setsearchValue!(value), changeType(value), setisVisible(false) }}
                        animation={true}
                        buttonColor={colors.dlsTextwhite}
                        labelColor={colors.dlsTextwhite}
                         /> */}

                    <RadioForm
                        formHorizontal={false}
                        animation={true}
                        initial={searchValue}

                    >
                        {
                            listSearchOptions.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} >
                                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={searchValue === i}
                                        onPress={(value) => { setsearchValue!(value), changeType(value), setisVisible(false) }}
                                        buttonInnerColor={colors.dlsBluePrimary}
                                        buttonOuterColor={colors.dlsBtonColosWhite}

                                        buttonOuterSize={25}
                                        buttonStyle={{ backgroundColor: colors.dlsGrayPrimary }}
                                        buttonWrapStyle={{ marginLeft: 5 }}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(value) => { setsearchValue!(value), changeType(value), setisVisible(false) }}
                                        labelStyle={{ fontSize: 17, color: colors.dlsTextwhite }}

                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>

                </View>



            </Modal>
        </View>
    )
}
