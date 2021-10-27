import React, { useRef, useState, useContext, useEffect } from 'react'
import { SafeAreaView, Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

interface DataTemp {
    namepage: string;
}

interface Props extends StackScreenProps<any, any> { };

const windowWidth = Dimensions.get('window').width;

export const CreateObserveScreen = ({ navigation }: Props) => {

    const { form, onChange, cardDescr, setCardDescr, setFormValue } = useContext(AuthContext);

    const carouselRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const [backButton, setBackButton] = useState(false);

    const dataTemp: DataTemp[] = [{
        namepage: 'pagina1',
    },
    {
        namepage: 'pagina2',
    }]

    useEffect(() => {
        setCardDescr(initialObsCardDescr)
        setFormValue(initialObsFormData)
    }, [])

    /* const { form, onChange } = useForm<objUseForm>(initialObsFormData); */

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
                        onPress={() => {
                            if (activeIndex === 1) {
                                console.log("form---------------------------------------");
                                console.log(form);
                                
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