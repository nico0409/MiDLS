import { useState } from 'react';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';

export const useForm = <T extends Object>( initState: T ) => {
    
    const [state, setState] = useState( initState );
     const [stateSend, setStateSend] = useState<M38GetCompIntfcDLHRTAOBSERVCIResponse>();  

    const onChange = ( value: string, field: keyof T ) => {
        setState({
            ...state,
            [field]: value
        });

         setStateSend({
            ...stateSend,
            [field]: value
        });  
    }
    const setFormValue=(form:T)=>{
            setState({
                ...state,
                ...form
            })
    }

    return {
        ...state,
        form: state,
        onChange,
        setFormValue,
         stateSend, 
        
    }

}