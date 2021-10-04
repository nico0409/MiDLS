import React, { useState } from 'react';
import RNSingleSelect, {
    ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import { Dimensions, View } from 'react-native';
import { promptType, DlhrBussinesUnit, DlhrOrigen, DlhrPuesto, DlhrTurno } from '../interfaces/prompInterfaces';
import { GetPromptArray } from './GetPromptArrayy';

interface Props {
    placeholder: string;
    type: "DLHR_EMPL_BUSSINES_UNIT" | "DLHR_TURNO" | "DLHR_ORIGEN" | "DLHR_PUESTO";
    itemSelect?: number;
}

interface DlhrPromptsDet extends DlhrOrigen, DlhrPuesto, DlhrTurno, DlhrBussinesUnit { };

const { width: ScreenWidth } = Dimensions.get("window");

export const PickerSelect = ({ placeholder, type }: Props) => {

    const [selectedItem, setSelectedItem] = useState<ISingleSelectDataType>()

    const promptType: promptType = { type };

    const { PromptObArray } = GetPromptArray(promptType);

    let data: ISingleSelectDataType[];

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
                        break;
                    case "DLHR_PUESTO":
                        dataItem = item.DL_PUESTO;
                        break;
                    case "DLHR_TURNO":
                        dataItem = item.DL_TURNO;
                        break;
                    case "DLHR_EMPL_BUSSINES_UNIT":
                        dataItem = item.UNIDAD_DE_NEGOCIO;
                        break;
                }
                return { id: index, value: item.DESCR, data: dataItem }
            }
        )

    } else {
        data = [];
    }

    return (
        <View>
            <RNSingleSelect
                darkMode
                initialValue={selectedItem}
                placeholder={placeholder}
                data={data}
                width={ScreenWidth * 0.9}
                searchEnabled={false}
                menuBarContainerWidth={ScreenWidth * 0.9}
                onSelect={(selectedItem: ISingleSelectDataType) => {
                    console.log("SelectedItem: ", selectedItem);
                    setSelectedItem(selectedItem);
                }}
            />
        </View>
    )
}
