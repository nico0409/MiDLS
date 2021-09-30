import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';

import { Prompt } from '../components/Prompt';
import { GetStorage } from '../components/Storage';
import { StorageTypes, PromptObserve, AllObserve, DlhrAllObserve, PromptObserveType, AllObserveType, DlhrEmplBussinesUnit, DlhrEquipTbl, Fields } from '../interfaces/prompInterfaces';








export const EmplidObserveScreen = () => {
    const promptype: StorageTypes = { StorageType: 'prompt' };
    let prompt: PromptObserveType | AllObserveType | DlhrAllObserve | undefined = {}

    const [PromptObserveList, setPromptObserveList] = useState<PromptObserve>({})
    
    const dataLoad = async () => {
        prompt = await GetStorage(promptype)

        function isPromptObserve(object: any): object is PromptObserveType {
            return 'PromptObserve' in object;
        }

        if (isPromptObserve(prompt)) {
            setPromptObserveList({ ...PromptObserveList, ...prompt.PromptObserve! });
        }


    }
            console.log("pantalla observe");
            
    useEffect(() => {
        dataLoad()
    }, [])
    const emplid:Fields={empleado:'NOMBRE'}
    const nombre:Fields={empleado:'EMPLID'}
   
    /* const emplid:Fields={equipo:'DL_EQUIPEMENT_ID'}
    const nombre:Fields={equipo:'DESCR'} */

     const ArrayEmpl = PromptObserveList['soapenv:Envelope']?.['soapenv:Body']?.DLHR_OBSERVE_PROMPT?.DLHR_EMPL_BUSSINES_UNIT;
    const empl: DlhrEmplBussinesUnit = {};
    const oneEmpl: DlhrEmplBussinesUnit[] =[ !Array.isArray(ArrayEmpl) ? ArrayEmpl ? ArrayEmpl :empl:empl];
  
    const emplids=Array.isArray(ArrayEmpl) ? ArrayEmpl: oneEmpl
    const empleados = emplids.map(item => { return item.DLHR_OBSERVE_EMPLID }); 
    
    const ArrayEquip = PromptObserveList['soapenv:Envelope']?.['soapenv:Body']?.DLHR_OBSERVE_PROMPT?.DLHR_EQUIP_TBL;
    const equip: DlhrEquipTbl = {};
    const oneEquip: DlhrEquipTbl[] =[ !Array.isArray(ArrayEquip) ? ArrayEquip ? ArrayEquip :equip:equip];
  
    const equipos=Array.isArray(ArrayEquip) ? ArrayEquip: oneEquip
   
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Prompt data={empleados} placeHolder={'Empleado'} field1={emplid} field2={nombre} />
        </View>
    )
}






