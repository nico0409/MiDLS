import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { DlhrAllObserve } from '../../../interfaces/prompInterfaces';
import { colors } from "../../../Themes/DlsTheme";
import { nroTarjetaEmpty } from "../../../data/nroTarjetaEmpty";
import Icon from 'react-native-vector-icons/Ionicons';



const { width ,height} = Dimensions.get("window");
//const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.9;
export const CARD_HEIGHT = (height * 0.3);


interface CardProps {
  setTerm?: (string: string) => void
  index: number;
  item: any;
}

export default ({ setTerm, item, index }: CardProps) => {

  const navigation = useNavigation();
  const tarjeta: DlhrAllObserve = { ...item }

  const bgLgColor = () => {
    if (tarjeta.NroTarjeta?.startsWith(nroTarjetaEmpty)) {
      return ['#d69702', '#FFE100']
    } else {
      return ['#00799B', '#1BE1F7']
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('EditObvservCardScreen',
          {
            busineesUnit: tarjeta.BUSINESS_UNIT,
            IdentifDt: tarjeta.DL_IDENTIF_DT,
            Ntarjeta: tarjeta.NroTarjeta,
            cardOffline: tarjeta.NroTarjeta?.startsWith(nroTarjetaEmpty)
          });
        setTerm !== undefined ? setTerm('') : {}
      }}
    >
      {/* <View style={{
        ...styles.card,
        backgroundColor: index % 2 === 0 ? colors.dlsYellowSecondary : colors.dlsBluePrimary
      }}> */}
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={bgLgColor()} style={styles.card}>

        <View style={[styles.fieldContainer, { marginTop: 10 }]}>
          <Text style={styles.textTitle}>N° Tarjeta:</Text>
          <Text style={styles.textValue}>{tarjeta.NroTarjeta}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.textTitle}>Unidad de negocio</Text>
          <Text style={styles.textValue}>{tarjeta.BUSINES_DESCR}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.fieldContainer}>
            <Text style={styles.textTitle}>Turno</Text>
            <Text style={styles.textValue}>{tarjeta.TURNO_DESCR}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.textTitle}>Fecha Identificación</Text>
            <Text style={styles.textValue}>{tarjeta.DL_IDENTIF_DT}</Text>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.textTitle}>Equipo</Text>
          <Text style={styles.textValue}>{
            tarjeta.ID_EQUIPO_DESCR?.length! > 18 ?
              tarjeta.ID_EQUIPO_DESCR?.substr(0, 18) + '...'
              :
              tarjeta.ID_EQUIPO_DESCR}
          </Text>
        </View>

      </LinearGradient>
      {/*  </View> */}

      <View style={styles.iconContainer}>
        {tarjeta.NroTarjeta?.startsWith(nroTarjetaEmpty) ?
          <View style={{ paddingRight: 5 }}>
            <Icon name="cloud-offline" size={40} color="white" />
          </View>
          :
          <Icon name="checkmark-circle" size={50} color="white" />
        }
      </View>

    </TouchableOpacity>
  )

};
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    paddingHorizontal: 10,
    borderRadius: 40,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
  },
  fieldContainer: {
    marginTop: 5,
    marginLeft: 30
  },
  textTitle: {
    fontSize: 14,
    color: 'white',
  },
  textValue: {
    color: colors.dlsTextwhite,
    fontSize: 20,
    fontWeight: 'bold',
  }
  , iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    overflow: 'hidden',
  }
});