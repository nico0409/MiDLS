import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { DlhrAllObserve } from '../../../interfaces/prompInterfaces';
import { colors } from "../../../Themes/DlsTheme";
import { nroTarjetaEmpty } from "../../../data/nroTarjetaEmpty";
import Icon from 'react-native-vector-icons/MaterialIcons';



const { width, height } = Dimensions.get("window");
//const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.9;
export const CARD_HEIGHT = (height * 0.32);


interface CardProps {
  setTerm?: (string: string) => void
  index: number;
  item: any;
}

export default ({ setTerm, item, index }: CardProps) => {

  const navigation = useNavigation();
  const tarjeta: DlhrAllObserve = { ...item }

  const bgLgColor = () => {
    /* if (tarjeta.NroTarjeta?.startsWith(nroTarjetaEmpty)) {
      return ['#D67002', '#FFD000']
    } else {
      return ['#00799B', '#1BE1F7']
    } */

    /* if (tarjeta.ERR_TYPE === 'SERVER'||tarjeta.ERR_TYPE ==='NETWORK') {
      return ['#D67002', '#FFD000']
    } else {
      return ['#00799B', '#1BE1F7']
    } */
    if (tarjeta.ERR_TYPE) {
      switch (tarjeta.ERR_TYPE) {
        case 'NETWORK':
          return ['#D67002', '#FFD000'];
          break;
        case 'SERVER':
          return ['#E2302D', '#FF823F'];
          break;
        default:
          return ['#E2302D', '#FF823F'];

      }
    } else {
      return ['#00799B', '#1BE1F7'];
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

        <View >
          <View style={styles.fieldContainer}>
            <Text style={styles.textTitle}>N° Tarjeta:</Text>
            <Text style={styles.textValue}>{tarjeta.NroTarjeta}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.textTitle}>Unidad de negocio</Text>
            <Text style={styles.textValue}>{tarjeta.BUSINES_DESCR}</Text>
          </View>

          {height > 592 ?
            <>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.textTitle}>Turno</Text>
                  <Text style={styles.textValue}>{tarjeta.TURNO_DESCR}</Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.textTitle}>Fecha Identificación</Text>
                  <Text style={styles.textValue}>{
                    tarjeta.DL_IDENTIF_DT!.substring(8, 10) + "/" +
                    tarjeta.DL_IDENTIF_DT!.substring(5, 7) + "/" +
                    tarjeta.DL_IDENTIF_DT!.substring(0, 4)
                  }
                  </Text>
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
            </>
            :
            <>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.textTitle}>Equipo</Text>
                  <Text style={styles.textValue}>{
                    height <= 535 ?
                      tarjeta.ID_EQUIPO_DESCR?.length! > 9 ?
                        tarjeta.ID_EQUIPO_DESCR?.substr(0, 9) + '...'
                        :
                        tarjeta.ID_EQUIPO_DESCR
                      :
                      tarjeta.ID_EQUIPO_DESCR?.length! > 10 ?
                        tarjeta.ID_EQUIPO_DESCR?.substr(0, 10) + '...'
                        :
                        tarjeta.ID_EQUIPO_DESCR
                  }
                  </Text>
                </View>

                <View style={{
                  marginTop: 5,
                  marginLeft: 15
                }}>
                  <Text style={styles.textTitle}>Fecha Identificación</Text>
                  <Text style={styles.textValue}>{
                    tarjeta.DL_IDENTIF_DT!.substring(8, 10) + "/" +
                    tarjeta.DL_IDENTIF_DT!.substring(5, 7) + "/" +
                    tarjeta.DL_IDENTIF_DT!.substring(0, 4)
                  }
                  </Text>
                </View>

              </View>

            </>
          }


        </View>
      </LinearGradient>
      {/*  </View> */}

      <View style={[styles.iconContainer, height > 592 ? { bottom: 10 } : { top: 10 }]}>
        {tarjeta.ERR_TYPE ?

          tarjeta.ERR_TYPE === 'NETWORK' ?
            <View style={{ paddingRight: 5 }}>
              <Icon name="wifi-off" size={40} color="white" />
            </View>
            :
            <View style={{ paddingRight: 5 }}>
              <Icon name="cloud-off" size={40} color="white" />
            </View>
          :
          <Icon name="check-circle-outline" size={50} color="white" />
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
    justifyContent: 'center',
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
    right: 10,
    overflow: 'hidden',
  }
});