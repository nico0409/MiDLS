import React,{useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ModalPrompt } from './ModalPrompt';
import { DlhrEmplBussinesUnit, Fields, StorageTypes } from '../interfaces/prompInterfaces';

interface Props {
  data:any[],
  placeHolder:string
  field1:Fields
  field2:Fields
}
export const Prompt = ({data,placeHolder,field1,field2}:Props) => {
    const [isVisible, setisVisible] = useState(false)


    return (
        <View>
            <TouchableOpacity
            onPress={()=>{setisVisible(true)}}>
            <View style={styles.btnContainer}>
                <Text>{placeHolder}</Text>
            </View>
            </TouchableOpacity>
            <ModalPrompt data={data} isVisible={isVisible} setisVisible={setisVisible}  field1={field1} field2={field2}/>
        
        
        </View>
    )
}
const styles = StyleSheet.create({

    btnContainer:{
        height:50,
        width:400,
        borderWidth:1
    }

  




    
});