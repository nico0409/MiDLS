import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { goldRuleData } from '../data/QuestionsData';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';
import { ruleGold, ruleType } from '../interfaces/QuestionInterfaces';


interface Props{
    form?: M38GetCompIntfcDLHRTAOBSERVCIResponse;
    questiontType: ruleType;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const Rulegold = ({form,questiontType,onChange}:Props) => {

    let push:boolean=false
   const data= goldRuleData.filter(item=>{
     if( item.type.type===questiontType.type)
     return item;
    })
    
    if (form!==undefined)
    {
        push=form[data[0].field]==='Y'?true:false
    }
    return (
        <BouncyCheckbox
        isChecked={push}
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={data[0].text}
        iconStyle={{ borderColor: "red" }}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={(isChecked: boolean) => {onChange(isChecked?'Y':'N',data[0].field)}}
      />
    )
}
