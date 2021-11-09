import React, { createContext, useState } from 'react';
import { objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse, DlhrAllObserve } from '../../interfaces/prompInterfaces';
import { useForm } from '../../hooks/UseForm';
import { initialObsFormData } from '../../data/initialObsFormData';
import { initialObsCardDescr } from '../../data/initialObsCardDescr';

//definir que informacion tendre aqui
export interface AuthState {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
    setFormValue: (form: M38GetCompIntfcDLHRTAOBSERVCIResponse) => void;
    cardDescr: DlhrAllObserve;
    setCardDescr: React.Dispatch<React.SetStateAction<DlhrAllObserve>>
    setEmplidSelect: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>;
    emplidSelect: {
        fieldValue1: string;
        fieldValue2: string;
    }
    reloadCardList: boolean;
    setReloadCardList: React.Dispatch<React.SetStateAction<boolean>>;
}

//Crear el contexto
export const AuthContext = createContext({} as AuthState);

//componente proveedor del estado
export const AuthProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {

    const { form, onChange, setFormValue } = useForm<M38GetCompIntfcDLHRTAOBSERVCIResponse>(initialObsFormData);
    const [cardDescr, setCardDescr] = useState<DlhrAllObserve>(initialObsCardDescr);
    const [emplidSelect, setEmplidSelect] = useState<
        {
            fieldValue1: string;
            fieldValue2: string;
        }>({
            fieldValue1: '',
            fieldValue2: ''
        });

    const [reloadCardList,setReloadCardList] = useState(false);

    return (

        <AuthContext.Provider value={{
            form,
            onChange,
            setFormValue,
            cardDescr,
            setCardDescr,
            setEmplidSelect,
            emplidSelect,
            reloadCardList,
            setReloadCardList
        }}>
            {children}
        </AuthContext.Provider>
    )
}