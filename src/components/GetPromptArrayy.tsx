import React, { useState, useEffect } from 'react'
import { StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, promptType } from '../interfaces/prompInterfaces';
import { GetStorage } from './Storage';



export const GetPromptArray = (promptypedata:promptType ) => {

    
    
    
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
        dataLoad();
    }, []);

    const ArrayEquip = PromptObserveList['soapenv:Envelope']?.['soapenv:Body']?.DLHR_OBSERVE_PROMPT![promptypedata.type!];
    const oneEquip: any[] = [ !Array.isArray(ArrayEquip) ? ArrayEquip:[]];
   return Array.isArray(ArrayEquip) ? ArrayEquip:oneEquip 


}
