import { useNetInfo } from '@react-native-community/netinfo'
import React,{ createContext, useReducer,useState, useEffect } from 'react'
import { authReducer, AuthState } from './authReducer'
import { SendObserveStorage } from '../components/SendObserveStorage';



type AuthContextProps={
    status:'checking'|'authenticated'|'not-authenticated';
    errorMessage:string|null;
    currentUrlNews:string;
    currentUrlProfile:string;
    signIn:()=> void;
    logOut:()=>void;
    removeError:()=>void;
    changeURLNews:(url:string)=>void;
    changeURLProfile:(url:string)=>void;
    reloadCardList:boolean
    setReloadCardList:React.Dispatch<React.SetStateAction<boolean>>

}

 const authInitialState:AuthState={
    status:'checking',
    errorMessage:'',
}


export const AuthContext= createContext({} as AuthContextProps)



export const AuthProvider=({children}:any)=>{

    const { isConnected } = useNetInfo();

    const [reloadCardList,setReloadCardList] = useState(false);

    console.log("reload",reloadCardList);
    
 const sendObserve= async()=>{
    await SendObserveStorage();
    setReloadCardList(true);
 }

useEffect(() => {
 
   if (isConnected===true){
       console.log("enviando storage");
       
    sendObserve();
   }
    
}, [isConnected])


    //const [currentUrl, setCurrentUrl] = useState('')
    let currentUrlNews=''
    let currentUrlProfile=''
    const [state, dispatch] = useReducer(authReducer,authInitialState)
    
   const changeURLNews=(url:string)=>{

        currentUrlNews=url;
      
    }
    const changeURLProfile =(url:string)=>{

        currentUrlProfile=url;
    }
    const signIn=()=>{
     
       
      


        if ((currentUrlProfile.includes('https://midls.dls-archer.com/midls/user/')||
        currentUrlNews.includes('https://midls.dls-archer.com/midls/noticias/')||
        currentUrlNews.includes('https://midls.dls-archer.com/midls/noticias-dls-buenos-aires/')||
        currentUrlNews.includes('https://midls.dls-archer.com/midls/mi-recibo/')||
        currentUrlNews.includes('https://midls.dls-archer.com/midls/contacto-2/')||
        currentUrlNews.includes('https://midls.dls-archer.com/midls/consultas-y-reclamos/')
        )&&state.status!='authenticated')
        {
        
        
        dispatch({type:'signIn'})
        }
         if(((currentUrlNews.includes('https://midls.dls-archer.com/midls/login/')||
         currentUrlProfile.includes('https://midls.dls-archer.com/midls/login/'))&& (state.status=='authenticated' || state.status=='checking'))) 
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
            changeURLNews,
            changeURLProfile,
            currentUrlNews,
            currentUrlProfile,
            reloadCardList,
            setReloadCardList
            
        }}>
            {children}
        </AuthContext.Provider>
    )

}


