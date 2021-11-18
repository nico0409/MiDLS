import React, { useEffect, useState } from 'react';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, InterfGetOnesCard } from '../interfaces/prompInterfaces';
import { GetStorage } from '../components/Storage';
import { GetOneCard } from '../components/GetOneCard';
import { useForm } from './UseForm';

export const UseOneGetObserve = (observeCardSrch: InterfGetOnesCard) => {

    const [isloading, setIsloading] = useState(true)
    const { form, setFormValue, onChange, stateSend, setStateSend } = useForm<M38GetCompIntfcDLHRTAOBSERVCIResponse>({})

    const loadObserveCard = async () => {
        setIsloading(true);
        const resp = await GetOneCard(observeCardSrch);
        setFormValue(resp!);
        setIsloading(false)
    }

    const loadObserveCardOffline = async () => {
        setIsloading(true);
        const cardOffline: any = await GetStorage({ StorageType: 'offlineObserveCards' });
        setFormValue(cardOffline?.find((element:any) => element["m38:DL_NTARJETA"]===observeCardSrch.Ntarjeta));
        setIsloading(false)
    }

    const initFormSended = () => {

        setStateSend({
            "m38:BUSINESS_UNIT": observeCardSrch.busineesUnit,
            "m38:DL_IDENTIF_DT": observeCardSrch.IdentifDt,
            "m38:DL_NTARJETA": observeCardSrch.Ntarjeta
        })
    }

    useEffect(() => {
        observeCardSrch.cardOffline ? loadObserveCardOffline() : loadObserveCard();
        initFormSended();
    }, [])

    return {
        stateSend,
        isloading,
        loadObserveCard,
        form,
        setFormValue,
        onChange,
    }
}
