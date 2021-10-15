import React, { useState, useRef,useEffect ,useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View, StyleSheet, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import { AnimatedCircle } from './AnimatedCircle';
import { useFade } from '../hooks/UseFade';
import { FadeQuestionsScreen } from './FadeQuestionsScreen';
import { stepIndicatorStyles } from '../data/stepIndicatorStyles';
import { QuestionCarousel } from '../interfaces/QuestionInterfaces';
import { AuthContext } from '../context/formContext/AuthContext';


interface Props extends StackScreenProps<any, any> { };

/* interface RouteParams {
    form: objUseForm;
    toParent?: boolean;
} */

const duration = 750;

export const CreateObserveQuestionsPage = ({ navigation, route }: Props) => {


    const {form,onChange} = useContext(AuthContext );

    console.log(form);
    
    /* const {form:initialForm} = route.params as RouteParams; */

    /* const { form, onChange } = useForm<objUseForm>(initialForm); */

    /* console.log("route.params form:");
    console.log(form); */

    const [activeIndex, setActiveIndex] = useState(2);

    //animacion de fondo
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;

    //animación al cambiar screen
    const animatedValue3 = useRef(new Animated.Value(0)).current;
    const animatedValue4 = useRef(new Animated.Value(0)).current;
    /* const { opacity: opacityScreen, fadeIn, fadeOut } = useFade(0); */

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

    const animationCircle = (toValue: number) =>
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
            })
        ]);

    const animationTranslate = (toValue: number) =>
        Animated.timing(animatedValue3, {
            toValue,
            duration: 1,
            useNativeDriver: false,
        });

    const animationOpacity = (toValue: number,duration: number) =>
        Animated.timing(animatedValue4, {
            toValue,
            duration: duration,
            useNativeDriver: false,
        });

    const onPress = () => {
        if (activeIndex < 4) {
            setBackgroundColor(backgroundColorRange);
            setBackgroundBtnColor(dotBgColorRange);
            setCurrentColor(currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary);

            animatedValue.setValue(0);
            animatedValue2.setValue(0);
            animatedValue3.setValue(0);
            animatedValue4.setValue(0);
            /* animationTranslate(activeIndex - 1).start(()=>animationCircle(1).start()); */
            /* animationCircle(1).start(()=>animationTranslate(activeIndex - 1).start()); */
            animationOpacity(1,800).start(() => {
                animationTranslate(activeIndex - 1).start(() =>{
                    animationCircle(1).start(() =>{
                        animatedValue4.setValue(1);
                        animationOpacity(0,350).start()
                    })
                })
            });

            setActiveIndex(activeIndex + 1)
        }
    }

    console.log("activeIndex");
    console.log(activeIndex);
    const backBtn = () => {
        if (activeIndex > 2) {
            setBackgroundColor(dotBgColorRange);
            setBackgroundBtnColor(backgroundColorRange);
            setCurrentColor(currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary);

            animatedValue.setValue(1);
            animatedValue2.setValue(1);
            animatedValue3.setValue(2);
            animatedValue4.setValue(0);
            /* animationCircle(0).start();
            animationTranslate(activeIndex - 3).start();
 */

            
            animationOpacity(1,800).start(() => {
                animationTranslate(activeIndex - 3).start(() =>{
                    animationCircle(0).start(() =>{
                        animatedValue4.setValue(1);
                        animationOpacity(0,350).start()
                    })
                })
            });

            setActiveIndex(activeIndex - 1);

            /* fadeOut(1); */
        }
    }

    const dataCarousel: QuestionCarousel[] = [{
        index: 2,
        questions: [{ type: '1' }, { type: '2' }, { type: '3' }, { type: '4' }]
    }, {
        index: 3,
        questions: [{ type: '5' }, { type: '6' }, { type: '7' }, { type: '8' }]
    }, {
        index: 4,
        questions: [{ type: '3' }, { type: '2' }]
    }];


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
                        customStyles={stepIndicatorStyles}
                        currentPosition={activeIndex}
                        labels={['Paso 1', 'Paso 2']}
                    //renderLabel={renderLabel} 
                    //onPress={onStepPress} 
                    />
                </View>

                {/* margin bottom es lo que ocupa el circulo de animación - no quitar */}
                <View style={{ flex: 1, marginBottom: 200 }}>

                    <FadeQuestionsScreen animatedValueOp={animatedValue4} animatedValue={animatedValue3} dataCarousel={dataCarousel} />

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