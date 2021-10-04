import React from "react";
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, MeuItemType } from '../../interfaces/prompInterfaces';
import { colors } from "../../Themes/DlsTheme";

import List, { List as ListModel } from "./List";





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
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
    { name: "Jacob Mullins", points: "$3.45" },
    { name: "Jesus Lewis", points: "$3.45" },
    { name: "Johnny Marr", points: "$2.56" },
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



interface Props {
  observeCard?: M38GetCompIntfcDLHRTAOBSERVCIResponse
}

export default ({ observeCard }: Props) => {


  const menus: MeuItemType[] = [
    { MeuItemType: 'Registro' },
    { MeuItemType: 'Preguntas' },
    { MeuItemType: 'Comentarios' },
    { MeuItemType: 'ReglasOro' },
  ]


  const { height, width } = useWindowDimensions();


  return (
    
      <View style={{ ...styles.container, height: height }}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{`Tarjeta Número:`}</Text>
          <Text style={styles.title}>{`${observeCard!["m38:DL_NTARJETA"]}`}</Text>
        </View>
        <List {...{ list }} MeuItemType={menus[0]}  observeCard={observeCard}/>
        <List {...{ list: list2 }} MeuItemType={menus[1]}  />
        <List {...{ list: list3 }} MeuItemType={menus[2]} />
        <List {...{ list: list4 }} MeuItemType={menus[3]} /> 

      </View>
    
  );
};
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