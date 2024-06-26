import React, { useContext, useEffect, useState } from 'react'

import { DlhrAllObserve, StorageTypes } from '../interfaces/prompInterfaces';
import { GetAllObserve } from '../components/GetAllObserve';
import { Asingstorage, GetStorage } from '../components/Storage';
import moment from 'moment';

export const useAllObserve = (emplid: string) => {

    const [isloading, setIsloading] = useState(true)
    const [allObserveList, setObserveList] = useState<DlhrAllObserve[]>([])
    const allboserve: StorageTypes = { StorageType: 'allObserve' };


    const loadAllObserve = async () => {
        if (emplid) {
            setIsloading(true);
            let isError :boolean = false;
            const resp = await GetAllObserve('', emplid, isError);
            const arrayObserve = resp.AllObserve?.['soapenv:Envelope']?.['soapenv:Body'].DLHR_ALL_OBSERVE_COLL.DLHR_ALL_OBSERVE;
            const oneObserve: DlhrAllObserve[] = [];
            const observe: DlhrAllObserve = {}
            oneObserve[0] = !Array.isArray(arrayObserve) ? arrayObserve ? arrayObserve : observe : observe;
            const newAllObserveList: DlhrAllObserve[] = Array.isArray(arrayObserve) ? arrayObserve : oneObserve;

            /* Asingstorage(allboserve, resp); consultar si se usa*/
            /* setObserveList([...allObserveList, ...newAllObser    veList]) allObserveList siempre vacio*/

            const offlineCardsList: any = await GetStorage({ StorageType: 'offlineObserveCardsDescr' });

            /* if (offlineCardsList === null) {
                setObserveList(newAllObserveList)
            } else if (newAllObserveList[0].BUSINESS_UNIT! === undefined) {
                setObserveList(offlineCardsList)
            } else {
                setObserveList([...offlineCardsList, ...newAllObserveList])
            } */

            if (isError) {
                
                offlineCardsList && setObserveList(offlineCardsList);
            } else {
                if (newAllObserveList[0].BUSINESS_UNIT! === undefined) {
                    offlineCardsList && setObserveList(offlineCardsList);
                } else {
                    console.log(offlineCardsList);
                    
                    offlineCardsList === null ? setObserveList(newAllObserveList)
                        : setObserveList([...offlineCardsList, ...newAllObserveList]);
                }

                await Asingstorage({ StorageType: 'lastTObsUpdateDttm' }, { dateUpd: moment().format('DD/MM/YYYY HH:mm:ss') });
            }

            setIsloading(false)
        }
        console.log("se finalizo load observe");

    }

    /* useEffect(() => {
        loadAllObserve();
    }, []) */

    /* useEffect(() => {
        
        reloadCardList && loadAllObserve(),
            reloadCardList && setReloadCardList(false);
    }, [isFocused]) */

    return {
        allObserveList,
        isloading,
        loadAllObserve
    }
}
