import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GetPromptArray } from '../components/GetPromptArrayy';

import { Prompt } from '../components/Prompt';
import { GetStorage, Asingstorage } from '../components/Storage';
import { StorageTypes, PromptObserve, AllObserve, DlhrAllObserve, PromptObserveType, AllObserveType, DlhrEmplBussinesUnit, DlhrEquipTbl, Fields, promptType } from '../interfaces/prompInterfaces';
import { colors, styles } from '../Themes/DlsTheme';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';
import Icon from 'react-native-vector-icons/Ionicons';





interface Props extends DrawerScreenProps<RoutstackParams, 'TarjetaObserveScreen'> { };
export const EmplidObserveScreen = ({ navigation, route }: Props) => {


    const [emplid, setemplid] = useState({ fieldValue1: '', fieldValue2: '' })
    const Fieldemplid: Fields = { empleado: 'EMPLID' };
    const Fieldnombre: Fields = { empleado: 'NOMBRE' };
    const promptType: promptType = { type: 'DLHR_EMPL_BUSSINES_UNIT' };
    const promptype: StorageTypes = { StorageType: 'prompt' };
    const empl: DlhrEmplBussinesUnit = {};
    const [PromptObserveList, setPromptObserveList] = useState<PromptObserve>({})

    const emplidTypeStorage: StorageTypes = { StorageType: 'emplid' };

    let placeHolder = 'Emplid'
    let prompt: PromptObserveType | AllObserveType | DlhrAllObserve | undefined = {}

    const { PromptObArray } = GetPromptArray(promptType)
    const empleados = PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID });
   // const [term, setTerm] = useState('')
    //const [observeFiltered, setObserveFiltred] = useState<any[]>([])

     useEffect(() => {
        // data.find(item=>item.DLHR_OBSERVE_EMPLID?.EMPLID===emplid.fieldValue2)?.DLHR_BUSSINES_UNIT
        // Asingstorage(emplidTypeStorage,{emplid,data})
        if (emplid.fieldValue1 !== '') {
            placeHolder = emplid.fieldValue2;
            navigation.navigate(
                'TarjetaObserveScreen',
                { name: emplid.fieldValue2, emplid: emplid.fieldValue1 });
        }
    }, [emplid]) 

    return (
        <View style={{ alignItems: 'center', flex: 1, backgroundColor: colors.dlsGrayPrimary }}>
            <Image
                source={require('../assets/Logo_DLSNegativo.png')}
                style={styles.pokebolaBG}
            />

            <TouchableOpacity
                style={{ position: 'absolute', left: 10, top: 10 }}
                onPress={() => navigation.goBack()}
            >
                <Icon name="caret-back-outline"
                    color={colors.dlsYellowSecondary}
                    size={35} />
            </TouchableOpacity>
            <View style={{ top: 600 }}>
                <Prompt
                    data={empleados }
                    placeHolder={placeHolder}
                    field1={Fieldemplid}
                    field2={Fieldnombre}
                    setValueSelect={setemplid}
                    promptType={promptType}
                />
            </View>
        </View>
    )
}



