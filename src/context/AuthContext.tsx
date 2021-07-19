import React,{ createContext, useReducer,useState} from 'react'
import { authReducer, AuthState } from './authReducer'


type AuthContextProps={
    status:'checking'|'authenticated'|'not-authenticated';
    errorMessage:string|null;
    signIn:(url:string)=> void;
    logOut:()=>void;
    removeError:()=>void;
   

}

 const authInitialState:AuthState={
    status:'checking',
    errorMessage:'',
}


export const AuthContext= createContext({} as AuthContextProps)


export const AuthProvider=({children}:any)=>{

    const [currentUrl, setCurrentUrl] = useState('')

    const [state, dispatch] = useReducer(authReducer,authInitialState)
    
    const signIn=(url:string)=>{
     
       
        setCurrentUrl(url)
        
        if (!currentUrl.includes('https://midls.dls-archer.com/midls/login/')&& currentUrl!=''&&state.status!='authenticated')
        {
        dispatch({type:'signIn'})
        }
         if((currentUrl.includes('https://midls.dls-archer.com/midls/login/')&& state.status=='authenticated')) 
        {
            dispatch({type:'logOut'})
        }      
        
        
    };
    const logOut=()=>{ };
    const removeError=()=>{};
   
     return(
        <AuthContext.Provider value={{
            ...state,
             signIn,
            logOut,
            removeError,
           
            
        }}>
            {children}
        </AuthContext.Provider>
    )

}


