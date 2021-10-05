import React,{useEffect} from 'react';
import { View } from 'react-native';
import Accordion from '../components/AcordionList';

import { useForm } from '../hooks/UseForm';
import { GetOneCard } from '../components/GetOneCard';
import { InterfGetOnesCard } from '../interfaces/prompInterfaces';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';
import { StackScreenProps } from '@react-navigation/stack';
import { UseOneGetObserve } from '../hooks/UseOneGetObserve';
import { Loading } from '../components/Loading';

interface Props extends StackScreenProps <RoutstackParams,'EditObvservCardScreen'>{

}

export const EditObvservCardScreen = ({ navigation, route }: Props) => {


 const {observeCard,isloading,loadObserveCard,form}=UseOneGetObserve(route.params)
   

 if (isloading) {
    return (
        <Loading />
    )
}

    return (
        < View style={{ flex: 1 }}>
          <Accordion observeCard={form!} /> 
        </View>
    )
}
