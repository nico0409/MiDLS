import React, { useEffect, useState } from 'react'

import { DlhrAllObserve, StorageTypes, M38GetCompIntfcDLHRTAOBSERVCIResponse, InterfGetOnesCard, objUseForm } from '../interfaces/prompInterfaces';

import { Asingstorage } from '../components/Storage';
import { GetOneCard } from '../components/GetOneCard';

import { useForm } from './UseForm';



export const UseOneGetObserve = (observeCardSrch: InterfGetOnesCard) => {

    const [isloading, setIsloading] = useState(true)
    const {form,setFormValue,onChange,stateSend,setStateSend }= useForm<M38GetCompIntfcDLHRTAOBSERVCIResponse>({})


    
    

    const loadObserveCard = async () => {
        setIsloading(true);
        const resp = await GetOneCard(observeCardSrch);
        setFormValue(resp!);
        setIsloading(false)
    }


    const initFormSended=()=>{
     
        setStateSend({"m38:BUSINESS_UNIT":observeCardSrch.busineesUnit,
                            "m38:DL_IDENTIF_DT":observeCardSrch.IdentifDt,
                        "m38:DL_NTARJETA":observeCardSrch.Ntarjeta})
    }

    useEffect(() => {
        loadObserveCard();
        initFormSended();
    }
        , [])

    return {
        
         stateSend, 
        isloading,
        loadObserveCard,
        form,
        setFormValue,
        onChange,
       
    }
}
