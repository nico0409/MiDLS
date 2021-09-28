import React, { useRef, useState } from 'react'
import { SafeAreaView, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../Themes/DlsTheme';

interface DataTemp {
    namepage: string;
    background: string;
}

interface Props extends StackScreenProps<any, any> { };

export const CreateObserveScreen = ({ navigation }: Props) => {

    const carouselRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const windowWidth = Dimensions.get('window').width;

    const dataTemp: DataTemp[] = [{
        namepage: 'pagina1',
        background: 'red'
    },
    {
        namepage: 'pagina2',
        background: 'blue'
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

    const renderItem = (item: DataTemp, index: number) => {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: item.background }}>

                </View>
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
                        stepCount={dataTemp.length}
                        customStyles={firstIndicatorStyles}
                        currentPosition={activeIndex}
                        labels={['Paso 1', 'Paso 2']}
                    /* renderLabel={renderLabel} */
                    /* onPress={onStepPress} */
                    />
                </View>

                {/* <Pagination
                    dotsLength={dataTemp.length}
                    activeDotIndex={activeIndex}
                    containerStyle={{paddingVertical: 10}}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        backgroundColor: colors.dlsYellowSecondary,
                        margin: 0,
                        padding: 0
                    }}
                /> */}

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

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ height: 70, width: windowWidth * 0.5 }}
                        // @ts-ignore
                        onPress={() => { carouselRef.current.snapToPrev() }}
                    >
                        <Text>Anterior</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ height: 70, width: windowWidth * 0.5 }}
                        // @ts-ignore
                        onPress={() => { carouselRef.current.snapToNext() }}
                    >
                        <Text>Siguiente</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}
