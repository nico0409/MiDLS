import React, { useState, useEffect, useContext } from "react";
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import Animated from "react-native-reanimated";
import { mix, useTransition } from "react-native-redash/src/v1/";

import Chevron from "./Chevron";
import { ListItem } from "./ListItem";

import { MeuItemType, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../../interfaces/prompInterfaces';
import { Prompt } from '../Prompt';
import { PickerSelect } from '../PickerSelect';
import { colors } from "../../Themes/DlsTheme";
import { CustomSwitchObserve } from '../CustomSwitchObserve';
import CheckBox from "@react-native-community/checkbox";
import { InputModal } from "../InputModal";
import { QuestionsCmp } from "../Questions";
import { ScrollView } from "react-native-gesture-handler";
import { Rulegold } from '../Rulegold';
import { AuthContext } from "../../context/formContext/AuthContext";
import { DatePickerSelect } from "../DatePickerSelect";

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
  MeuItemType: MeuItemType;
  form: M38GetCompIntfcDLHRTAOBSERVCIResponse;
  onChange: (value: string, field: keyof M38GetCompIntfcDLHRTAOBSERVCIResponse) => void;
  scrollViewRef?: React.RefObject<ScrollView>;
  cardOffline?: boolean;
}

const { height: heightDimension } = Dimensions.get('window');
//37,5

export default ({ form, onChange, list, MeuItemType, scrollViewRef, cardOffline }: ListProps) => {

  const LIST_ITEM_HEIGHT = heightDimension * 0.68;
  const { interpolateNode } = Animated;
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const { emplidSelect } = useContext(AuthContext);
  const height = mix(transition, 0, LIST_ITEM_HEIGHT * 1);
  const bottomRadius = interpolateNode(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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

  console.log("cardOffline: " + cardOffline);

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
        <ScrollView
          style={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            height: LIST_ITEM_HEIGHT,
            width: '100%',
            alignSelf: 'center'
          }}
        >
          {MeuItemType.MeuItemType === 'Registro' && (
            <View style={{ alignItems: 'center' }}>

              <PickerSelect
                form={form}
                placeholder="Unidad de negocio"
                type="DLHR_EMPL_BUSSINES_UNIT"
                onChange={onChange}
                emplid={emplidSelect.fieldValue1}
                disabled={cardOffline}
              />

              <DatePickerSelect onChange={onChange} disabled={cardOffline} />

              <PickerSelect
                form={form}
                placeholder="Origen"
                type="DLHR_ORIGEN"
                onChange={onChange}
                disabled={cardOffline}
              />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_EQUIP_TBL' }}
                disabled={cardOffline}
              />
              <PickerSelect
                form={form}
                placeholder="Turno"
                type="DLHR_TURNO"
                onChange={onChange}
                disabled={cardOffline}
              />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_CUSTOMER' }}
                disabled={cardOffline}
              />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_SECTOR' }}
                disabled={cardOffline}
              />

              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_OBSERVE_EMPLID' }}
                disabled={cardOffline}
              />
              <PickerSelect
                form={form}
                placeholder="Puesto"
                type={"DLHR_PUESTO"}
                onChange={onChange}
                disabled={cardOffline}
              />
            </View>
          )}
          {MeuItemType.MeuItemType === 'Comentarios' && (
            <View style={{ alignItems: 'center' }}>
              <InputModal
                placeholder={"Descripción del Acto / Condición "}
                textSelect={""}
                type={'DL_DESCACTO'}
                onChange={onChange}
                form={form}
                disabled={cardOffline}
              />
              <InputModal
                placeholder={"Acción para evitar reiteración"}
                textSelect={"gtyty"}
                type={'DL_ACCEVITREIT'}
                onChange={onChange}
                form={form}
                disabled={cardOffline}
              />
              <CustomSwitchObserve
                title="¿Aplico interrupción de tareas?"
                onChange={onChange}
                switchType="m38:DL_POLITINTERTAREA"
                form={form}
                disabled={cardOffline}
              />
              <CustomSwitchObserve
                title="Requiere APS de seguimiento"
                onChange={onChange}
                switchType="m38:DL_REQAPSSEG"
                form={form}
                disabled={cardOffline}
              />
              {form["m38:DL_REQAPSSEG"] === 'Y' &&
                <Prompt
                  form={form}
                  onChange={onChange}
                  promptType={{ type: 'DLHR_APS' }}
                  disabled={cardOffline}
                />
              }

              <CustomSwitchObserve
                title="Cuasi accidente"
                onChange={onChange}
                switchType="m38:DL_CUASIACC"
                form={form}
                disabled={cardOffline}
              />

              {form["m38:DL_CUASIACC"] === 'Y' &&
                <View>
                  <InputModal
                    placeholder={"Más Detalles"}
                    type={'PTLT_DETAILS'}
                    onChange={onChange}
                    form={form}
                    disabled={cardOffline}
                  />
                  <InputModal
                    placeholder={"Accion"}
                    type={'DL_ACCION'}
                    onChange={onChange}
                    form={form}
                    disabled={cardOffline}
                  />
                </View>
              }

              <View
                pointerEvents={cardOffline ? "none" : "auto"}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingHorizontal: 25
                }}>
                <Text style={{ color: colors.dlsTextwhite, fontSize: 15 }}>A destacar</Text>
                <CheckBox
                  tintColors={{ true: (cardOffline ? '#adb5bd' : colors.dlsYellowSecondary), false: colors.dlsBtonColosWhite }}
                  style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => {
                    setToggleCheckBox(newValue);
                    onChange(newValue ? 'Y' : 'N', 'm38:DL_ADESTACAR');
                  }}
                />
              </View>

            </View>
          )}
          {MeuItemType.MeuItemType === 'Preguntas' && (
            <>
              <View pointerEvents={cardOffline ? "none" : "auto"}>
                <QuestionsCmp form={form} questiontType={{ type: '1' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '2' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '3' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '4' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '5' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '6' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '7' }} onChange={onChange} />
                <QuestionsCmp form={form} questiontType={{ type: '8' }} onChange={onChange} />
              </View>
            </>
          )}
          {MeuItemType.MeuItemType === 'ReglasOro' && (
            <View pointerEvents={cardOffline ? "none" : "auto"} style={{ marginTop: 10, marginHorizontal: '15%' }}>
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

        </ScrollView>
      </Animated.View>
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