import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { FlatlistPrompt } from '../components/FlatlistPrompt'
import { Fields, StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, DlhrEquipTbl, promptType } from '../interfaces/prompInterfaces';
import { GetStorage } from '../components/Storage';
import { GetPromptArray } from '../components/GetPromptArrayy';
import { Prompt } from '../components/Prompt';



export const testobserve = () => {
    const [emplid, setemplid] = useState({ fieldValue1: '', fieldValue2: '' })

    const Fieldemplid: Fields = { empleado: 'EMPLID' }
    const Fieldnombre: Fields = { empleado: 'NOMBRE' }
    /*seleccionar tipo de prompt*/
    const promptType: promptType = { type: 'DLHR_EMPL_BUSSINES_UNIT' }
    const { PromptObArray } = GetPromptArray(promptType)
    /*obtiene array de dato */ 
    const empleados = PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID });
    return (
        <View style={{ flex: 1 }}>
            <Prompt
                data={empleados}
                placeHolder={'Empleado'}
                field1={Fieldemplid}
                field2={Fieldnombre}
                setValueSelect={setemplid}
            />
        </View>
    )
}
