import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { Fields, DlhrEquipTbl, DlhrObserveEmplid, promptType, promptField } from '../interfaces/prompInterfaces';
import { FlatListItemPrompt } from './FlatlisItemPrompt';



interface Props {
    //data: DlhrObserveEmplid[],
    data: any[]
     field1: string
    field2: string
   
    closePrompt: React.Dispatch<React.SetStateAction<boolean>>
    setValueSelect: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
    setplaceHolder:React.Dispatch<React.SetStateAction<string>>
}

export const FlatlistPrompt = ({  field1, field2, data, closePrompt, setValueSelect,setplaceHolder }: Props) => {

  
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
                        setValueSelect={setValueSelect}
                    />
                }
                keyExtractor={(item, index) =>item[field1] + index.toString()}
                showsVerticalScrollIndicator={false}

            />

        </View>
    )
}
