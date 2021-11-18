import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { Fields, DlhrEquipTbl, DlhrObserveEmplid, promptType, promptField, objUseForm } from '../interfaces/prompInterfaces';
import { FlatListItemPrompt } from './FlatlisItemPrompt';



interface Props {
    //data: DlhrObserveEmplid[],
    data: any[]
     field1: string
    field2: string
    setemplid?: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
    promptType: promptType
    closePrompt: React.Dispatch<React.SetStateAction<boolean>>
    onChange?: (value: string, field: keyof objUseForm) => void;
    setplaceHolder:React.Dispatch<React.SetStateAction<string>>
    fieldtype: keyof objUseForm
}

export const FlatlistPrompt = ({ fieldtype, field1, field2, data, closePrompt, onChange,setplaceHolder ,setemplid,promptType}: Props) => {

  
    return (
        <View style={{}}>

            <FlatList
                style={{}}
                data={data}
                renderItem={({ item }) =>

                    <FlatListItemPrompt
                    setplaceHolder={setplaceHolder}
                        field1={item[field1]}
                        field2={item[field2]}
                        closePrompt={closePrompt}
                        onChange={onChange!}
                        fieldtype={fieldtype}
                        setemplid={setemplid}
                        promptType={promptType}
                    />
                }
                keyExtractor={(item, index) =>item[field1] + index.toString()}
                showsVerticalScrollIndicator={false}

            />

        </View>
    )
}
