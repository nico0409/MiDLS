import React,{useState,useEffect} from 'react'
import { View } from 'react-native'
import { FlatlistPrompt } from '../components/FlatlistPrompt'
import { Fields, StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, DlhrEquipTbl } from '../interfaces/prompInterfaces';
import { GetStorage } from '../components/Storage';


export const testobserve = () => {

    const emplid:Fields={equipo:'DL_EQUIPEMENT_ID'}
    const nombre:Fields={equipo:'DESCR'}
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

    useEffect(() => {
        dataLoad()
    }, [])
    const ArrayEquip = PromptObserveList['soapenv:Envelope']?.['soapenv:Body']?.DLHR_OBSERVE_PROMPT?.DLHR_EQUIP_TBL;
    const equip: DlhrEquipTbl = {};
    const oneEquip: DlhrEquipTbl[] =[ !Array.isArray(ArrayEquip) ? ArrayEquip ? ArrayEquip :equip:equip];
  
    const equipos=Array.isArray(ArrayEquip) ? ArrayEquip: oneEquip
    return (
        <View style={{flex:1}}>
            <FlatlistPrompt field1={emplid} field2={nombre} data={equipos}/>
        </View>
    )
}
