import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { Fields, DlhrEquipTbl, DlhrObserveEmplid } from '../interfaces/prompInterfaces';
import { FlatListItemPrompt } from './FlatlisItemPrompt';



interface Props {
    //data: DlhrObserveEmplid[],
    data: any[]
    field1: Fields
    field2: Fields
    closePrompt: React.Dispatch<React.SetStateAction<boolean>>
    setValueSelect: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
}

export const FlatlistPrompt = ({ field1, field2, data, closePrompt, setValueSelect }: Props) => {

    //   console.log(data.filter((item)=>{return item.EMPLID?.includes('C0208')}));

    return (
        <View>

            <FlatList
                data={data}
                renderItem={({ item }) =>
                    /*  <View>
                        <Text style={{}}>
                            {
                             field1.empleado?item[field1.empleado!]:item[field1.equipo!]        
                             //  item.EMPLID
                             // item.DL_EQUIPEMENT_ID
                            }
                        </Text>
                        <Text style={{}}>
                            {
                             field2.empleado?item[field2.empleado!]:item[field2.equipo!] 
                            // item[field2.equipo!]
                           // item.NOMBRE
                          // item.DESCR
                            }
                        </Text>
                    </View> */
                    <FlatListItemPrompt
                        field1={field1.empleado ? item[field1.empleado!] : item[field1.equipo!]}
                        field2={field2.empleado ? item[field2.empleado!] : item[field2.equipo!]}
                        closePrompt={closePrompt}
                        setValueSelect={ setValueSelect}
                    />


                }

                keyExtractor={(item, index) => item[field1.empleado ? item[field1.empleado!] : item[field1.equipo!]] + index.toString()}

                //keyExtractor={(item,index) =>item.EMPLID!+index.toString()}
                showsVerticalScrollIndicator={false}

            />

        </View>
    )
}
