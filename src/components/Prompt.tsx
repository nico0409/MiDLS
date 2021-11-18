import React, { useState, useEffect } from 'react'
import { View, Modal, Text, TouchableOpacity, FlatList, StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { promptType, promptField, objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse, DlhrAllObserve } from '../interfaces/prompInterfaces';
import { SearchInput } from './SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GetPromptArray } from './GetPromptArrayy';
import { FlatListItemPrompt } from './FlatlisItemPrompt';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

interface Props {
    onChange?: (value: string, field: keyof objUseForm) => void;
    promptType: promptType;
    setemplid?: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>;
    form?: M38GetCompIntfcDLHRTAOBSERVCIResponse;
    setCardDescr?: React.Dispatch<React.SetStateAction<DlhrAllObserve>>;
    cardDescr?: DlhrAllObserve;
    activeBorderError?: boolean;
    initialValue?: string;
    disabled?: boolean;
}

const { width, height } = Dimensions.get("window");

export const Prompt = ({ setemplid, onChange, promptType, form, setCardDescr, cardDescr, activeBorderError = false, initialValue, disabled = false }: Props) => {

    const { top } = useSafeAreaInsets();

    const [term, setTerm] = useState('')

    const [observeFiltered, setObserveFiltred] = useState<any[]>([])

    const { PromptObArray } = GetPromptArray(promptType)

    const [isVisible, setisVisible] = useState(false)

    const [seeFlatList, setSeeFlatList] = useState(true);


    let regex = "/^[a-zA-Z]*$/";

    let strPLaceHolder = ''
    switch (promptType.type) {
        case 'DLHR_EMPL_BUSSINES_UNIT':
            strPLaceHolder = 'Emplid'
            break;
        case 'DLHR_EQUIP_TBL':
            strPLaceHolder = 'Equipos'
            break;
        case 'DLHR_CUSTOMER':
            strPLaceHolder = 'Clientes'
            break;
        case 'DLHR_SECTOR':
            strPLaceHolder = 'Sector'
            break;
        case 'DLHR_OBSERVE_EMPLID':
            strPLaceHolder = 'Observador'
            break;
        case 'DLHR_APS':
            strPLaceHolder = 'Numero APS'
            break;
    }

    //initialValue es para asignar un valor inicial en caso de que el campo se necesita indicar algo en el placeholder, como un valor x cuando el form y data este vacio

    const [placeHolder, setplaceHolder] = useState(initialValue ? initialValue : strPLaceHolder)

    let strField1 = '';
    let strField2 = '';
    let strField3 = '';
    let placeHolderSrch = '';
    let fieldType: keyof objUseForm = 'm38:BUSINESS_UNIT';

    switch (promptType.type) {
        case 'DLHR_EQUIP_TBL':
            const fieldEquip: promptField = {
                DLHR_EQUIP_TBL:
                {
                    field1: { equipo: 'DL_EQUIPEMENT_ID' },
                    field2: { equipo: 'DESCR' }
                }
            }
            strField1 = fieldEquip.DLHR_EQUIP_TBL?.field1.equipo!
            strField2 = fieldEquip.DLHR_EQUIP_TBL?.field2.equipo!
            placeHolderSrch = 'Equipo'
            fieldType = 'm38:DL_EQUIPMENT_ID'
            break;
        case 'DLHR_EMPL_BUSSINES_UNIT':
            const fieldBussineU: promptField = {
                DLHR_EMPL_BUSSINES_UNIT:
                {
                    field1:
                        { empleado: 'EMPLID' },
                    field2:
                        { empleado: 'NOMBRE' }
                }
            }
            strField1 = fieldBussineU.DLHR_EMPL_BUSSINES_UNIT?.field1.empleado!;
            strField2 = fieldBussineU.DLHR_EMPL_BUSSINES_UNIT?.field2.empleado!;
            placeHolderSrch = 'Empleado'
            fieldType = 'm38:BUSINESS_UNIT'
            break;
        case 'DLHR_CUSTOMER':
            const fieldCustomer: promptField = {
                DLHR_CUSTOMER:
                {
                    field1: { customer: 'DL_CUSTOMER_ID' },
                    field2: { customer: 'DESCR' }
                }
            }
            strField1 = fieldCustomer.DLHR_CUSTOMER?.field1.customer!;
            strField2 = fieldCustomer.DLHR_CUSTOMER?.field2.customer!;
            placeHolderSrch = 'Cliente'
            fieldType = 'm38:DL_CUSTOMER_ID'
            break;
        case 'DLHR_SECTOR':
            const fieldSector: promptField = {
                DLHR_SECTOR:
                {
                    field1: { sector: 'DL_SECTOR_ID' },
                    field2: { sector: 'DESCR' }
                }
            }
            strField1 = fieldSector.DLHR_SECTOR?.field1.sector!;
            strField2 = fieldSector.DLHR_SECTOR?.field2.sector!;
            placeHolderSrch = 'Sector'
            fieldType = 'm38:DL_SECTOR_ID'
            break;
        case 'DLHR_OBSERVE_EMPLID':
            const fieldObserveEmpl: promptField = {
                DLHR_OBSERVE_EMPLID:
                {
                    field1: { observador: 'EMPLID' },
                    field2: { observador: 'NOMBRE' }
                }
            }
            strField1 = fieldObserveEmpl?.DLHR_OBSERVE_EMPLID?.field1.observador!;
            strField2 = fieldObserveEmpl?.DLHR_OBSERVE_EMPLID?.field2.observador!;
            placeHolderSrch = 'Observador'
            fieldType = 'm38:DL_OBSERVADOR'
            break;
        case 'DLHR_APS':
            const fieldAPS: promptField = {
                DLHR_APS:
                {
                    field1: { APS: 'DL_ACTION_NBR' },
                    field2: { APS: 'EMPLID' }
                }
            }
            strField1 = fieldAPS.DLHR_APS?.field1.APS!;
            strField2 = fieldAPS.DLHR_APS?.field2.APS!;
            placeHolderSrch = 'Numero APS'
            fieldType = 'm38:DL_NUM_APS'
            break;
    }

    let data: any[] = [];
    switch (promptType.type) {
        case 'DLHR_EMPL_BUSSINES_UNIT':
            data = PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID });
            break;

        default:
            data = PromptObArray;

    }

    useEffect(() => {
        if (term.length === 0) {
            setSeeFlatList(true)
            return setObserveFiltred(data)
        }
        switch (promptType.type) {
            case 'DLHR_EMPL_BUSSINES_UNIT':
                    setObserveFiltred(
                        data.filter(
                            observe => observe[strField1].toLocaleLowerCase()
                                .includes(term.toLocaleLowerCase())||
                                observe[strField2].toLocaleLowerCase()
                                .includes(term.toLocaleLowerCase())
                        )
                    )

                break;
            case 'DLHR_EQUIP_TBL':
             
                setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toString().toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase()) ||
                            observe[strField2].toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_CUSTOMER':

                setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toString().toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())||
                            observe[strField2].toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_SECTOR':
                setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toString().toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase()) ||
                            observe[strField2].toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_OBSERVE_EMPLID':
                setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toString().toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())||
                            observe[strField2].toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_APS':
                setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toString().toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
        }
        setSeeFlatList(true);
    }, [term])

    const titleAnimationValue = useSharedValue(25);
    const heightAnimationValue = useSharedValue(0);

    useEffect(() => {
        switch (promptType.type) {
            case 'DLHR_EQUIP_TBL':
                data[0] !== undefined &&
                    form !== undefined &&
                    setplaceHolder(
                        data.filter(
                            item =>
                                item.DL_EQUIPEMENT_ID === form?.['m38:DL_EQUIPMENT_ID'])[0]?.DESCR);
                form?.['m38:DL_EQUIPMENT_ID'] && (titleAnimationValue.value = -5);
                form?.['m38:DL_EQUIPMENT_ID'] && (heightAnimationValue.value = 20);
                break;
            case 'DLHR_CUSTOMER':
                data[0] !== undefined &&
                    form !== undefined &&
                    setplaceHolder(
                        data.filter(
                            item => item.DL_CUSTOMER_ID === form?.['m38:DL_CUSTOMER_ID'])[0]?.DESCR);
                form?.['m38:DL_CUSTOMER_ID'] && (titleAnimationValue.value = -5);
                form?.['m38:DL_CUSTOMER_ID'] && (heightAnimationValue.value = 20);
                break;
            case 'DLHR_SECTOR':
                data[0] !== undefined &&
                    form !== undefined &&
                    setplaceHolder(
                        data.filter(
                            item => item.DL_SECTOR_ID === form?.['m38:DL_SECTOR_ID'])[0]?.DESCR);
                form?.['m38:DL_SECTOR_ID'] && (titleAnimationValue.value = -5);
                form?.['m38:DL_SECTOR_ID'] && (heightAnimationValue.value = 20);
                break;
            case 'DLHR_OBSERVE_EMPLID':
                if (data[0] !== undefined &&
                    form !== undefined) {
                    const item = data.filter(
                        item => item.EMPLID === form?.['m38:DL_OBSERVADOR'])[0];
                    item !== undefined && setplaceHolder(item.NOMBRE)

                    form?.['m38:DL_OBSERVADOR'] && (titleAnimationValue.value = -5);
                    form?.['m38:DL_OBSERVADOR'] && (heightAnimationValue.value = 20);
                }

                break;
            case 'DLHR_APS':
                if (data[0] !== undefined &&
                    form !== undefined) {
                    const item = data.filter(
                        item =>
                            item.DL_ACTION_NBR === form?.['m38:DL_NUM_APS']
                    )[0];
                    item !== undefined && setplaceHolder(item.DL_ACTION_NBR
                    )
                }
                form?.['m38:DL_NUM_APS'] && (titleAnimationValue.value = -5);
                form?.['m38:DL_NUM_APS'] && (heightAnimationValue.value = 20);
                break;
        }
    }, [data])

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
            heightAnimationValue.value = 20;
            titleAnimationValue.value = -5;
            borderAnimationValue.value = 0;
        }
    }, [isItemChanged]);

    return (
        <View style={{ marginVertical: 10 }}>

            <Animated.View style={[{ paddingLeft: 10 }, titleAnimationStyle]}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{placeHolderSrch}</Text>
            </Animated.View>

            <Animated.View style={[{ borderColor: 'red', borderRadius: 20 }, borderAnimationStyle]}>
                <TouchableOpacity
                    disabled={disabled}
                    activeOpacity={0.8}
                    onPress={() => { setisVisible(true) }}>
                    <View style={styles.btnContainer}>
                        <Text style={styles.textBtn}>{placeHolder}</Text>
                        {!disabled &&
                            <Icon name="radio-button-on" size={25} color='white' style={{ right: 13 }} />
                        }
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Modal animationType='fade'
                visible={isVisible}
                transparent
                onRequestClose={() => {
                    setisVisible(!isVisible);
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', }}
                    activeOpacity={1}
                    onPressOut={() => { setisVisible(false) }}
                >
                </TouchableOpacity>

                <View style={{
                    ...styles.conteinerModal,
                    top: height * 0.15,
                    left: width * 0.1,
                    height: height * 0.5,
                    width: width * 0.8,

                }}>
                    <View style={{
                        ...styles.cardPrompt,
                        height: height * 0.5,
                        width: width * 0.8,
                        backgroundColor: colors.dlsGrayPrimary
                    }}>
                        <SearchInput
                            onDebounce={(value) => { setTerm(value) }}
                            placeholder={placeHolderSrch}
                            style={{
                                ...styles.SearchInput,
                                width: width - 40,
                                top: (Platform.OS === 'ios') ? top : top + 10
                            }}
                            onSeeFlatList={setSeeFlatList}
                        />

                        <View style={{
                            top: 25,
                            height: height * 0.4,

                            backgroundColor: colors.dlsGrayPrimary
                        }}>
                            {seeFlatList &&
                                <FlatList
                                    data={term.length === 0 ? data : observeFiltered}
                                    renderItem={({ item }) =>
                                        <FlatListItemPrompt
                                            setplaceHolder={setplaceHolder}
                                            field1={item[strField1]}
                                            field2={item[strField2]}
                                            closePrompt={setisVisible}
                                            onChange={onChange}
                                            fieldtype={fieldType}
                                            setemplid={setemplid}
                                            promptType={promptType}
                                            setCardDescr={setCardDescr}
                                            cardDescr={cardDescr}
                                            setIsItemChanged={setIsItemChanged}
                                        />
                                    }
                                    keyExtractor={(item, index) => item[strField1] + index.toString()}
                                    showsVerticalScrollIndicator={false}
                                />
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    conteinerModal: {
        position: 'absolute',
        zIndex: 999,
        flex: 1,
    },
    cardPrompt: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10
        },
        elevation: 10,
        borderRadius: 15,
        shadowOpacity: 0.25

    },
    SearchInput: {
        position: 'absolute',
        zIndex: 998,

    },
    btnContainer: {
        height: 50,
        width: width * 0.87,

        borderRadius: 15,
        backgroundColor: '#2b2c32',
        justifyContent: 'space-between',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',



        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 15
    },

    textBtn: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'

    }
})