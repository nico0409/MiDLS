import React, { useState, useEffect,useContext } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';

import Animated from "react-native-reanimated";
import { mix, useTransition } from "react-native-redash/src/v1/";

import Chevron from "./Chevron";
import { ListItem } from "./ListItem";

import { MeuItemType, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../../interfaces/prompInterfaces';
import { Prompt } from '../Prompt';
import { PickerSelect } from '../PickerSelect';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../../Themes/DlsTheme";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CustomSwitchObserve } from '../CustomSwitchObserve';
import CheckBox from "@react-native-community/checkbox";
import { InputModal } from "../InputModal";
import { QuestionsCmp } from "../Questions";
import { ScrollView } from "react-native-gesture-handler";
import { onChange } from 'react-native-reanimated';
import { Rulegold } from '../Rulegold';
import { AuthContext } from "../../context/formContext/AuthContext";



const { interpolateNode } = Animated;

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
  MeuItemType: MeuItemType
  form: M38GetCompIntfcDLHRTAOBSERVCIResponse
  onChange: (value: string, field: keyof M38GetCompIntfcDLHRTAOBSERVCIResponse) => void
  scrollViewRef?: React.RefObject<ScrollView>
}

export default ({ form, onChange, list, MeuItemType, scrollViewRef }: ListProps) => {



  const dateInit: string = form["m38:DL_IDENTIF_DT"] ? form["m38:DL_IDENTIF_DT"] : new Date().toISOString().split('T')[0]
  const LIST_ITEM_HEIGHT = 750;
  const { interpolateNode } = Animated;
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {emplidSelect} = useContext(AuthContext)
  const height = mix(transition, 0, LIST_ITEM_HEIGHT * 1);
  const bottomRadius = interpolateNode(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const [date, setDate] = useState(form["m38:DL_IDENTIF_DT"]);

  const handleConfirm = (date: Date) => {

    hideDatePicker();
    setDate(date.toISOString().split('T')[0]);
    /*onChange(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(), 'm38:DL_IDENTIF_DT'); */
    onChange(date.toISOString().split('T')[0], 'm38:DL_IDENTIF_DT');

  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  useEffect(() => {
    if (form !== undefined)
      setToggleCheckBox(form["m38:DL_ADESTACAR"] === 'Y' ? true : false)
  }, [])

  const scrollto = () => {
    switch (MeuItemType.MeuItemType) {
      case 'Registro':
        scrollViewRef?.current?.scrollTo({ y: 40, animated: true })
        break;
      case 'Comentarios':
        scrollViewRef?.current?.scrollTo({ y: 140, animated: true })
        break;
      case 'Preguntas':
        scrollViewRef?.current?.scrollTo({ y: 270, animated: true })
        break;
      case 'ReglasOro':
        scrollViewRef?.current?.scrollTo({ y: 390, animated: true })
        break;

    }
  }



  return (
    <>
      <TouchableWithoutFeedback onPress={() => { setOpen((prev) => !prev), scrollto() }}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <Text style={styles.title}>{list.name}</Text>
          <Chevron {...{ transition }} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        <View
          style={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            height: LIST_ITEM_HEIGHT, width: 350,

          }}
        >
          {MeuItemType.MeuItemType === 'Registro' && (
            <View style={{ /* left: '2%' */ }}>

              <PickerSelect
                form={form}
                placeholder="Unidad de negocio"
                type="DLHR_EMPL_BUSSINES_UNIT"
                onChange={onChange}
                emplid={emplidSelect} 
              />

              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ color: colors.dlsTextwhite, fontSize: 20 }}>{date}</Text>
                <TouchableOpacity
                  onPress={showDatePicker}>
                  <Icon name="calendar" size={30} color={colors.dlsYellowSecondary} />
                </TouchableOpacity>
              </View>
              <PickerSelect
                form={form}
                placeholder="Origen"
                type="DLHR_ORIGEN"
                onChange={onChange} />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_EQUIP_TBL' }}
              />
              <PickerSelect
                form={form}
                placeholder="Turno"
                type="DLHR_TURNO"
                onChange={onChange} />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_CUSTOMER' }}
              />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_SECTOR' }}
              />

              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_OBSERVE_EMPLID' }}
              />
              <PickerSelect
                form={form}
                placeholder="Puesto"
                type={"DLHR_PUESTO"}
                onChange={onChange} />
            </View>
          )}
          {MeuItemType.MeuItemType === 'Comentarios' && (
            <View style={{/* alignItems:'center' */}}>
            <InputModal
                placeholder={"Descripción del Acto / Condición "}
                textSelect={""}
                type={'DL_DESCACTO'}
                onChange={onChange}
                form={form}
              />
              <InputModal
                placeholder={"Acción para evitar reiteración"}
                textSelect={"gtyty"}
                type={'DL_ACCEVITREIT'}
                onChange={onChange}
                form={form}
              />
              <CustomSwitchObserve title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="m38:DL_POLITINTERTAREA" form={form} />
              <CustomSwitchObserve title="Requiere APS de seguimiento" onChange={onChange} switchType="m38:DL_REQAPSSEG" form={form} />
              {form["m38:DL_REQAPSSEG"] === 'Y' && <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_APS' }}
              />}

              <View>
                 
                <CustomSwitchObserve title="Cuasi accidente" onChange={onChange} switchType="m38:DL_CUASIACC" form={form} />
                {form["m38:DL_CUASIACC"] === 'Y' &&
                  <View>
                    <InputModal
                      placeholder={"Más Detalles"}

                      type={'PTLT_DETAILS'}
                      onChange={onChange}
                      form={form}
                    />
                    <InputModal
                      placeholder={"Accion"}

                      type={'DL_ACCION'}
                      onChange={onChange}
                      form={form}
                    />
                  </View>
                }
              </View>
              <View style={{alignItems:'center'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width:'100%' ,justifyContent: 'space-around'}}>
                <Text style={{ color: colors.dlsTextwhite,fontSize:15 }}>A destacar</Text>
                <CheckBox
                tintColors={{true:colors.dlsYellowSecondary ,false:colors.dlsBtonColosWhite}}
               style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => {
                    setToggleCheckBox(newValue);
                    onChange(newValue ? 'Y' : 'N', 'm38:DL_ADESTACAR');
                  }}
                />

              </View>
              </View>
            </View>
          )}
          {MeuItemType.MeuItemType === 'Preguntas' && (
            <>
              <ScrollView>
                <QuestionsCmp form={form} questiontType={{ type: '1' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '2' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '3' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '4' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '5' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '6' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '7' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '8' }} onChange={onChange} />
              </ScrollView>
            </>
          )}
          {MeuItemType.MeuItemType === 'ReglasOro' && (
            <View style={{ marginTop: 10 }}>
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '1' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '2' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '3' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '4' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '5' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '6' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '7' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '8' }} />
              <Rulegold form={form} onChange={onChange} questiontType={{ type: '9' }} />
            </View>
          )}



        </View>
      </Animated.View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => handleConfirm(date)}
        onCancel={hideDatePicker}
        date={new Date(dateInit)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: colors.dlsBotonBlack,
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dlsTextwhite
  },
  items: {
    overflow: "hidden",
  },
});