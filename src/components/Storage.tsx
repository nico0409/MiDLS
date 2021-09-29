import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageTypes, AllObserve, PromptObserve, DlhrAllObserve } from '../interfaces/prompInterfaces';

export const Asingstorage= async({StorageType}:StorageTypes,data:Object)=>{



    await AsyncStorage.setItem(StorageType, JSON.stringify(data));
}

export const GetStorage = async({StorageType}:StorageTypes)=>{
    const Datos = await AsyncStorage.getItem(StorageType);
   // console.log('test',Datos );
    switch (StorageType) {
        case 'allObserve':
         const allObserve:AllObserve=  JSON.parse(Datos!)
         return allObserve;
            
        /*  case 'observeCard':
            const ObserveCard:DlhrAllObserve=  JSON.parse(Datos!)
            return ObserveCard;
            
            case 'prompt':
                const prompt:PromptObserve=  JSON.parse(Datos!)
                return prompt;   */ 
    }
    
    
}