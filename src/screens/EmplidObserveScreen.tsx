import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { GetPromptArray } from '../components/GetPromptArrayy';

import { Prompt } from '../components/Prompt';
import { GetStorage, Asingstorage } from '../components/Storage';
import { StorageTypes, PromptObserve, AllObserve, DlhrAllObserve, PromptObserveType, AllObserveType, DlhrEmplBussinesUnit, DlhrEquipTbl, Fields, promptType } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';




interface Props extends DrawerScreenProps<RoutstackParams, 'TarjetaObserveScreen'> { };
export const EmplidObserveScreen = ({ navigation, route }: Props) => {


    const [emplid, setemplid] = useState({ fieldValue1: '', fieldValue2: '' })
    const Fieldemplid:Fields={empleado:'NOMBRE'};
    const Fieldnombre:Fields={empleado:'EMPLID'};
    const promptType: promptType = { type: 'DLHR_EMPL_BUSSINES_UNIT' };
    const promptype: StorageTypes = { StorageType: 'prompt' };
    const empl: DlhrEmplBussinesUnit = {};
    const [PromptObserveList, setPromptObserveList] = useState<PromptObserve>({})
    
    const emplidTypeStorage: StorageTypes = { StorageType: 'emplid' };
    
    let placeHolder = 'Emplid'
    let prompt: PromptObserveType | AllObserveType | DlhrAllObserve | undefined = {}
     
    const {PromptObArray } = GetPromptArray(promptType)
    const empleados = PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID });
 
    useEffect(() => {
        // data.find(item=>item.DLHR_OBSERVE_EMPLID?.EMPLID===emplid.fieldValue2)?.DLHR_BUSSINES_UNIT
        // Asingstorage(emplidTypeStorage,{emplid,data})
        if (emplid.fieldValue1 !== '') {
            placeHolder = emplid.fieldValue1;
            navigation.navigate(
                'TarjetaObserveScreen',
                { name: emplid.fieldValue1, emplid: emplid.fieldValue2 });
        }
    }, [emplid])
  
    console.log(placeHolder);
    
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colors.dlsGrayPrimary }}>
            {<Prompt
                data={empleados}
                placeHolder={placeHolder}
                field1={Fieldemplid}
                field2={Fieldnombre}
                setValueSelect={setemplid}
            />}
        </View>
    )
}



