import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GetPromptArray } from '../components/GetPromptArrayy';

import { Prompt } from '../components/Prompt';
import { GetStorage, Asingstorage } from '../components/Storage';
import { StorageTypes, PromptObserve, AllObserve, DlhrAllObserve, PromptObserveType, AllObserveType, DlhrEmplBussinesUnit, DlhrEquipTbl, Fields, promptType } from '../interfaces/prompInterfaces';
import { colors, styles } from '../Themes/DlsTheme';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/formContext/AuthContext';
import { storageEmplid } from '../interfaces/storageInterface';
import { StackScreenProps } from '@react-navigation/stack';






/* interface Props extends DrawerScreenProps<RoutstackParams, 'TarjetaObserveScreen'> { }; */
interface Props extends StackScreenProps<RoutstackParams, 'TarjetaObserveScreen'> { };
export const EmplidObserveScreen = ({ navigation, route }: Props) => {


    const [emplid, setemplid] = useState({ fieldValue1: '', fieldValue2: '' })
    const { setEmplidSelect } = useContext(AuthContext)
    const promptType: promptType = { type: 'DLHR_EMPL_BUSSINES_UNIT' };
    const emplidTypeStorage: StorageTypes = { StorageType: 'emplid' };
    let placeHolder = 'Emplid'
    let prompt: PromptObserveType | AllObserveType | DlhrAllObserve | storageEmplid | undefined = {}

    GetStorage({ StorageType: 'emplid' })

    useEffect(() => {
        if (emplid.fieldValue1 !== '') {

            const emmplid: storageEmplid = { emplid: emplid.fieldValue1, name: emplid.fieldValue2 }
            placeHolder = emplid.fieldValue2;
            setEmplidSelect({ fieldValue1: emplid.fieldValue1, fieldValue2: emplid.fieldValue2 })
            Asingstorage(emplidTypeStorage, emmplid)

            navigation.replace(
                'TarjetaObserveScreen',
                { name: emplid.fieldValue2, emplid: emplid.fieldValue1 });
        }
    }, [emplid])



    const EmplidLoad = async () => {
        const emplidStorage = await GetStorage({ StorageType: 'emplid' })




        function isPromptObserve(object: any): object is storageEmplid {
            return 'emplid' in object;
        }

        if (emplidStorage !== null) {
            if (isPromptObserve(emplidStorage)) {


                setemplid({
                    fieldValue1: emplidStorage.emplid,
                    fieldValue2: emplidStorage.name
                })
            }
        }
    }

    useEffect(() => {

        EmplidLoad()
    }, [])

    return (
        <View style={{ alignItems: 'center', flex: 1, backgroundColor:colors.dlsGrayPrimary}}>
            <View style={{position:'absolute',flex:1,opacity:0.2}}>
                <Image
                    source={require('../assets/Logo_DLSNegativo_sf.png')}
                    style={styles.DLSLogoBG}
                />
            </View>

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

                    setemplid={setemplid}

                    promptType={promptType}
                />
            </View>
        </View>
    )
}



