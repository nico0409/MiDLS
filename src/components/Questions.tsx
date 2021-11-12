import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';

import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";

import { QuestionsData } from '../data/QuestionsData';
import { Questions, questionType } from "../interfaces/QuestionInterfaces";




interface Props {
  form?: M38GetCompIntfcDLHRTAOBSERVCIResponse
  questiontType: questionType
  onChange: (value: string, field: keyof objUseForm) => void;
  darkText?: boolean;
}
export const QuestionsCmp = ({ form, questiontType, onChange, darkText = false }: Props) => {

  let initialValue = 0

  const mapValuesToIndex = (value: string = '') => {
    switch (value) {
      case 'A':
        return 0
      case 'B':
        return 1
      case 'C':
        return 2
      case 'D':
        return 3

      default:
        return 4
    }


  }

  const mapIndexToValue = (index: number) => {

    switch (index) {
      case 0:
        return 'A'
      case 1:
        return 'B'
      case 2:
        return 'C'
      case 3:
        return 'D'

      default:
        return 'A'
    }
  }


  const data = QuestionsData.type.filter(item => {
    if (item.type.type === questiontType.type)
    return item;

  })

  data[0]?.choices.map(element => {
    element.textStyle = {
      textDecorationLine: "none",
      color: darkText ? 'black' : 'white',
      fontSize:18
    }
  });

  if (form !== undefined) {
    initialValue = mapValuesToIndex(form?.[data[0].field]!)
  }
  else {
    initialValue = mapValuesToIndex()
  }


  return (
    <>
      <SafeAreaView>

        <View style={styles.container}>


          <View style={{ /* marginLeft: 32, */ marginTop: 24 }}>
            <Text style={{ color: darkText ? 'black' : 'white', fontWeight: "bold", fontSize: 22 }}>
              {data[0]?.question}
            </Text>
          </View>
          <View
            style={{
              marginTop: 16,
              /* marginHorizontal: 32, */
              justifyContent: "center",
            }}
          >
            <BouncyCheckboxGroup
              data={data[0]?.choices!}
              style={{ flexDirection: "column" }}
              initial={initialValue}
              onChange={(selectedItem: ICheckboxButton) => {
                onChange(mapIndexToValue(selectedItem.id), data[0].field)
              }}
            />
          </View>

        </View>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: '10%'
  }
});
