import React, { useState, useRef, useEffect, useContext } from 'react';
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

const duration = 1500;

export const CreateObserveQuestionsPage = ({ navigation, route }: Props) => {


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

    const { form, onChange } = useContext(AuthContext);

    console.log(form);

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
            ((activeIndex % 2) === 0 ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
            ((activeIndex % 2) === 0 ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
            ((activeIndex % 2) === 0 ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
            ((activeIndex % 2) === 0 ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
        ],
    });

    const dotBgColorRange = animatedValue2.interpolate({
        inputRange: [0, 0.5, 0.501, 1],
        outputRange: [
            ((activeIndex % 2) === 0 ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
            ((activeIndex % 2) === 0 ? colors.dlsYellowSecondary : colors.dlsGrayPrimary),
            ((activeIndex % 2) === 0 ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
            ((activeIndex % 2) === 0 ? colors.dlsGrayPrimary : colors.dlsYellowSecondary),
        ],
    });

    /*    const backgroundColorRange = animatedValue2.interpolate({
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
       }); */

    console.log("backgroundColor:" + JSON.stringify(backgroundColor));
    console.log("backgroundColorRange:" + JSON.stringify(backgroundColorRange));

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
            duration:100,
            useNativeDriver: false,
        });

    const animationOpacity = (toValue: number, duration: number) =>
        Animated.timing(animatedValue4, {
            toValue,
            duration: duration,
            useNativeDriver: false,
        });

    const [moveCarousel, setMoveCarousel] = useState(1);
    const [moveCarousel2, setMoveCarousel2] = useState(1);
    const [moveCarousel3, setMoveCarousel3] = useState(1);

    const runAnimation = (nextPrev: 'next' | 'prev') => {

        console.log("nextPrev: " + nextPrev);

        //para iconos
        setCurrentColor(currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary);

        setBackgroundColor(nextPrev === 'next' ? backgroundColorRange : dotBgColorRange);
        setBackgroundBtnColor(nextPrev === 'next' ? dotBgColorRange : backgroundColorRange);


        animatedValue.setValue(nextPrev === 'next' ? 0 : 1);
        animatedValue2.setValue(nextPrev === 'next' ? 0 : 1);
        animatedValue3.setValue(nextPrev === 'next' ? 0 : 2);
        animatedValue4.setValue(0);

        animationOpacity(1,800).start();
        animationCircle(nextPrev === 'next' ? 1 : 0).start(() => {
                animationTranslate(activeIndex - (nextPrev === 'next' ? 1 : 3)).start(()=>{
                    animationOpacity(0, 350).start(); 
                 })
               })
  

        setActiveIndex(nextPrev === 'next' ? activeIndex + 1 : activeIndex - 1);
    }

    const onPress = () => {


        switch (activeIndex) {
            case 2:
                if (moveCarousel === dataCarousel.find(item => item.index === activeIndex)?.questions.length) {
                    runAnimation('next');
                } else {
                    setMoveCarousel(moveCarousel + 1);
                }
                break;
            case 3:
                if (moveCarousel2 === dataCarousel.find(item => item.index === activeIndex)?.questions.length) {
                    runAnimation('next');
                } else {
                    setMoveCarousel2(moveCarousel2 + 1)
                }
                break;
            case 4:
                if (moveCarousel3 === dataCarousel.find(item => item.index === activeIndex)?.questions.length) {
                    runAnimation('next');
                } else {
                    setMoveCarousel3(moveCarousel3 + 1)
                }
                break;
        }

        /* if ((moveCarousel === dataCarousel.find(item => item.index === activeIndex)?.questions.length
        && moveCarousel2===1 && activeIndex!==3)
        || ( moveCarousel2 === dataCarousel.find(item => item.index === activeIndex)?.questions.length)) {
            if (activeIndex < 4) {
                runAnimation('next');
            }
        } else {
            if (activeIndex===2){
                setMoveCarousel(moveCarousel + 1);   
            }else
            if (activeIndex===3)
            {
                setMoveCarousel2(moveCarousel2 + 1) 
            }else
            if(activeIndex===4){
                setMoveCarousel3(moveCarousel3 + 1) 
            }
           
        } */

    }

    const backBtn = () => {
        console.log(moveCarousel, moveCarousel2, moveCarousel3);
        if (moveCarousel2 === 1 && activeIndex === 3 || moveCarousel3 === 1 && activeIndex === 4) {

            if (activeIndex > 2) {

                runAnimation('prev');
            }
        } else {
            if (activeIndex === 2) {
                setMoveCarousel(moveCarousel - 1);
            } else
                if (activeIndex === 3) {
                    setMoveCarousel2(moveCarousel2 - 1)
                } else
                    if (activeIndex === 4) {
                        setMoveCarousel3(moveCarousel3 - 1)
                    }
        }
    }

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

                    <FadeQuestionsScreen
                        animatedValueOp={animatedValue4}
                        animatedValue={animatedValue3}
                        dataCarousel={dataCarousel}
                        moveCarousel={moveCarousel}
                        moveCarousel2={moveCarousel2}
                        moveCarousel3={moveCarousel3} />

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