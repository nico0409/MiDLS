import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';

import Animated from "react-native-reanimated";
import { mix, useTransition } from "react-native-redash/src/v1/";

import Chevron from "./Chevron";
import Item, { ListItem } from "./ListItem";
import { withTransition, onGestureEvent } from 'react-native-redash/src/v1';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import { set, eq, cond, not, useCode, Value } from 'react-native-reanimated';
import { MeuItemType, M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../../interfaces/prompInterfaces';
import { Prompt } from '../Prompt';
import { PickerSelect } from '../PickerSelect';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../../Themes/DlsTheme";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CustomSwitchObserve } from '../CustomSwitchObserve';
import CheckBox from "@react-native-community/checkbox";
import { InputModal } from "../InputModal";

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
}

export default ({ form, onChange, list, MeuItemType }: ListProps) => {

  const LIST_ITEM_HEIGHT = 500;
  const { interpolateNode } = Animated;
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
  const [date, setDate] = useState('--/--/----');

  const handleConfirm = (date: any) => {

    setDate(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
    onChange(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(), 'm38:DL_IDENTIF_DT');
    hideDatePicker();

  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
 
  
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
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
            height: 500, width: 300,
            backgroundColor: 'white'
          }}
        >
          {MeuItemType.MeuItemType === 'Registro' && (
            <>
              <PickerSelect 
              form={form}
              placeholder="Unidad de negocio"
               type="DLHR_EMPL_BUSSINES_UNIT"
                onChange={onChange} 
                />
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{date}</Text>
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
                onChange={onChange}
                promptType={{ type: 'DLHR_EQUIP_TBL' }}
              />
              <PickerSelect 
              form={form}
              placeholder="Turno"
               type="DLHR_TURNO" 
               onChange={onChange} />
              <Prompt
                onChange={onChange}
                promptType={{ type: 'DLHR_CUSTOMER' }}
              />
              <Prompt
                onChange={onChange}
                promptType={{ type: 'DLHR_SECTOR' }}
              />

              <Prompt
                onChange={onChange}
                promptType={{ type: 'DLHR_OBSERVE_EMPLID' }}
              />
              <PickerSelect
              form={form}
              placeholder="Puesto"
               type={"DLHR_PUESTO"} 
               onChange={onChange} />
            </>
          )}
          {MeuItemType.MeuItemType === 'Comentarios' && (
            <>
              <CustomSwitchObserve title="¿Aplico interrupción de tareas?" onChange={onChange} switchType="m38:DL_POLITINTERTAREA" />
              <CustomSwitchObserve title="Requiere APS de seguimiento" onChange={onChange} switchType="m38:DL_REQAPSSEG" />
             <View>
              <CustomSwitchObserve title="Cuasi accidente" onChange={onChange} switchType="m38:DL_CUASIACC" />
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
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, width: 100, backgroundColor: 'red' }}>
                <Text>A destacar</Text>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => {
                    setToggleCheckBox(newValue);
                    onChange(newValue ? 'Y' : 'N', 'm38:DL_ADESTACAR');
                  }}
                />
               
              </View>
              <InputModal 
              placeholder={"Descripción del Acto / Condición / Incidente"}
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
            </>
          )}

        </View>
      </Animated.View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
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
  },
  items: {
    overflow: "hidden",
  },
});