import React, { useEffect, useState } from 'react'

import { DlhrAllObserve, StorageTypes } from '../interfaces/prompInterfaces';
import { GetAllObserve } from '../components/GetAllObserve';
import { Asingstorage } from '../components/Storage';



export const useAllObserve = (emplid:string) => {

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

        Asingstorage(allboserve, resp);
        setObserveList([...allObserveList, ...newAllObserveList])

        setIsloading(false)
    }


    useEffect(() => {
        loadAllObserve();
    }
        , [])

    return {
        allObserveList,
        isloading,
        loadAllObserve
    }
}
