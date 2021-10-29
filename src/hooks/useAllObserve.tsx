import React, { useContext, useEffect, useState } from 'react'

import { DlhrAllObserve, StorageTypes } from '../interfaces/prompInterfaces';
import { GetAllObserve } from '../components/GetAllObserve';
import { Asingstorage, GetStorage } from '../components/Storage';
import { AuthContext } from '../context/formContext/AuthContext';



export const useAllObserve = (emplid: string) => {

    const [isloading, setIsloading] = useState(true)
    const [allObserveList, setObserveList] = useState<DlhrAllObserve[]>([])
    const allboserve: StorageTypes = { StorageType: 'allObserve' };

    const loadAllObserve = async () => {
        setIsloading(true);
        const resp = await GetAllObserve('2020-01-01', emplid)
        const arrayObserve = resp.AllObserve?.['soapenv:Envelope']?.['soapenv:Body'].DLHR_ALL_OBSERVE_COLL.DLHR_ALL_OBSERVE;
        const oneObserve: DlhrAllObserve[] = [];
        const observe: DlhrAllObserve = {}
        oneObserve[0] = !Array.isArray(arrayObserve) ? arrayObserve ? arrayObserve : observe : observe;
        const newAllObserveList: DlhrAllObserve[] = Array.isArray(arrayObserve) ? arrayObserve : oneObserve;

        console.log("allObserveList ---------------------------------------");
        console.log(allObserveList);
        console.log("newAllObserveList ---------------------------------------");
        console.log(newAllObserveList);


        /* Asingstorage(allboserve, resp); consultar si se usa*/
        /* setObserveList([...allObserveList, ...newAllObser    veList]) allObserveList siempre vacio*/

        const offlineCardsList: any = await GetStorage({ StorageType: 'offlineObserveCardsDescr' });

        console.log("offlineCardsList --------------------------------------------");
        console.log(offlineCardsList);

        console.log("[...offlineCardsList,...newAllObserveList] ---------------------------------------");
        console.log(offlineCardsList === null ? offlineCardsList : [...offlineCardsList, ...newAllObserveList]);

        offlineCardsList === null ?
            setObserveList(newAllObserveList)
            :
            setObserveList([...offlineCardsList, ...newAllObserveList])

        setIsloading(false)
    }


    useEffect(() => {
        loadAllObserve();
    }, [])

    return {
        allObserveList,
        isloading,
        loadAllObserve
    }
}
