import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { FlatlistPrompt } from '../components/FlatlistPrompt'
import { Fields, StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, DlhrEquipTbl, promptType } from '../interfaces/prompInterfaces';
import { GetStorage } from '../components/Storage';
import { GetPromptArray } from '../components/GetPromptArrayy';
import { Prompt } from '../components/Prompt';
import Accordion from '../components/AcordionList';



export const testobserve = () => {
   /*  const [emplid, setemplid] = useState({ fieldValue1: '', fieldValue2: '' })

    const Fieldemplid: Fields = { equipo: 'DL_EQUIPEMENT_ID' }
    const Fieldnombre: Fields = { equipo: 'DESCR' } */
    /*seleccionar tipo de prompt*/
    /* const promptType: promptType = { type: 'DLHR_EQUIP_TBL' }
    const { PromptObArray } = GetPromptArray(promptType) */
   /*  const empleados = PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID }); */
    
    
    return (
        <View style={{ flex: 1 }}>
            {/* <Prompt
                data={PromptObArray}
                placeHolder={'Empleado'}
                field1={Fieldemplid}
                field2={Fieldnombre}
                setValueSelect={setemplid}
                promptType={promptType}
            /> */}
            <Accordion/>
        </View>
    )
}
