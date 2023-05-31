import React, { useRef, useState, useContext, useEffect } from 'react'
import { SafeAreaView, Dimensions, View, Text, TouchableOpacity, StyleSheet, Platform, ToastAndroid, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../Themes/DlsTheme';
import { CreateObservePageOne } from '../components/CreateObservePageOne';
import { CreateObservePageTwo } from '../components/CreateObservePageTwo';
import { initialObsFormData } from '../data/initialObsFormData';
import { stepIndicatorStyles } from '../data/stepIndicatorStyles';
import { AuthContext } from '../context/formContext/AuthContext';
import { initialObsCardDescr } from '../data/initialObsCardDescr';
import moment from 'moment';

interface DataTemp {
    namepage: string;
}

interface Props extends StackScreenProps<any, any> { };

const windowWidth = Dimensions.get('window').width;

export const CreateObserveScreen = ({ navigation }: Props) => {

    const { form, onChange, emplidSelect, setCardDescr, setFormValue } = useContext(AuthContext);

    const carouselRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const [backButton, setBackButton] = useState(false);

    const dataTemp: DataTemp[] = [{
        namepage: 'pagina1',
    },
    {
        namepage: 'pagina2',
    }]

    //states de validacion
    const [busunitErrorAnim, setBusunitErrorAnim] = useState(false);
    const [origenErrorAnim, setOrigenErrorAnim] = useState(false);
    const [turnoErrorAnim, setTurnoErrorAnim] = useState(false);
    const [equipErrorAnim, setEquipErrorAnim] = useState(false);
    const [clientesErrorAnim, setClientesErrorAnim] = useState(false);
    const [sectorErrorAnim, setSectorErrorAnim] = useState(false);
    const [poliInterTareaErrorAnim, setPoliInterTareaErrorAnim] = useState(false);
    const [cuasiAccErrorAnim,setCuasiAccErrorAnim] = useState(false);
    const [reqApsErrorAnim,setReqApsErrorAnim] = useState(false);
    
    const showErrorMessage = () => {
        const msg = "Para continuar debe ingresar datos en los campos resaltados en rojo.";
                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravityAndOffset(msg,
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50)
                } else {
                    Alert.alert(msg);
                }
    }

    const nextButton = () => {
        if (activeIndex === 1) {

            !form["m38:DL_POLITINTERTAREA"] && setPoliInterTareaErrorAnim(true);
            !form["m38:DL_CUASIACC"] && setCuasiAccErrorAnim(true);
            !form["m38:DL_REQAPSSEG"] && setReqApsErrorAnim(true);

            if (!form["m38:DL_POLITINTERTAREA"] || !form["m38:DL_CUASIACC"] || !form["m38:DL_REQAPSSEG"]){
                showErrorMessage();
            }else{
                navigation.navigate('CreateObserveQuestionsPage');
            }
        } else {

            !form["m38:BUSINESS_UNIT"] && setBusunitErrorAnim(true);
            !form["m38:DL_ORIGEN"] && setOrigenErrorAnim(true);
            !form["m38:DL_TURNO"] && setTurnoErrorAnim(true);
            !form["m38:DL_EQUIPMENT_ID"] && setEquipErrorAnim(true);
            !form["m38:DL_CUSTOMER_ID"] && setClientesErrorAnim(true);
            !form["m38:DL_SECTOR_ID"] && setSectorErrorAnim(true);

            if (!form["m38:BUSINESS_UNIT"] || !form["m38:DL_ORIGEN"] || !form["m38:DL_TURNO"] || !form["m38:DL_EQUIPMENT_ID"] || !form["m38:DL_CUSTOMER_ID"] || !form["m38:DL_SECTOR_ID"]) {
                showErrorMessage();
            } else {
                setBackButton(true);
                // @ts-ignore
                carouselRef.current.snapToNext();
            }
        }
    }

    const renderItem = (item: DataTemp, index: number) => {
        return (
            <>
                {index === 0 ?
                    <CreateObservePageOne
                        form={form}
                        onChange={onChange}
                        busunitErrorAnim={busunitErrorAnim}
                        origenErrorAnim={origenErrorAnim}
                        turnoErrorAnim={turnoErrorAnim}
                        equipErrorAnim={equipErrorAnim}
                        clientesErrorAnim={clientesErrorAnim}
                        sectorErrorAnim={sectorErrorAnim}
                    />
                    :
                    <CreateObservePageTwo form={form} onChange={onChange} poliInterTareaErrorAnim={poliInterTareaErrorAnim} cuasiAccErrorAnim={cuasiAccErrorAnim} reqApsErrorAnim={reqApsErrorAnim}/>
                }
            </>
        )
    }

    useEffect(() => {
        setCardDescr({ ...initialObsCardDescr, ...{ DL_OBSERVADOR: emplidSelect.fieldValue1,DL_IDENTIF_DT: moment().format('YYYY-MM-DD')} })
        setFormValue({ ...initialObsFormData, ...{ "m38:DL_OBSERVADOR": emplidSelect.fieldValue1,"m38:DL_IDENTIF_DT": moment().format('YYYY-MM-DD') } })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

                <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => {
                            /* navigation.replace('TarjetaObserveScreen',{name:emplidSelect.fieldValue2,emplid:emplidSelect.fieldValue1}) */
                            if (activeIndex > 0) {
                                setBackButton(false);
                                // @ts-ignore
                                carouselRef.current.snapToPrev();
                            } else {
                                navigation.pop();
                            }
                        }}
                    >
                        <Icon name="chevron-back-outline" size={40} color={colors.dlsYellowSecondary} />
                    </TouchableOpacity>

                </View>

                <View style={{ paddingBottom: 10, marginHorizontal: 20 }}>
                    <StepIndicator
                        stepCount={5}
                        customStyles={stepIndicatorStyles}
                        currentPosition={activeIndex}
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
                        onPress={nextButton}
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