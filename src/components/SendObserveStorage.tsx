import React,{useEffect} from 'react'
import { GetStorage } from './Storage'
import { objUseForm } from '../interfaces/prompInterfaces';
import { SendOnservCardStorage } from './SendOnservCardStorage';


export const SendObserveStorage = async() => {
  
    function isofflineObserveCard(object: any): object is objUseForm[] {
           return true
    }
    const  data = await GetStorage({StorageType:'offlineObserveCards'}) 
  
     if ( isofflineObserveCard(data)) {
       data.map((form,index)=>{
        console.log("entr3");
        SendOnservCardStorage({form,index})

       })           
    }




    


    
  
     
  
}
