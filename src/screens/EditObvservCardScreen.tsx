import React, { useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import Accordion from '../components/AcordionList';

import { useForm } from '../hooks/UseForm';
import { GetOneCard } from '../components/GetOneCard';
import { InterfGetOnesCard, MeuItemType } from '../interfaces/prompInterfaces';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';
import { StackScreenProps } from '@react-navigation/stack';
import { UseOneGetObserve } from '../hooks/UseOneGetObserve';
import { Loading } from '../components/Loading';

import List, { List as ListModel } from "../components/AcordionList/List";
import { colors } from '../Themes/DlsTheme';
import { onChange } from 'react-native-reanimated';
import { Prompt } from '../components/Prompt';
import { ScrollView } from 'react-native-gesture-handler';



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
        { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
        { name: "Jacob Mullins", points: "$3.45" },
        { name: "Jesus Lewis", points: "$3.45" },
        { name: "Johnny Marr", points: "$2.56" },
    ],
};

const list4: ListModel = {
    name: "Reglas de oro",
    items: [
        { name: "Nathaniel Fitzgerald", points: "0" },
        { name: "Lawrence Fullter Fitzgerald", points: "0" },
        { name: "Jacob Mullins", points: "0" },
        { name: "Jesus Lewis", points: "0" },
        { name: "Johnny Marr", points: "0" },
    ],
};
interface Props extends StackScreenProps<RoutstackParams, 'EditObvservCardScreen'> {

}

export const EditObvservCardScreen = ({ navigation, route }: Props) => {


    const { isloading, loadObserveCard, form, onChange,stateSend } = UseOneGetObserve(/* {
        IdentifDt: '2020-05-31',
        busineesUnit: 'CDR', Ntarjeta: '2020-4070-039506'
    }*/  route.params)




    const { height, width } = useWindowDimensions();
    form['m38:DL_NTARJETA']
    /* console.log(form,isloading); */
    const menus: MeuItemType[] = [
        { MeuItemType: 'Registro' },
        { MeuItemType: 'Comentarios' },
        { MeuItemType: 'Preguntas' },
        { MeuItemType: 'ReglasOro' },
    ]


    if (isloading) {
        return (
            <Loading />
        )
    }


    return (

        < View style={{ flex: 1 }}>
            <View style={{ ...styles.container, height: height }}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>{`Tarjeta Número:`}</Text>
                    <Text style={styles.title}>{`${form['m38:DL_NTARJETA']}`}</Text>
                </View>

                <ScrollView >
                    <List {...{ list }} MeuItemType={menus[0]} form={form} onChange={onChange} />
                    <List {...{ list: list2 }} MeuItemType={menus[1]} form={form} onChange={onChange} />
                    <List {...{ list: list3 }} MeuItemType={menus[2]} form={form} onChange={onChange} />
                    <List {...{ list: list4 }} MeuItemType={menus[3]} form={form} onChange={onChange} />
                </ScrollView>
            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dlsGrayPrimary,
        padding: 16,
        /* 
         */
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
});