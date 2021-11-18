import React,{useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { DlhrEmplBussinesUnit, MeuItemType, promptType, M38GetCompIntfcDLHRTAOBSERVCIResponse, DlhrBussinesUnit, Fields } from '../../interfaces/prompInterfaces';
import { PickerSelect } from "../PickerSelect";
import { GetPromptArray } from '../GetPromptArrayy';
import { Prompt } from '../Prompt';
import { onChange } from 'react-native-reanimated';



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
  form: M38GetCompIntfcDLHRTAOBSERVCIResponse
  onChange: (value: string, field: keyof M38GetCompIntfcDLHRTAOBSERVCIResponse) => void
}

export default ({ item, isLast, MeuItemType, form,onChange}: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;

    const promptType: promptType = { type: 'DLHR_CUSTOMER' };
    
  
  
   
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
          {/*   <PickerSelect /*  placeholder={ "Unidad de Negocio"} item={deportes} */}
          <Prompt
                    onChange={onChange}
                    promptType={{ type: 'DLHR_SECTOR' }}
                />
                 <Prompt
                    onChange={onChange}
                    promptType={{ type: 'DLHR_EQUIP_TBL' }}
                />
                  <Prompt
                    onChange={onChange}
                    promptType={{ type: 'DLHR_CUSTOMER' }}
                />
                 <Prompt
                    onChange={onChange}
                    promptType={{ type: 'DLHR_OBSERVE_EMPLID' }}
                /> 
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