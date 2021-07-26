import React, { createContext, useState } from 'react'
import { MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import { Navigation } from '../../../peliculasAPP/src/navigation/Navigation';
import { AuthProvider } from './AuthContext';



type AuthContextProps = {
state:boolean   
setNavigator:(Navigation: MaterialTopTabNavigationProp<ParamListBase, string>)=>void;
setstate:(state:boolean)=>void
}


export const NavigationContext = createContext({} as AuthContextProps)

export const NavigateProvider = ({ children }: any) => {

    const [state, setstate] = useState(false)
    
    

    let navigator:  MaterialTopTabNavigationProp<ParamListBase, string>

    const setNavigator = (Navigation:  MaterialTopTabNavigationProp<ParamListBase, string>) => {
       
       
       
        Navigation.navigate('NewsScreen')
      
    }

    


    return (
       <NavigationContext.Provider value = {
     { state,
          setNavigator,
          setstate}
         }>
       { children }
       </NavigationContext.Provider>
    )
}

