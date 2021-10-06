
import React, { useState, useEffect } from 'react'

import { View, Modal, Text, Button, SectionList, TouchableOpacity, FlatList, useWindowDimensions, StyleSheet, Platform } from 'react-native';
import { listSearchOptions, listSearchOptions2 } from '../data/listSearchOptios';
import { HeaderTitle } from './HeaderTitle';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { colors } from '../Themes/DlsTheme';
import { DlhrEmplBussinesUnit, DlhrObserveEmplid, DlhrEquipTbl, Fields, promptType, promptField, objUseForm } from '../interfaces/prompInterfaces';
import { FlatlistPrompt } from './FlatlistPrompt';
import { SearchInput } from './SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GetPromptArray } from './GetPromptArrayy';





interface Props {
    /* data: any[], */
    isVisible: boolean
    setisVisible: React.Dispatch<React.SetStateAction<boolean>>
  
    onChange?: (value: string, field: keyof objUseForm) => void;
    promptType: promptType
    setplaceHolder:React.Dispatch<React.SetStateAction<string>>
    setemplid?: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
}


export const ModalPrompt = ({setemplid,setplaceHolder,isVisible, setisVisible, onChange, promptType }: Props) => {
    
    const height = useWindowDimensions().height
    const width = useWindowDimensions().width
    const { top } = useSafeAreaInsets();

    const [term, setTerm] = useState('')

    const [observeFiltered, setObserveFiltred] = useState<any[]>([])

    const { PromptObArray } = GetPromptArray(promptType)
   
   
    let strField1 = '';
    let strField2 = ''
    let placeHolderSrch=''
    let fieldType: keyof objUseForm='m38:BUSINESS_UNIT'

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
            placeHolderSrch='Equipo'
            fieldType='m38:DL_EQUIPMENT_ID'
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
            placeHolderSrch='Empleado'
            fieldType='m38:BUSINESS_UNIT'
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
            placeHolderSrch='Cliente'
            fieldType='m38:DL_CUSTOMER_ID'
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
            placeHolderSrch='Sector'
            fieldType='m38:DL_SECTOR_ID'
            break;
        case 'DLHR_OBSERVE_EMPLID':
            const fieldObserveEmpl: promptField = {
                DLHR_OBSERVE_EMPLID:
                {
                    field1: { observador: 'EMPLID' },
                    field2: { observador: 'NOMBRE' }
                }
            }
            strField1 = fieldObserveEmpl.DLHR_OBSERVE_EMPLID?.field1.observador!;
            strField2 = fieldObserveEmpl.DLHR_OBSERVE_EMPLID?.field2.observador!;
            placeHolderSrch='Observador'
            fieldType='m38:DL_OBSERVADOR'
            break;
        /* case 'DLHR_APS':
            strField1 = field1.EncargadoAPS!;
            strField2 = field2.EncargadoAPS!
            break; */

    }
    



    let data:any[]=[];
   switch (promptType.type) {
       case 'DLHR_EMPL_BUSSINES_UNIT':
           data= PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID }); 
          break;

         default:
         data = PromptObArray;
              
   }
     
   
  
   
   
    useEffect(() => {
        if (term.length === 0) {

            return setObserveFiltred(data)

        }
        switch (promptType.type) {
            case 'DLHR_EMPL_BUSSINES_UNIT':

                setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_EQUIP_TBL':
                
                setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toString()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;

            default:
                break;
        }


    }, [term])






    return (
        <View style={{}}>
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
                    top: height * 0.25,
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
                            onDebounce={(value) => setTerm(value)}
                            placeholder={placeHolderSrch }
                            style={{
                                ...styles.SearchInput,
                                width: width - 40,
                                top: (Platform.OS === 'ios') ? top : top + 10
                            }
                            }

                        />
                        <View style={{
                            top: 25,
                            height: height * 0.4,

                            backgroundColor: colors.dlsGrayPrimary
                        }}>
                            <FlatlistPrompt
                                data={(term.length === 0) ? data : observeFiltered}
                                field1={strField1}
                                field2={strField2}
                                closePrompt={setisVisible}
                                onChange={onChange!}
                                setemplid={setemplid}
                                promptType={promptType}
                                fieldtype={fieldType}
                                setplaceHolder={setplaceHolder}
                                
                            />
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

    }
})