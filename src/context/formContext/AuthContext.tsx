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
    setEmplidSelect:React.Dispatch<React.SetStateAction<string>>;
    emplidSelect:string;
}

//Crear el contexto
export const AuthContext = createContext({} as AuthState);

//componente proveedor del estado
export const AuthProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {

    const { form, onChange, setFormValue } = useForm<M38GetCompIntfcDLHRTAOBSERVCIResponse>(initialObsFormData);
    const [cardDescr, setCardDescr] = useState<DlhrAllObserve>(initialObsCardDescr);
    const [emplidSelect, setEmplidSelect] = useState('')

    return (

        <AuthContext.Provider value={{
            form,
            onChange,
            setFormValue,
            cardDescr,
            setCardDescr,
            setEmplidSelect,
            emplidSelect
 }}>
            {children}
        </AuthContext.Provider>
    )
}