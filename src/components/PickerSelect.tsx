import React, { useState, useEffect } from 'react';
import RNSingleSelect, { ISingleSelectDataType } from "../libs/react-native-single-select";
import { Dimensions, Text, View } from 'react-native';
import { promptType, DlhrBussinesUnit, DlhrOrigen, DlhrPuesto, DlhrTurno, M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm, DlhrAps, DlhrAllObserve } from '../interfaces/prompInterfaces';
import { GetPromptArray } from './GetPromptArrayy';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

interface Props {
    placeholder: string;
    type: "DLHR_EMPL_BUSSINES_UNIT" | "DLHR_TURNO" | "DLHR_ORIGEN" | "DLHR_PUESTO" | "DLHR_APS";
    onChange: (value: string, field: keyof objUseForm) => void;
    form?: M38GetCompIntfcDLHRTAOBSERVCIResponse;
    emplid?: string;
    setCardDescr?: React.Dispatch<React.SetStateAction<DlhrAllObserve>>;
    cardDescr?: DlhrAllObserve;
    activeBorderError?: boolean;
    disabled?: boolean;
}

interface DlhrPromptsDet extends DlhrOrigen, DlhrPuesto, DlhrTurno, DlhrBussinesUnit, DlhrAps { };

const { width: ScreenWidth } = Dimensions.get("window");

export const PickerSelect = ({ placeholder, type, onChange, form, setCardDescr, cardDescr, emplid, activeBorderError = false, disabled = false }: Props) => {

    const promptType: promptType = { type };
    const [selectedItem, setSelectedItem] = useState<ISingleSelectDataType>()
    const { PromptObArray } = GetPromptArray(promptType);
    let itemselect: ISingleSelectDataType;
    let data: ISingleSelectDataType[];
    let fieldData: keyof objUseForm;
    let descr: string;

    const titleAnimationValue = useSharedValue(25);
    const heightAnimationValue = useSharedValue(0);

    if (PromptObArray[0] !== undefined) {

        let allArrayC: DlhrPromptsDet[];

        /* Unidad de Negocio */
        if (type === "DLHR_EMPL_BUSSINES_UNIT") {
            const businessUArrayC: any = PromptObArray.filter(
                item => item.DLHR_OBSERVE_EMPLID?.EMPLID == emplid
            )[0].DLHR_BUSSINES_UNIT;
            allArrayC = Array.isArray(businessUArrayC) ? businessUArrayC : [businessUArrayC];
        } else {
            allArrayC = Array.isArray(PromptObArray) ? PromptObArray : [PromptObArray];
        }

        data = allArrayC!.map(
            (item, index) => {
                let dataItem;
                switch (type) {
                    case "DLHR_ORIGEN":
                        dataItem = item.ORIGEN;
                        fieldData = "m38:DL_ORIGEN";
                        descr = item.DESCR
                        if (form?.['m38:DL_ORIGEN'] === item.ORIGEN.toString()) {
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                        }
                        form?.['m38:DL_ORIGEN'] && (titleAnimationValue.value = -5);
                        form?.['m38:DL_ORIGEN'] && (heightAnimationValue.value = 20);
                        break;
                    case "DLHR_PUESTO":
                        dataItem = item.DL_PUESTO;
                        fieldData = "m38:DL_PUESTO";
                        descr = item.DESCR
                        if (form?.['m38:DL_PUESTO'] === item.DL_PUESTO) {
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                        }
                        form?.['m38:DL_PUESTO'] && (titleAnimationValue.value = -5);
                        form?.['m38:DL_PUESTO'] && (heightAnimationValue.value = 20);
                        break;
                    case "DLHR_TURNO":
                        dataItem = item.DL_TURNO;
                        fieldData = "m38:DL_TURNO";
                        descr = item.DESCR
                        if (form?.['m38:DL_TURNO'] == item.DL_TURNO.toString()) {
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                        }
                        form?.['m38:DL_TURNO'] && (titleAnimationValue.value = -5);
                        form?.['m38:DL_TURNO'] && (heightAnimationValue.value = 20);
                        break;
                    case "DLHR_EMPL_BUSSINES_UNIT":
                        dataItem = item.UNIDAD_DE_NEGOCIO;
                        fieldData = "m38:BUSINESS_UNIT";
                        descr = item.DESCR
                        if (form?.['m38:BUSINESS_UNIT'] === item.UNIDAD_DE_NEGOCIO) {
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                        }
                        form?.['m38:BUSINESS_UNIT'] && (titleAnimationValue.value = -5);
                        form?.['m38:BUSINESS_UNIT'] && (heightAnimationValue.value = 20);
                        break;
                }
                return { id: index, value: descr, data: { dataItem, fieldData } }
            })
    } else {
        data = [];
    }

    useEffect(() => {
        form !== undefined && setSelectedItem(itemselect)
    }, [PromptObArray])

    const changeDescr = (value: string, descr: string) => {
        if (type === 'DLHR_TURNO') {
            setCardDescr!({ ...cardDescr, ...{ DL_TURNO: value, TURNO_DESCR: descr } })
        } else
            if (type === 'DLHR_EMPL_BUSSINES_UNIT') {
                setCardDescr!({ ...cardDescr, ...{ BUSINESS_UNIT: value, BUSINES_DESCR: descr } })
            }
    }

    const [isItemChanged, setIsItemChanged] = useState(false);

    const borderAnimationValue = useSharedValue(0);

    const borderAnimationStyle = useAnimatedStyle(() => {
        return {
            borderWidth: withSpring(borderAnimationValue.value, { damping: 8 })
        }
    })

    const titleAnimationStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(heightAnimationValue.value, { duration: 300 }),
            transform: [{ translateY: withTiming(titleAnimationValue.value, { duration: 300 }) }]
        }
    })

    useEffect(() => {
        if (activeBorderError) {
            borderAnimationValue.value = 3;
        }
    }, [activeBorderError]);

    useEffect(() => {
        if (isItemChanged) {
            titleAnimationValue.value = -5;
            heightAnimationValue.value = 20;
            borderAnimationValue.value = 0
        }
    }, [isItemChanged]);

    return (
        <View style={{ marginVertical: 10 }}>

            <Animated.View style={[{ paddingLeft: 10 }, titleAnimationStyle]}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{placeholder}</Text>
            </Animated.View>

            <Animated.View pointerEvents={disabled ? "none" : "auto"} style={[{ marginVertical: 0, borderColor: 'red', borderRadius: 20 }, borderAnimationStyle]}>

                <RNSingleSelect
                    darkMode
                    disableAbsolute={false}
                    initialValue={selectedItem}
                    placeholder={placeholder}
                    data={data}
                    width={ScreenWidth * 0.87}
                    searchEnabled={false}
                    placeholderTextColor="white"
                    menuItemTextStyle={{color:'white'}}
                    menuBarContainerWidth={ScreenWidth * 0.87}
                    onSelect={(selectedItem: ISingleSelectDataType) => {
                        onChange(selectedItem.data.dataItem, selectedItem.data.fieldData);
                        setCardDescr === undefined ? {} : changeDescr(selectedItem.data.dataItem, selectedItem.value);
                        setSelectedItem(selectedItem);
                        setIsItemChanged(true)
                    }}
                />
                {disabled &&
                    <View style={{ height: '100%', width: '15%', backgroundColor: '#2b2c32', position: 'absolute', right: 0, borderRadius: 50 }} />
                }
            </Animated.View>

        </View>
    )
}
