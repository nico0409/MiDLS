import React, { useState, useEffect } from 'react'
import { View, Modal, Text, TouchableOpacity, FlatList, StyleSheet, Platform, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { DlhrAllObserve, M38GetCompIntfcDLHRTAOBSERVCIResponse, promptType, objUseForm } from '../interfaces/prompInterfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import { GetPromptArray } from './GetPromptArrayy';
interface Props {

    activeBorderError?: boolean;
    form ?: M38GetCompIntfcDLHRTAOBSERVCIResponse;
 
}


const { width, height } = Dimensions.get("window");
export const RalationchipBtn = ({  activeBorderError = false, form}: Props) => {
   
   
    let strPLaceHolder = 'Responsable de Seguimiento';
    let placeHolderSrch = 'Responsable de Seguimiento';

 
    
    
    const { PromptObArray } = GetPromptArray({type:'DLHR_APS'})
    const emplid=PromptObArray.filter((item)=>{return item.DL_ACTION_NBR===form?.['m38:DL_NUM_APS'] }) 
    const [valueDescr, setValueDescr] = useState(emplid[0]?emplid[0].NOMBRE : strPLaceHolder)
   
    
    const titleAnimationValue = useSharedValue(25);
    const heightAnimationValue = useSharedValue(0);

    const borderAnimationValue = useSharedValue(0);

    const borderAnimationStyle = useAnimatedStyle(() => {
        return {
            borderWidth: withSpring(borderAnimationValue.value, { damping: 8 })
        }
    })

    const titleAnimationStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(heightAnimationValue.value, { duration: 300 }),
            transform: [{ translateY: withTiming(titleAnimationValue.value, { duration: 300 }) }]
        }
    })

    useEffect(() => {
        if (activeBorderError) {
            borderAnimationValue.value = 3;
        }
    }, [activeBorderError]);

    useEffect(() => {
        if (valueDescr!==strPLaceHolder) {
            heightAnimationValue.value = 20;
            titleAnimationValue.value = -5;
            borderAnimationValue.value = 0;
        }
    }, [valueDescr]);

    useEffect(() => {
        
        
        const emplid=PromptObArray.filter((item)=>{return item.DL_ACTION_NBR===form?.['m38:DL_NUM_APS'] }) 
        
       
        
       setValueDescr(emplid[0]?.NOMBRE)
      
    }, [form,PromptObArray])
     return (
         <View>
           <Animated.View style={[{ paddingLeft: 10 }, titleAnimationStyle]}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{placeHolderSrch}</Text>
            </Animated.View>

            <Animated.View style={[{ borderColor: 'red', borderRadius: 20 }, borderAnimationStyle]}>
                <View style={styles.btnContainer}>
                        <Text style={styles.textBtn}>{valueDescr}</Text>     
                    </View>
            </Animated.View>   
         </View>
     )
 }
 const styles = StyleSheet.create({
  
    btnContainer: {
        height: 50,
        width: width * 0.87,

        borderRadius: 15,
        backgroundColor: '#2b2c32',
        justifyContent: 'space-between',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',



        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 15
    },

    textBtn: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'

    }
})