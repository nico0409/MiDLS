import React, { useEffect, useState } from 'react'

import { DlhrAllObserve, StorageTypes, M38GetCompIntfcDLHRTAOBSERVCIResponse, InterfGetOnesCard, objUseForm } from '../interfaces/prompInterfaces';

import { Asingstorage } from '../components/Storage';
import { GetOneCard } from '../components/GetOneCard';

import { useForm } from './UseForm';



export const UseOneGetObserve = (observeCardSrch: InterfGetOnesCard) => {

    const [isloading, setIsloading] = useState(true)
    const [observeCard, setObserveCard] = useState<M38GetCompIntfcDLHRTAOBSERVCIResponse>()
    const {form,setFormValue,onChange}= useForm<M38GetCompIntfcDLHRTAOBSERVCIResponse>({})

    
    /* const {form,onChange,setFormValue}=useFormCmp(observeCard!); */

    const loadObserveCard = async () => {
        setIsloading(true);
        const resp = await GetOneCard(observeCardSrch);
        setObserveCard(resp);
        setFormValue(resp!);
        setIsloading(false)
    }


    useEffect(() => {
        loadObserveCard();
        
    }
        , [])

    return {
        observeCard,
        isloading,
        loadObserveCard,
        form,
        setFormValue,
        onChange,
    }
}
