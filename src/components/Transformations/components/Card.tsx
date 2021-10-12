import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DlhrAllObserve } from '../../../interfaces/prompInterfaces';

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;


export enum Cards {
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
}

interface CardProps {
  setTerm: (string: string) => void
  item:unknown;
}

export default ({ setTerm,item}: CardProps) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity

            activeOpacity={0.9}
            onPress={
                () => (navigation.navigate('EditObvservCardScreen' ,
                    {
                        busineesUnit:item.BUSINESS_UNIT,
                        IdentifDt:item.DL_IDENTIF_DT,
                        Ntarjeta:  item.NroTarjeta
                    } ), setTerm(''))
            }
        >
    <View style={styles.card}>
        <Text style={styles.name}>
           fdfd
        </Text>
    </View>
     </TouchableOpacity>
    )
    
};
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor:'white'
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10
  }
  
});