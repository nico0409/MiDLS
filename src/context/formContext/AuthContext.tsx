import React, { createContext } from 'react';
import { objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../../interfaces/prompInterfaces';
import { useForm } from '../../hooks/UseForm';
import { initialObsFormData } from '../../data/initialObsFormData';

//definir que informacion tendre aqui
export interface AuthState {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}


//Crear el contexto
export const AuthContext = createContext({} as AuthState);

//componente proveedor del estado
export const AuthProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {

    const { form, onChange } = useForm<M38GetCompIntfcDLHRTAOBSERVCIResponse>(initialObsFormData)

    return (

        <AuthContext.Provider value={{
            form,
            onChange
        }}>
            {children}
        </AuthContext.Provider>
    )
}