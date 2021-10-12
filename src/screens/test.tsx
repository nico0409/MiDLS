import React, { useState, useEffect } from 'react'

/* import {MultipleChoice} from 'react-native-multiple-choice-picker' ; */
import { FlatlistPrompt } from '../components/FlatlistPrompt'
import { Fields, StorageTypes, PromptObserveType, AllObserveType, DlhrAllObserve, PromptObserve, DlhrEquipTbl, promptType } from '../interfaces/prompInterfaces';
import { GetStorage } from '../components/Storage';
import { GetPromptArray } from '../components/GetPromptArrayy';
import { Prompt } from '../components/Prompt';
import Accordion from '../components/AcordionList';
import RNSingleSelect, {
    ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";

import {  StatusBar, SafeAreaView, Dimensions, View } from "react-native";
import { height } from '../../../../can-it-be-done-in-react-native-master/src/Menu/Content';
import Wallet from '../components/Wallet';
import { EditObvservCardScreen } from './EditObvservCardScreen';




/* const { width: ScreenWidth } = Dimensions.get("window");

const staticData: Array<ISingleSelectDataType> = [
  {
    id: 0,
    value: "Euismod Justo",
    imageSource: require("../assets/money.png"),
  },
  {
    id: 1,
    value: "Risus Venenatis",
    imageSource: require("../assets/beer.png"),
  },
  {
    id: 2,
    value: "Vestibulum Ullamcorper",
    imageSource: require("../assets/party.png"),
  },
  {
    id: 3,
    value: "Lorem Nibh",
    imageSource: require("../assets/food-and-restaurant.png"),
  },
  {
    id: 4,
    value: "Ligula Amet",
    imageSource: require("../assets/guitar.png"),
  },
]; */

 
const fruits = ["Apples", "Oranges", "Pears"];
export const testobserve = () => {

  const [friuts, setfriuts] = useState('')
    /*  const [emplid, setemplid] = useState({ fieldValue1: '', fieldValue2: '' })

    const Fieldemplid: Fields = { equipo: 'DL_EQUIPEMENT_ID' }
    const Fieldnombre: Fields = { equipo: 'DESCR' } 
    
     const promptType: promptType = { type: 'DLHR_EQUIP_TBL' }
    const { PromptObArray } = GetPromptArray(promptType)  */
    /*  const empleados = PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID }); */
   /*  const staticData: Array<ISingleSelectDataType> = [
        { id: 0, value: "Euismod Justo" },
        { id: 1, value: "Risus Venenatis" },
        { id: 2, value: "Vestibulum Ullamcorper" },
        { id: 3, value: "Lorem Nibh" },
        { id: 4, value: "Ligula Amet" },
    ]; */
  /*   const [dynamicData, setDynamicData] = React.useState<
    Array<ISingleSelectDataType>
  >([]);

  React.useEffect(() => {
    setTimeout(() => {
      setDynamicData(staticData);
    }, 2000);
  }); */
    return (
        <View style={{ flex: 1 }}>
            {/*  <Prompt
                data={PromptObArray}
                placeHolder={'Empleado'}
                field1={Fieldemplid}
                field2={Fieldnombre}
                setValueSelect={setemplid}
                promptType={promptType}
            />  */}
            {/* <Accordion/> */}
           {/*  <RNSingleSelect
                data={staticData}
                darkMode
                placeholder='Unidad de negocio'
                spinnerType='FadingCircleAlt'
                onSelect={(selectedItem: ISingleSelectDataType) =>
                    console.log("SelectedItem: ", selectedItem)

                }
            /> */}
            {/*  <StatusBar barStyle="light-content" /> */}
     {/*  <SafeAreaView
        style={{
          height:200,
          backgroundColor: "red",
          // backgroundColor: "#eceef3",
          alignItems: "center",
          
        }}
      >
        <View
          style={{
            shadowRadius: 12,
            shadowOpacity: 0.1,
            shadowColor: "#757575",
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}
        >
          <RNSingleSelect
            darkMode
            data={dynamicData}
            width={ScreenWidth * 0.9}
            searchEnabled={false}
            menuBarContainerWidth={ScreenWidth * 0.9}
            onSelect={(selectedItem: ISingleSelectDataType) =>
              console.log("SelectedItem: ", selectedItem)
            }
          />
        </View>
      </SafeAreaView> */}
     {/*  <Wallet/> */}
    {/*  <EditObvservCardScreen />  */}
   {/*  <MultipleChoice
  direction={'column'}
  choices={['Football', 'Badminton', 'Basketball', 'Tennis']}/> */}
        </View>
    )
}
