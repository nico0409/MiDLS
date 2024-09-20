import React, { useState, useEffect, useContext, memo, useRef } from "react";
import { Dimensions, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import Chevron from "./Chevron";
import { ListItem } from "./ListItem";

import { MeuItemType, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../../interfaces/prompInterfaces';
import { Prompt } from '../Prompt';
import { PickerSelect } from '../PickerSelect';
import { colors } from "../../Themes/DlsTheme";
import CheckBox from "@react-native-community/checkbox";
import { InputModal } from "../InputModal";
import { QuestionsCmp } from "../Questions";
import { ScrollView } from "react-native-gesture-handler";
import { Rulegold } from '../Rulegold';
import { AuthContext } from "../../context/formContext/AuthContext";
import { DatePickerSelect } from "../DatePickerSelect";
import { RalationchipBtn } from "../RalationchipBtn";

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
  displayOnly?: boolean;
}

const { height: heightDimension } = Dimensions.get('window');
//37,5

export default memo(({ form, onChange, list, MeuItemType, scrollViewRef, displayOnly }: ListProps) => {

  const LIST_ITEM_HEIGHT = heightDimension * 0.68;
  //const { interpolateNode } = Animated;
  //const [open, setOpen] = useState(false);
  //const transition = useTiming(!open);
  const { emplidSelect } = useContext(AuthContext);
  const height = useSharedValue(0);
  const rotateChevronValue = useSharedValue(0);
  //const height = mix(transition.value, 0, LIST_ITEM_HEIGHT * 1);
  /* const bottomRadius = interpolate(transition.value,
    [0, 16 / 420],
    [8, 0]
  ); */

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    if (form !== undefined)
      setToggleCheckBox(form["m38:DL_ADESTACAR"] === 'Y' ? true : false)
  }, [])

  const setTransitionOpen = () => {
    if (height.value === 0){height.value = LIST_ITEM_HEIGHT}
    if (height.value === LIST_ITEM_HEIGHT){height.value = 0}
    if (rotateChevronValue.value ===0){rotateChevronValue.value = Math.PI}
    if (rotateChevronValue.value ===Math.PI){rotateChevronValue.value = 0}
    console.log("rotateChevronValue.value1",rotateChevronValue.value  );
    

  }


  const scrollto = () => {
    setTransitionOpen();
    switch (MeuItemType.MeuItemType) {
      case 'Registro':
        setTimeout(() => {
          scrollViewRef?.current?.scrollTo({ y: heightDimension <= 593 ? heightDimension <= 534 ? 0 : 20 : 40, animated: true })
        }, 100);
        break;
      case 'Comentarios':
        setTimeout(() => {
          scrollViewRef?.current?.scrollTo({ y: heightDimension <= 593 ? heightDimension <= 534 ? 100 : 120 : 160, animated: true })
        }, 100);
        break;
      case 'Preguntas':
        setTimeout(() => {
          scrollViewRef?.current?.scrollTo({ y: heightDimension <= 593 ? heightDimension <= 534 ? 200 : 240 : 300, animated: true })
        }, 100);
        break;
      case 'ReglasOro':
        setTimeout(() => {
          scrollViewRef?.current?.scrollTo({ y: heightDimension <= 593 ? heightDimension <= 534 ? 300 : 340 : 420, animated: true })
        }, 100);
        break;
    }
  }
  const heightListOpen = useAnimatedStyle(() => {
    return {
      height: withSpring(height.value,{
        mass: 1,
        damping: 100,
        stiffness: 250,})
    };
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {
        console.log("se toca boton chevron------");

        scrollto();
      }}>
        <Animated.View
          style={[
            styles.container,
            /* {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            }, */
          ]}
        >
          <Text style={styles.title}>{list.name}</Text>
          <Chevron rotateChevronValue={rotateChevronValue} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.items, heightListOpen]}>
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
            <View style={{ alignItems: 'center', marginBottom: 50 }}>

              <PickerSelect
                form={form}
                placeholder="Unidad de negocio"
                type="DLHR_EMPL_BUSSINES_UNIT"
                onChange={onChange}
                emplid={emplidSelect.fieldValue1}
                disabled={true}
              />

              <DatePickerSelect
                form={form}
                onChange={onChange}
                disabled={displayOnly}
              />

              <PickerSelect
                form={form}
                placeholder="Origen"
                type="DLHR_ORIGEN"
                onChange={onChange}
                disabled={displayOnly}
              />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_EQUIP_TBL' }}
                disabled={displayOnly}
              />
              <PickerSelect
                form={form}
                placeholder="Turno"
                type="DLHR_TURNO"
                onChange={onChange}
                disabled={displayOnly}
              />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_CUSTOMER' }}
                disabled={displayOnly}
              />
              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_SECTOR' }}
                disabled={displayOnly}
              />

              <Prompt
                form={form}
                onChange={onChange}
                promptType={{ type: 'DLHR_OBSERVE_EMPLID' }}
                disabled={true}
              />
              <PickerSelect
                form={form}
                placeholder="Puesto"
                type={"DLHR_PUESTO"}
                onChange={onChange}
                disabled={displayOnly}
              />
            </View>
          )}
          {MeuItemType.MeuItemType === 'Comentarios' && (
            <ScrollView>
              <View style={{ alignItems: 'center' }}>
                <InputModal
                  placeholder={"Descripción del Acto / Condición "}
                  textSelect={""}
                  type={'DL_DESCACTO'}
                  onChange={onChange}
                  form={form}
                  disabled={displayOnly}
                />
                <InputModal
                  placeholder={"Acción para evitar reiteración"}
                  textSelect={"gtyty"}
                  type={'DL_ACCEVITREIT'}
                  onChange={onChange}
                  form={form}
                  disabled={displayOnly}
                />

                <PickerSelect
                  form={form}
                  placeholder="¿Aplico interrupción de tareas?"
                  type="DLHR_POLITINTERTAREA"
                  onChange={onChange}
                  disabled={displayOnly}
                />

                <PickerSelect
                  form={form}
                  placeholder="Cuasi accidente"
                  type="DLHR_CUASIACC"
                  onChange={onChange}
                  disabled={displayOnly}
                />

                {form["m38:DL_CUASIACC"] === 'Y' &&
                  <View>
                    <InputModal
                      placeholder={"Más Detalles"}
                      type={'PTLT_DETAILS'}
                      onChange={onChange}
                      form={form}
                      disabled={displayOnly}
                    />
                    <InputModal
                      placeholder={"Accion"}
                      type={'DL_ACCION'}
                      onChange={onChange}
                      form={form}
                      disabled={displayOnly}
                    />
                  </View>
                }

                <View
                  pointerEvents={displayOnly ? "none" : "auto"}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30,
                    marginVertical: Platform.OS === 'ios' ? 10 : 0
                  }}>
                  <Text style={{ color: colors.dlsTextwhite, fontSize: 15 }}>A destacar</Text>
                  <CheckBox
                    tintColors={{ true: (displayOnly ? '#adb5bd' : colors.dlsYellowSecondary), false: colors.dlsBtonColosWhite }}
                    style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => {
                      setToggleCheckBox(newValue);
                      onChange(newValue ? 'Y' : 'N', 'm38:DL_ADESTACAR');
                    }}
                  />
                </View>

                <PickerSelect
                  form={form}
                  placeholder="Requiere APS de seguimiento *"
                  type="DLHR_REQAPSSEG"
                  onChange={onChange}
                  disabled={displayOnly}
                />

                {form["m38:DL_REQAPSSEG"] === 'Y' &&
                  <View>

                    <Prompt
                      form={form}
                      onChange={onChange}
                      promptType={{ type: 'DLHR_APS' }}
                      disabled={displayOnly}
                    />

                    <View style={{ marginVertical: 10 }}>
                      <RalationchipBtn form={form} />
                    </View>
                  </View>
                }

                <View style={{ marginHorizontal: 30, marginBottom: 50 }}>
                  <Text style={{ color: 'white' }}>
                    * No es necesario que cargues los datos del número y responsable si no lo conocés. Podés guardar y enviar la tarjeta de todos modos.
                  </Text>
                </View>

              </View>
            </ScrollView>
          )}
          {MeuItemType.MeuItemType === 'Preguntas' && (
            <>
              <View pointerEvents={displayOnly ? "none" : "auto"} style={{ marginBottom: 40 }}>
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
            <View pointerEvents={displayOnly ? "none" : "auto"} style={{ marginTop: 10, marginHorizontal: '15%', marginBottom: 20 }}>
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
});

const styles = StyleSheet.create({
  container: {
    marginTop: heightDimension <= 593 ? heightDimension <= 535 ? 35 : 45 : 60,
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