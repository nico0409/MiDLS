import React from 'react'
import BouncyCheckbox from "../libs/react-native-bouncy-checkbox";
import { goldRuleData } from '../data/QuestionsData';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';
import { ruleGold, ruleType } from '../interfaces/QuestionInterfaces';
import { fillColorBtn, unfillColorBtn, colors } from '../Themes/DlsTheme';


interface Props {
    form?: M38GetCompIntfcDLHRTAOBSERVCIResponse;
    questiontType: ruleType;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const Rulegold = ({ form, questiontType, onChange }: Props) => {

    let push: boolean = false
    const data = goldRuleData.filter(item => {
        if (item.type.type === questiontType.type)
            return item;
    })

    if (form !== undefined) {
        push = form[data[0].field] === 'Y' ? true : false
    }
    return (
        <BouncyCheckbox
            useNativeDriver={true}
            bounceFriction={7}
            isChecked={push}
            size={25}
            fillColor={fillColorBtn}
            unfillColor={unfillColorBtn}
            text={data[0].text}
            iconStyle={{
                height: 35,
                width: 35,
                borderRadius: 25,
                borderColor: colors.dlsGrayPrimary
            }}
            style={{ marginVertical: 10 }}
            textStyle={{ fontFamily: "Stag-Semibold", textDecorationLine: "none",color:'white' }}
            iconImageStyle={{ height: 20, width: 20 }}
            onPress={(isChecked: boolean) => { onChange(isChecked ? 'Y' : 'N', data[0].field) }}
        />
    )
}
