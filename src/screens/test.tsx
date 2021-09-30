import React,{useState,useEffect} from 'react'
import { View } from 'react-native'
import { FlatlistPrompt } from '../components/FlatlistPrompt'
import { Fields, StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, DlhrEquipTbl, promptType } from '../interfaces/prompInterfaces';
import { GetStorage } from '../components/Storage';
import { GetPrompt } from './GetPrompt';



export const testobserve = () => {

    const emplid:Fields={equipo:'DL_EQUIPEMENT_ID'}
    const nombre:Fields={equipo:'DESCR'}
    
    
    const promptType:promptType={type:'DLHR_ORIGEN'}
    const data = GetPrompt(promptType)
    
    return (
        <View style={{flex:1}}>
             <FlatlistPrompt field1={emplid} field2={nombre} data={data}/> 
        </View>
    )
}
