import React, { useEffect } from 'react'
import { DeleteStorage, GetStorage } from './Storage'
import { objUseForm } from '../interfaces/prompInterfaces';
import { SendOnservCardStorage } from './SendOnservCardStorage';


export const SendObserveStorage = async () => {


    function isofflineObserveCard(object: any): object is objUseForm[] {
        return true
    }
    let data:any;
    
    
    data=await GetStorage({ StorageType: 'offlineObserveCards' })
   
    
if (data!==null){
    if (isofflineObserveCard(data)) {
        console.log("entrando a enviar");
        
           for  (let index = data.length-1; index >=0; index--) {
              
             await  SendOnservCardStorage({ data, index})       
                }
           
           
       }
}
    

}
