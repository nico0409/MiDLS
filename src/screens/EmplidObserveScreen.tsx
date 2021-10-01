import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';

import { Prompt } from '../components/Prompt';
import { GetStorage } from '../components/Storage';
import { StorageTypes, PromptObserve, AllObserve, DlhrAllObserve, PromptObserveType, AllObserveType, DlhrEmplBussinesUnit, DlhrEquipTbl, Fields, promptType } from '../interfaces/prompInterfaces';
import { GetPromptArray } from '../components/GetPromptArrayy';








export const EmplidObserveScreen = () => {
    

    const emplid:Fields={empleado:'NOMBRE'}
    const nombre:Fields={empleado:'EMPLID'}
     const promptType:promptType={type:'DLHR_EMPL_BUSSINES_UNIT'}
    let  data  : DlhrEmplBussinesUnit []=[]
  
    data=  GetPromptArray(promptType) ;
   
useEffect(() => {
    const empleados = data.map(item => { return item.DLHR_OBSERVE_EMPLID }); 
}, [data])
   
    
    console.log('entre');
    
    /* const ArrayEquip = PromptObserveList['soapenv:Envelope']?.['soapenv:Body']?.DLHR_OBSERVE_PROMPT?.DLHR_EQUIP_TBL;
    const equip: DlhrEquipTbl = {};
    const oneEquip: DlhrEquipTbl[] =[ !Array.isArray(ArrayEquip) ? ArrayEquip ? ArrayEquip :equip:equip];
  
    const equipos=Array.isArray(ArrayEquip) ? ArrayEquip: oneEquip */
   
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
         {/*    <Prompt data={empleados} placeHolder={'Empleado'} field1={emplid} field2={nombre} /> */}
        </View>
    )
}






