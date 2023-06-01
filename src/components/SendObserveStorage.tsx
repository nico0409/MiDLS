import React, { useEffect } from 'react'
import { Asingstorage, DeleteStorage, GetStorage } from './Storage'
import { objUseForm } from '../interfaces/prompInterfaces';
import { SendOnservCardStorage } from './SendOnservCardStorage';
import moment from 'moment';


export const SendObserveStorage = async () => {


    function isofflineObserveCard(object: any): object is objUseForm[] {
        return true
    }
    let data: any;
    /* let dataDescr: any; */


    data = await GetStorage({ StorageType: 'offlineObserveCards' })
    /* dataDescr = await GetStorage({ StorageType: 'offlineObserveCardsDescr' }) */


    if (data !== null) {
        if (isofflineObserveCard(data)) {


            for (let index = data.length - 1; index >= 0; index--) {
                /* dataDescr[index].ERR_TYPE === 'NETWORK' && */
                    console.log("se ejecuta send offline storage");
                    await SendOnservCardStorage({ data, index });
                    
            }


        }
    }

    await Asingstorage({ StorageType: 'lastTObsUpdateDttm' }, { dateUpd: moment().format('DD/MM/YYYY HH:mm:ss') });

}
