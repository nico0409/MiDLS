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
       useNativeDriver={true}
       bounceFriction={7}
        isChecked={push}
        size={25}
        fillColor= "#ff7473"
        unfillColor= "#fbbfbb"
        text={data[0].text}
        iconStyle= {{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderColor: "#fbbfbb",}}
        textStyle={{ fontFamily: "JosefinSans-Regular" ,textDecorationLine: "none" }}
        iconImageStyle={{height: 20, width: 20 } }
        onPress={(isChecked: boolean) => {onChange(isChecked?'Y':'N',data[0].field)}}
      />
    )
}
