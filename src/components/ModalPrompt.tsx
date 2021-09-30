
import React, { useState } from 'react'

import { View, Modal, Text, Button, SectionList, TouchableOpacity, FlatList } from 'react-native';
import { listSearchOptions, listSearchOptions2 } from '../data/listSearchOptios';
import { HeaderTitle } from './HeaderTitle';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { colors, styles } from '../Themes/DlsTheme';
import { DlhrEmplBussinesUnit, DlhrObserveEmplid, DlhrEquipTbl, Fields } from '../interfaces/prompInterfaces';
import { FlatlistPrompt } from './FlatlistPrompt';



interface Props {
    data: any[],
    isVisible: boolean
    setisVisible: React.Dispatch<React.SetStateAction<boolean>>
    field1:Fields
    field2:Fields
}
export const ModalPrompt = ({ isVisible, setisVisible, data,field1,field2}: Props) => {
    const [state, setstate] = useState(0)
    
    const  empelados: DlhrObserveEmplid[]=data;
    const equipos:DlhrEquipTbl[]=data;

    return (
        <View>
            <Modal animationType='fade'
                visible={isVisible}
                transparent
                onRequestClose={() => {

                    setisVisible(!isVisible);
                }}

            >
                  <TouchableOpacity
                    style={{ flex: 1, }}
                    activeOpacity={1}
                    onPressOut={() => { setisVisible(false) }}
                >  
                    
                  </TouchableOpacity> 
                  <View style={{
                        position:'absolute',
                        zIndex:999,
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                         {/* <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 400,
                            }}
                            activeOpacity={1}
                            onPressOut={() => { }} */}
                         
                            {/* contenido del modal */}
                            <View style={{
                                backgroundColor: 'white',
                                width: '100%',
                                height: 400,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowOffset: {
                                    width: 0,
                                    height: 10
                                },
                                elevation: 10,
                                borderRadius: 15,
                                shadowOpacity: 0.25



                            }}>

                                {/* <FlatList
                                    data={empelados}
                                    renderItem={({ item }) =>
                                        <View>
                                            <Text style={{}}>
                                                 { item[field1.empleado!]} 
                                            </Text>
                                            <Text style={{}}>
                                                {item[field2.empleado!]}
                                            </Text>
                                        </View>}
                                    keyExtractor={item => item[field1.empleado!]!}
                                /> */}
                                <FlatlistPrompt data={data} field1={field1} field2={field2}/>

                            </View>
                        {/*  </TouchableOpacity> */}
                    </View>
            </Modal>
        </View>
    )
}
