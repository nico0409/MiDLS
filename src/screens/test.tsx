import React, { useState, useEffect } from 'react'

/* import {MultipleChoice} from 'react-native-multiple-choice-picker' ; */
import { FlatlistPrompt } from '../components/FlatlistPrompt'
import { Fields, StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, DlhrEquipTbl, promptType } from '../interfaces/prompInterfaces';
import { GetStorage } from '../components/Storage';
import { GetPromptArray } from '../components/GetPromptArrayy';
import { Prompt } from '../components/Prompt';
import Accordion from '../components/AcordionList';
import RNSingleSelect, {
    ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";

import {  StatusBar, SafeAreaView, Dimensions, View } from "react-native";
import { height } from '../../../../can-it-be-done-in-react-native-master/src/Menu/Content';
import Wallet from '../components/Wallet';
import { EditObvservCardScreen } from './EditObvservCardScreen';
import { QuestionsCmp } from '../components/Questions';
import { UseOneGetObserve } from '../hooks/UseOneGetObserve';



 

export const testobserve = () => {

  const { isloading, loadObserveCard, form, onChange } = UseOneGetObserve( {
    IdentifDt: '2020-05-31',
    busineesUnit: 'CDR', Ntarjeta: '2020-4070-039506'
})
    
    return (
        <View style={{ flex: 1 }}>
  
           <QuestionsCmp form={form}   questiontType={{type:'1'}} onChange={ onChange} /> 
          <QuestionsCmp form={form}   questiontType={{type:'2'}} onChange={ onChange}  />
        </View>
    )
}
