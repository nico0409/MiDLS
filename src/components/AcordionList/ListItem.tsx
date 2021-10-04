import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DlhrEmplBussinesUnit, MeuItemType, promptType, M38GetCompIntfcDLHRTAOBSERVCIResponse, DlhrBussinesUnit } from '../../interfaces/prompInterfaces';
import { PickerSelect } from "../PickerSelect";
import { GetPromptArray } from '../GetPromptArrayy';


export const LIST_ITEM_HEIGHT = 300;


export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
  MeuItemType: MeuItemType
  observeCard?: M38GetCompIntfcDLHRTAOBSERVCIResponse
}

export default ({ item, isLast, MeuItemType, observeCard }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;

  let businessUSelect: DlhrBussinesUnit | undefined = { UNIDAD_DE_NEGOCIO: '', DESCR: '' }
  let businessUARRAY: { label: string, value: string }[] = [{ label: '', value: '' }]
  const deportes = [
    { label: 'Football', value: 'football' },
    { label: 'Baseball', value: 'baseball' },
    { label: 'Hockey', value: 'hockey' },
    { label: 'Basket', value: 'basket' }, 
  ]

  switch (MeuItemType.MeuItemType) {
    case 'Registro':
      const promptType: promptType = { type: 'DLHR_EMPL_BUSSINES_UNIT' }
      const { PromptObArray } = GetPromptArray(promptType)
      const busineesUEArray: DlhrEmplBussinesUnit[] = PromptObArray;

      if (busineesUEArray[0] !== undefined) {


        const busineesUArray = busineesUEArray.filter(
          item =>
            item.DLHR_OBSERVE_EMPLID?.EMPLID == 'C020513')[0].
          DLHR_BUSSINES_UNIT
        if (busineesUArray !== undefined) {
          const businessUArrayC = Array.isArray(busineesUArray) ? busineesUArray : [busineesUArray]


          businessUSelect = businessUArrayC.find(item => item!.UNIDAD_DE_NEGOCIO === observeCard?.["m38:BUSINESS_UNIT"])

          businessUARRAY = businessUArrayC!.map((item, index) => { return { label: item.DESCR, value: item.DESCR} })

          console.log(businessUARRAY);

        }







      }





      break;
    case 'Comentarios':

      break;

    case 'Preguntas':

      break;

    case 'ReglasOro':

      break;

    default:
      break;
  }
  return (
    <View>
      {(MeuItemType.MeuItemType === 'Registro') &&
        <View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <View style={{ height: 200, width: 300 }}>
            <PickerSelect /*  placeholder={ "Unidad de Negocio"} item={deportes} */ />
          </View>

        </View>
      }
      {(MeuItemType.MeuItemType === 'Comentarios') &&
        <View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <View style={{ height: 40, width: 300 }}>
            {/*  <PickerSelect placeholder="Unidad de negocio" item={deportes} /> */}
          </View>

        </View>
      }
      {(MeuItemType.MeuItemType === 'Preguntas') &&
        <View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <View style={{ height: 40, width: 300 }}>
            {/*          <PickerSelect placeholder="Unidad de negocio" item={deportes} /> */}
          </View>

        </View>
      }
      {(MeuItemType.MeuItemType === 'ReglasOro') &&
        <View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <View style={{ height: 40, width: 300 }}>
            {/* <PickerSelect placeholder="Unidad de negocio" item={deportes} /> */}
          </View>

        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f4f4f6",
    height: LIST_ITEM_HEIGHT,
  },
  name: {
    fontSize: 16,
  },
  pointsContainer: {
    borderRadius: 8,
    backgroundColor: "#44c282",
    padding: 8,
  },
  points: {
    color: "white",
    fontWeight: "bold",
  },
});