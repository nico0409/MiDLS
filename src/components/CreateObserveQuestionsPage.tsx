import React, { useState, useRef,useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View, StyleSheet, Animated, useColorScheme, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import { AnimatedCircle } from './AnimatedCircle';
import { objUseForm } from '../interfaces/prompInterfaces';
import { onChange } from 'react-native-reanimated';
import { useForm } from '../hooks/UseForm';
import Carousel from 'react-native-snap-carousel';
import { useFade } from '../hooks/UseFade';
import { FadeQuestionsScreen } from './FadeQuestionsScreen';

interface Props extends StackScreenProps<any, any> { };

interface Props2 {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}
/* interface RouteParams {
    form: objUseForm;
    toParent?: boolean;
} */

const duration = 1000;

export const CreateObserveQuestionsPage = ({ navigation, route }: Props) => {

    /* const {form:initialForm} = route.params as RouteParams; */

    /* const { form, onChange } = useForm<objUseForm>(initialForm); */

    /* console.log("route.params form:");
    console.log(form); */

    const [activeIndex, setActiveIndex] = useState(2);

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

    //animacion de fondo
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;
    /* const [index, setIndex] = useState(0); */
    //es necesario inicializar los fondos en un estado para que se visualize bien con el primer render
    const [backgroundColor, setBackgroundColor] = useState<string | Animated.AnimatedInterpolation>(colors.dlsGrayPrimary);
    const [backgroundBtnColor, setBackgroundBtnColor] = useState<string | Animated.AnimatedInterpolation>(colors.dlsYellowSecondary);
    const [currentColor, setCurrentColor] = useState(colors.dlsGrayPrimary);

    const backgroundColorRange = animatedValue2.interpolate({
        inputRange: [0, 0.5, 0.501, 1],
        outputRange: [
            (currentColor === colors.dlsGrayPrimary ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
            (currentColor === colors.dlsGrayPrimary ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
            (currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
            (currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
        ],
    });
    const dotBgColorRange = animatedValue2.interpolate({
        inputRange: [0, 0.5, 0.501, 1],
        outputRange: [
            (currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
            (currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
            (currentColor === colors.dlsGrayPrimary ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
            (currentColor === colors.dlsGrayPrimary ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
        ],
    });

    const animation = (toValue: number) =>
        Animated.parallel([
            Animated.timing(animatedValue, {
                toValue,
                duration: duration,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue2, {
                toValue,
                duration: duration,
                useNativeDriver: false,
            }),
        ]);

    const onPress = () => {

        if (activeIndex < 4) {
            setBackgroundColor(backgroundColorRange);
            setBackgroundBtnColor(dotBgColorRange);
            setCurrentColor(currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary);

            animatedValue.setValue(0);
            animatedValue2.setValue(0);
            animation(1).start();
            setActiveIndex(activeIndex + 1);

            fadeOut(1);
        }

    }

    const backBtn = () => {
        if (activeIndex > 2) {
            setBackgroundColor(dotBgColorRange);
            setBackgroundBtnColor(backgroundColorRange);
            setCurrentColor(currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary);

            animatedValue.setValue(1);
            animatedValue2.setValue(1);
            animation(0).start();
            setActiveIndex(activeIndex - 1);

            fadeOut(1);
        }

    }

    //cambiar de screens
    const { opacity: opacityScreen, fadeIn, fadeOut } = useFade(0);

    useEffect(
        () => 
        {setTimeout(() => {
            fadeIn(500)
        }, 500); }
        ,[activeIndex]
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.screen}>
                {/* <StatusBar hidden /> */}

                <AnimatedCircle
                    onPress={onPress}
                    animatedValue={animatedValue}
                    animatedValue2={animatedValue2}
                    backgroundColorRange={backgroundColor}
                    dotBgColorRange={backgroundBtnColor}
                    currentColorString={currentColor}
                />

                <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity onPress={backBtn}>
                        <Icon name="chevron-back-outline" size={40} color={currentColor === colors.dlsYellowSecondary ? colors.dlsGrayPrimary : colors.dlsYellowSecondary} />
                    </TouchableOpacity>

                </View>

                <View style={{ paddingBottom: 10, marginHorizontal: 20 }}>
                    <StepIndicator
                        stepCount={5}
                        customStyles={firstIndicatorStyles}
                        currentPosition={activeIndex}
                        labels={['Paso 1', 'Paso 2']}
                    //renderLabel={renderLabel} 
                    //onPress={onStepPress} 
                    />
                </View>

                {/* margin bottom es lo que ocupa el circulo de animación - no quitar */}
                <View style={{ flex: 1, marginBottom: 200 }}>

                    <FadeQuestionsScreen index={activeIndex} opacity={opacityScreen}/>

                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
    }
});