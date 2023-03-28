import React, { useContext, useEffect, useState } from 'react'

import { DlhrAllObserve, StorageTypes } from '../interfaces/prompInterfaces';
import { GetAllObserve } from '../components/GetAllObserve';
import { Asingstorage, GetStorage } from '../components/Storage';

import { AuthContext as AuthcontextGeneral } from '../context/AuthContext'

export const useAllObserve = (emplid: string, isFocused: boolean) => {

    const [isloading, setIsloading] = useState(true)
    const [allObserveList, setObserveList] = useState<DlhrAllObserve[]>([])
    const allboserve: StorageTypes = { StorageType: 'allObserve' };
    const [isErrorResponse, setIsErrorResponse] = useState(false);

    const { reloadCardList, setReloadCardList } = useContext(AuthcontextGeneral)

    const loadAllObserve = async () => {
        setIsloading(true);
        const resp = await GetAllObserve('', emplid, setIsErrorResponse);
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

        if (isErrorResponse) {
            setObserveList(offlineCardsList);
        } else {
            if (newAllObserveList[0].BUSINESS_UNIT! === undefined) {
                offlineCardsList && setObserveList(offlineCardsList);
            } else {
                offlineCardsList === null ? setObserveList(newAllObserveList)
                    : setObserveList([...offlineCardsList, ...newAllObserveList]);
            }

            Asingstorage({ StorageType: 'lastTObsUpdateDttm' }, { dateUpd: new Date().toString() });
        }

        setIsloading(false)

    }

    useEffect(() => {
        loadAllObserve();
    }, [])

    useEffect(() => {
        reloadCardList && loadAllObserve(),
            reloadCardList && setReloadCardList(false);
    }, [isFocused])

    return {
        allObserveList,
        isloading,
        loadAllObserve
    }
}
