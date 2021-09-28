import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TarjetaObserveScreen } from '../screens/TarjetaObserveScreen';

const Stack = createStackNavigator();

export const  StackNavigatorObserve=()=> {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown:false,
        cardStyle:{
            backgroundColor:'white'
        }
    }}
    >
      <Stack.Screen name="TarjetaObserveScreen" component={TarjetaObserveScreen} />
      
     
    </Stack.Navigator>
  );
}