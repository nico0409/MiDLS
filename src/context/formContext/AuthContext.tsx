import { objUseForm, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../../interfaces/prompInterfaces';
import React,{createContext} from 'react';
import { useForm } from '../../hooks/UseForm';
import { initialObsFormData } from '../../data/initialObsFormData';

//definir que informacion tendre aqui

export interface  AuthState{
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
    setFormValue:(form: M38GetCompIntfcDLHRTAOBSERVCIResponse) => void
}


//Crear el contexto
export const AuthContext=createContext({} as AuthState );

//componente proveedor del estado

export const AuthProvider=({children}: {children:JSX.Element[]|JSX.Element})=>{
   const {form,onChange,setFormValue}= useForm<M38GetCompIntfcDLHRTAOBSERVCIResponse>(initialObsFormData) 
    return(

        <AuthContext.Provider value ={{
           form,onChange,setFormValue
        }}>
            {children}
        </AuthContext.Provider>
    )
}