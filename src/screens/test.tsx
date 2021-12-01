import React ,{useRef }from 'react';
import { StatusBar, SafeAreaView, Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import Wallet from '../components/Wallet';
import { EditObvservCardScreen } from './EditObvservCardScreen';


export const testobserve = () => {
 const refscrool = useRef<ScrollView>(null)
    return (
        <View style={{ flex: 1 ,backgroundColor:'red'}}>
           
        <ScrollView ref={refscrool} style={{backgroundColor:'blue'}}>

            <View style={{backgroundColor:'green' ,height:2000,width:500}} >
            <TouchableOpacity  onPress={()=>{ refscrool.current!.scrollTo({ y: 500, animated: true }) }}>
                    <View style={{height:40, width:50 ,backgroundColor:'black'}}>
                      

                       
                    </View>
                    </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    )
}