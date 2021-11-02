import React, { useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity, Platform, ToastAndroid, Alert } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Chase } from 'react-native-animated-spinkit';

import { M38GetCompIntfcDLHRTAOBSERVCIResponse, MeuItemType } from '../interfaces/prompInterfaces';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';
import { UseOneGetObserve } from '../hooks/UseOneGetObserve';
import List, { List as ListModel } from "../components/AcordionList/List";
import { colors } from '../Themes/DlsTheme';
import { EditObservCard } from '../components/EditObserveCard';

interface Props extends StackScreenProps<RoutstackParams, 'EditObvservCardScreen'> {};

const list: ListModel = {
    name: "Registro",
    items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },

    ],
};

const list2: ListModel = {
    name: "Comentarios",
    items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },

    ],
};

const list3: ListModel = {
    name: "Preguntas",
    items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },

    ],
};

const list4: ListModel = {
    name: "Reglas de oro",
    items: [
        { name: "Nathaniel Fitzgerald", points: "0" },

    ],
};

export const EditObvservCardScreen = ({ navigation, route }: Props) => {

    const { isloading, loadObserveCard, form, onChange, stateSend } = UseOneGetObserve( route.params);

    const [editAble, setEditAble] = useState(false)
    const [initialState, setinitialState] = useState<M38GetCompIntfcDLHRTAOBSERVCIResponse | undefined>()
    const scrollViewRef = useRef<ScrollView>(null)

    useEffect(() => {
        setinitialState(stateSend);
    }, [isloading])

    useEffect(() => {
        if (initialState !== undefined && JSON.stringify(stateSend) !== JSON.stringify(initialState))
            setEditAble(true)
    }, [stateSend])

    const { height, width } = useWindowDimensions();

    form['m38:DL_NTARJETA']
    /* console.log(form,isloading); */

    const menus: MeuItemType[] = [
        { MeuItemType: 'Registro' },
        { MeuItemType: 'Comentarios' },
        { MeuItemType: 'Preguntas' },
        { MeuItemType: 'ReglasOro' },
    ]

    const alertSend = (sended: boolean) => {
        let msg = ''

        if (sended) {
            msg = 'Tarjeta Guardada'
            setEditAble(false)
        } else {
            msg = 'Error en modificacion'
        }
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            Alert.alert(msg);
        }
    }

    return (

        < View style={{ flex: 1 }}>
            <View style={{ ...styles.container, height: height }}>
                <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity
                        onPress={() => { route.params.cardOffline ? navigation.pop(4) : navigation.pop() }}
                    >
                        <Icon name="chevron-back-outline" size={40} color={colors.dlsYellowSecondary} />
                    </TouchableOpacity>

                    {!route.params.cardOffline &&
                        <TouchableOpacity
                            disabled={!editAble}
                            onPress={() => EditObservCard({ form: stateSend!, alertSend })}
                        >
                            <AwesomeIcon name="edit" size={30} color={editAble ? colors.dlsYellowSecondary : colors.dlsBtonColosWhite} />
                        </TouchableOpacity>
                    }

                </View>
                {!isloading ?
                    <>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>{`Tarjeta Número:`}</Text>
                            <Text style={styles.title}>{`${form['m38:DL_NTARJETA']}`}</Text>
                        </View>

                        <ScrollView style={{ marginTop: 30 }} ref={scrollViewRef} >

                            <List {...{ list }} MeuItemType={menus[0]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} />
                            <List {...{ list: list2 }} MeuItemType={menus[1]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} />
                            <List {...{ list: list3 }} MeuItemType={menus[2]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} />
                            <List {...{ list: list4 }} MeuItemType={menus[3]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} />
                        </ScrollView>
                    </>
                    :
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Chase size={48} color="#FFF" />
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dlsGrayPrimary,
        padding: 16
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.dlsTextwhite
    },
});