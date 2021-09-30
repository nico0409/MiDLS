import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageTypes, DlhrAllObserve, AllObserveType, PromptObserveType } from '../interfaces/prompInterfaces';

export const Asingstorage= async({StorageType}:StorageTypes,data:Object)=>{



    await AsyncStorage.setItem(StorageType, JSON.stringify(data));
}

export const GetStorage = async({StorageType}:StorageTypes)=>{
    const Datos = await AsyncStorage.getItem(StorageType);

    switch (StorageType) {
         case 'allObserve':
         const allObserve:AllObserveType=  JSON.parse(Datos!)
         return allObserve;
            
         /*  case 'observeCard':
            const ObserveCard:DlhrAllObserve=  JSON.parse(Datos!)
            return ObserveCard;  */
            
            case 'prompt':
                const prompt:PromptObserveType=  JSON.parse(Datos!)
               
                return prompt;    
    }
    
    
}