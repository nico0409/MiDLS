import React, { useRef, useState } from 'react'
import { SafeAreaView, Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../Themes/DlsTheme';
import { CreateObservePageOne } from '../components/CreateObservePageOne';
import { CreateObservePageTwo } from '../components/CreateObservePageTwo';
import { useForm } from '../hooks/UseForm';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';

interface DataTemp {
    namepage: string;
}

interface Props extends StackScreenProps<any, any> { };

const windowWidth = Dimensions.get('window').width;

export const CreateObserveScreen = ({ navigation }: Props) => {

    const carouselRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const [backButton, setBackButton] = useState(false);

    const dataTemp: DataTemp[] = [{
        namepage: 'pagina1',
    },
    {
        namepage: 'pagina2',
    }]

    const firstIndicatorStyles = {
        stepIndicatorSize: 30,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 3,
        separatorStrokeUnfinishedWidth: 3,
        separatorStrokeFinishedWidth: 3,
        currentStepStrokeWidth: 5,
        stepStrokeWidth: 3,
        separatorFinishedColor: '#4aae4f',
        separatorUnFinishedColor: '#a4d4a5',
        stepIndicatorFinishedColor: '#4aae4f',
        stepIndicatorUnFinishedColor: '#a4d4a5',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 15,
        currentStepIndicatorLabelFontSize: 15,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: 12,
        currentStepLabelColor: '#4aae4f',
    };

    const { form, onChange } = useForm<objUseForm>({
        "m38:BUSINESS_UNIT": ' ',
        "m38:DL_NTARJETA": ' ',
        "m38:DL_EQUIPMENT_ID": ' ',
        "m38:DL_IDENTIF_DT": ' ',
        "m38:DL_ORIGEN": ' ',
        "m38:DL_OBSERVADOR": ' ',
        "m38:DL_TURNO": ' ',
        "m38:DL_CUSTOMER_ID": ' ',
        "m38:DL_SECTOR_ID": ' ',
        "m38:DL_PUESTO": ' ',
        "m38:DL_ADESTACAR": ' ',
        "m38:DL_POLITINTERTAREA": ' ',
        "m38:DL_REQAPSSEG": ' ',
        "m38:DL_CUASIACC": ' ',
        "m38:DL_NUM_APS": ' ',
        "m38:DL_RESPSEGAPS": ' ',
        "m38:DL_EQPROTPER": ' ',
        "m38:DL_PROCTRAB": ' ',
        "m38:DL_EQYHERR": ' ',
        "m38:DL_REACCPERS": ' ',
        "m38:DL_POSIPERS": ' ',
        "m38:DL_CONTYPER": ' ',
        "m38:DL_ORDYLIMPIE": ' ',
        "m38:DL_MEDIOAMB": ' ',
        "m38:DL_ACCION": ' ',
        "m38:PTLT_DETAILS": ' ',
        "m38:DL_DESCACTO": ' ',
        "m38:DL_ACCEVITREIT": ' ',
        /* Regla de oro */
        "m38:DL_SEG_VIAL": ' ',
        "m38:DL_TRBJ_ALT": ' ',
        "m38:DL_LN_FUEGO": ' ',
        "m38:DL_ESPAC_CONFIN": ' ',
        "m38:DL_HER_EQUIP": ' ',
        "m38:DL_AIS_ENERG": ' ',
        "m38:DL_OP_IZADO": ' ',
        "m38:DL_PERM_TRABAJO": ' ',
        "m38:DL_MAN_CAMBIO": ' ',
        "m38:CREATEDTTM": ' ',
        "m38:CREATEOPRID": ' ',
        "m38:LASTUPDDTTM": ' ',
        "m38:LASTUPDOPRID": ' '
      })
    console.log("form: ");
    console.log(form);

    const renderItem = (item: DataTemp, index: number) => {
        return (
            <>
                {index === 0 ?
                    <CreateObservePageOne form={form} onChange={onChange} />
                    :
                    <CreateObservePageTwo form={form} onChange={onChange} />
                }
            </>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

                <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Icon name="chevron-back-outline" size={40} color={colors.dlsYellowSecondary} />
                    </TouchableOpacity>

                </View>

                <View style={{ paddingBottom: 10, marginHorizontal: 20 }}>
                    <StepIndicator
                        stepCount={5}
                        customStyles={firstIndicatorStyles}
                        currentPosition={activeIndex}
                        labels={['Paso 1', 'Paso 2']}
                    /* renderLabel={renderLabel} */
                    /* onPress={onStepPress} */
                    />
                </View>

                <Carousel
                    data={dataTemp}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    scrollEnabled={false}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth}
                    ref={carouselRef}
                    onSnapToItem={(index) => {
                        setActiveIndex(index)
                    }}
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: (!backButton ? 'flex-end' : 'center')
                }}>

                    {backButton &&
                        <TouchableOpacity
                            style={styles.prevPage}
                            onPress={() => {
                                setBackButton(false);
                                // @ts-ignore
                                carouselRef.current.snapToPrev();
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>Anterior</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        style={styles.nextPage}
                        onPress={() => {
                            if (activeIndex === 1) {
                                navigation.navigate('CreateObserveQuestionsPage');
                            } else {
                                setBackButton(true);
                                // @ts-ignore
                                carouselRef.current.snapToNext();
                            }
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>Siguiente</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    prevPage: {
        height: 70,
        width: windowWidth * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextPage: {
        height: 70,
        width: windowWidth * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})