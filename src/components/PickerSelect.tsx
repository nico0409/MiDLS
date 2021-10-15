import React, { useState ,useEffect} from 'react';
import RNSingleSelect, {
    ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import { Dimensions, View } from 'react-native';
import { promptType, DlhrBussinesUnit, DlhrOrigen, DlhrPuesto, DlhrTurno, M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';
import { GetPromptArray } from './GetPromptArrayy';

interface Props {
    placeholder: string;
    type: "DLHR_EMPL_BUSSINES_UNIT" | "DLHR_TURNO" | "DLHR_ORIGEN" | "DLHR_PUESTO";
    onChange: (value: string, field: keyof objUseForm) => void;
    form?: M38GetCompIntfcDLHRTAOBSERVCIResponse;
}

interface DlhrPromptsDet extends DlhrOrigen, DlhrPuesto, DlhrTurno, DlhrBussinesUnit { };

const { width: ScreenWidth } = Dimensions.get("window");

export const PickerSelect = ({ placeholder, type, onChange, form }: Props) => {

    

    const promptType: promptType = { type };
    const [selectedItem, setSelectedItem] = useState<ISingleSelectDataType>()
    const { PromptObArray } = GetPromptArray(promptType);
    let itemselect: ISingleSelectDataType = {id:0,value:''}
    let data: ISingleSelectDataType[];
    let fieldData: keyof objUseForm;

    if (PromptObArray[0] !== undefined) {

        let allArrayC: DlhrPromptsDet[];

        /* Unidad de Negocio */
        if (type === "DLHR_EMPL_BUSSINES_UNIT") {
            const businessUArrayC: any = PromptObArray.filter(
                item => item.DLHR_OBSERVE_EMPLID?.EMPLID == 'C020513'
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
                    
                        
                        if (form?.['m38:DL_ORIGEN'] === item.ORIGEN.toString()) {
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                               
                                
                        }
                        break;
                    case "DLHR_PUESTO":
                        dataItem = item.DL_PUESTO;
                        fieldData = "m38:DL_PUESTO";
                        if (form?.['m38:DL_PUESTO'] === item.DL_PUESTO) {
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                        }

                        break;
                    case "DLHR_TURNO":
                        dataItem = item.DL_TURNO;
                        fieldData = "m38:DL_TURNO";
                        
                        
                        
                        
                        if (form?.['m38:DL_TURNO'] == item.DL_TURNO.toString()) {
                           
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                        }

                        break;
                    case "DLHR_EMPL_BUSSINES_UNIT":
                        
                        dataItem = item.UNIDAD_DE_NEGOCIO;
                        fieldData = "m38:BUSINESS_UNIT";
                    
                       
                        
                        if (form?.['m38:BUSINESS_UNIT'] === item.UNIDAD_DE_NEGOCIO) {
                            itemselect = { id: index, value: item.DESCR, data: { dataItem, fieldData } }
                            
                        }

                        break;
                }
                return { id: index, value: item.DESCR, data: { dataItem, fieldData } }
            }
        )

       
    } else {
        data = [];
    }
    useEffect(() => {
        form!==undefined&& setSelectedItem(itemselect)

    }, [PromptObArray])
    
    return (
        <View>
            <RNSingleSelect
                darkMode
                disableAbsolute={false}
                
                initialValue={selectedItem}  
                placeholder={placeholder}
                data={data}
                width={ScreenWidth * 0.9}
                searchEnabled={false}
                menuBarContainerWidth={ScreenWidth * 0.9}
                onSelect={(selectedItem: ISingleSelectDataType) => {
                    onChange(selectedItem.data.dataItem, selectedItem.data.fieldData);
                    setSelectedItem(selectedItem);
                }}
            />
        </View>
    )
}
