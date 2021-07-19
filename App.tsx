import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';



import { AuthProvider } from './src/context/AuthContext';
import { DrawerNavigation } from './src/Navigation/DrawerNavigation';



const AppState=({children}:{children:JSX.Element|JSX.Element[]})=>{
  return(
    <AuthProvider>
    {children}
    </AuthProvider>
  )
}

 const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <DrawerNavigation/>
      </AppState>
    </NavigationContainer>
  )
}


export default App;