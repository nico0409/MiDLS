import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { Fields, DlhrEquipTbl, DlhrObserveEmplid } from '../interfaces/prompInterfaces';


interface Props {
    //data: DlhrObserveEmplid[],
    data:any[]
    field1: Fields
    field2: Fields
}

export const FlatlistPrompt = ({ field1, field2, data }: Props) => {
    
 //   console.log(data.filter((item)=>{return item.EMPLID?.includes('C0208')}));
    
    return (
        <View>
            
            <FlatList
               // data={data.filter((item)=>{return item.EMPLID?.includes('C0208')})
                  data={data}
               /* data.sort((function (a, b) {
                    if (a.DL_EQUIPEMENT_ID! > b.DL_EQUIPEMENT_ID!) {
                        return -1;
                    }
                    if (b.DL_EQUIPEMENT_ID! > a.DL_EQUIPEMENT_ID!) {
                        return 1;
                    }
                    return 0;
                })) */
           // }
                renderItem={({ item }) =>
                    <View>
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
                    </View>}
                    keyExtractor={(item,index) => item[field1.empleado?item[field1.empleado!]:item[field1.equipo!]]+index.toString()}
                   //keyExtractor={(item,index) =>item.EMPLID!+index.toString()}
                   scrollEnabled={true}
                   
            />
           
        </View>
    )
}
