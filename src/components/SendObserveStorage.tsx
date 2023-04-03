import React, { useEffect } from 'react'
import { DeleteStorage, GetStorage } from './Storage'
import { objUseForm } from '../interfaces/prompInterfaces';
import { SendOnservCardStorage } from './SendOnservCardStorage';


export const SendObserveStorage = async () => {


    function isofflineObserveCard(object: any): object is objUseForm[] {
        return true
    }
    let data: any;
    let dataDescr: any;


    data = await GetStorage({ StorageType: 'offlineObserveCards' })
    dataDescr = await GetStorage({ StorageType: 'offlineObserveCardsDescr' })


    if (data !== null) {
        if (isofflineObserveCard(data)) {


            for (let index = data.length - 1; index >= 0; index--) {
                dataDescr[index].ERR_TYPE === 'NETWORK' &&
                    await SendOnservCardStorage({ data, index });
            }


        }
    }


}
