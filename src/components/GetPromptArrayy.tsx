import React, { useState, useEffect } from 'react'
import { StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, promptType, objUseForm } from '../interfaces/prompInterfaces';
import { storageEmplid } from '../interfaces/storageInterface';
import { GetStorage } from './Storage';

export const GetPromptArray = (promptypedata:promptType ) => {
    
    const promptype: StorageTypes = { StorageType: 'prompt' };
    
    let prompt: PromptObserveType | AllObserveType | DlhrAllObserve[] |objUseForm[] |storageEmplid |undefined = {}

   /*  const [PromptObserveList, setPromptObserveList] = useState<PromptObserve>({}) */
    const [PromptObArray, setPromptArray] = useState<any[]>([])
    const dataLoad = async () => {
        prompt = await GetStorage(promptype)


        function isPromptObserve(object: any): object is PromptObserveType {
          
            return 'PromptObserve' in object;
        }
              
         if (prompt!==null)
         {
            if (isPromptObserve(prompt)) {
                /*  setPromptObserveList({ ...PromptObserveList, ...prompt.PromptObserve! }); */
                 const ArrayEquip = prompt.PromptObserve!['soapenv:Envelope']?.['soapenv:Body']?.DLHR_OBSERVE_PROMPT![promptypedata.type!];
                 
                 /* const oneEquip: any[] = [ !Array.isArray(ArrayEquip) ? ArrayEquip:[]] */;
                 setPromptArray( Array.isArray(ArrayEquip) ? ArrayEquip:[ArrayEquip] )            
             }
         }   
       
    }
 
    const internalPrompts = () => {

        switch (promptypedata.type) {
            case 'DLHR_POLITINTERTAREA':
                const dataXlat:any[] = [{
                    DL_POLITINTERTAREA: "Y",
                    DESCR: "Si"
                  },{
                    DL_POLITINTERTAREA: "N",
                    DESCR: "No"
                  }
                ];
                setPromptArray(dataXlat);
                break;
            case 'DLHR_REQAPSSEG':
                const dataXlat2:any = [{
                    DL_REQAPSSEG: "Y",
                    DESCR: "Si"
                  },{
                    DL_REQAPSSEG: "N",
                    DESCR: "No"
                  }
                ]
                setPromptArray(dataXlat2);
                break;
            case 'DLHR_CUASIACC':
                const dataXlat3:any = [{
                    DL_CUASIACC: "Y",
                    DESCR: "Si"
                  },{
                    DL_CUASIACC: "N",
                    DESCR: "No"
                  }
                ]
                setPromptArray(dataXlat3);
                break;
        }
    }

    useEffect(() => {
        
        if(promptypedata.type==='DLHR_POLITINTERTAREA' || promptypedata.type==='DLHR_REQAPSSEG' || promptypedata.type==='DLHR_CUASIACC'){
            internalPrompts();
        }else{
            dataLoad();
        }
    }, [])
    
    // const oneEquip: any[] = [ !Array.isArray(ArrayEquip) ? ArrayEquip:[]];
    // return Array.isArray(ArrayEquip) ? ArrayEquip:oneEquip 

return {PromptObArray}

}
