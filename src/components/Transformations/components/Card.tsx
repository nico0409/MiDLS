import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DlhrAllObserve } from '../../../interfaces/prompInterfaces';
import { colors } from "../../../Themes/DlsTheme";


const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.9;
export const CARD_HEIGHT = CARD_WIDTH * ratio;


interface CardProps {
  setTerm?: (string: string) => void
  index: number;
  item: any;
}

export default ({ setTerm, item, index }: CardProps) => {

  const navigation = useNavigation();
  const tarjeta: DlhrAllObserve = { ...item }
  return (
    <TouchableOpacity

      activeOpacity={0.9}
    /* onPress={
      () => (navigation.navigate('EditObvservCardScreen',
        {
          busineesUnit: tarjeta.BUSINESS_UNIT,
          IdentifDt: tarjeta.DL_IDENTIF_DT,
          Ntarjeta: tarjeta.NroTarjeta
        }), setTerm !== undefined ? setTerm(''): {})
    } */
    >
      <View style={{
        ...styles.card,
        backgroundColor: index % 2 === 0 ? colors.dlsYellowSecondary : colors.dlsBluePrimary
      }}>
        {/*  <Backgrond srcImg="../assets/collage50pn.png" /> */}
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Text style={styles.name}>
            {tarjeta.BUSINES_DESCR}
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>

          <Text style={styles.name}>
            {tarjeta.ID_EQUIPO_DESCR}
          </Text>
        </View>
        <View style={{ marginTop: 3 }}>
          <Text style={styles.name}>
            {tarjeta.TURNO_DESCR}
          </Text>
        </View>


        <View style={{ marginTop: 3 }}>
          <Text style={styles.name}>
            Tarjeta:{tarjeta.NroTarjeta}
          </Text>
        </View>
        <View style={{ marginTop: 3 }}>
          <Text style={styles.name}>
            {tarjeta.DL_IDENTIF_DT}
          </Text>
        </View>
      </View>
      <View style={styles.pokebolaContainer}>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />
      </View>
    </TouchableOpacity>
  )

};
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    paddingHorizontal: 10,

    borderRadius: 20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,



  },
  name: {
    color: colors.dlsTextwhite,
    fontSize: 20,
    // fontWeight: 'bold',


  }
  , pokebolaContainer: {


    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5
  }, pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25


  },

});