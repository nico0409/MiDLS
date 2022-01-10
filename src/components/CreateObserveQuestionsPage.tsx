import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, withDelay, useAnimatedStyle, interpolate, interpolateColor } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import { FadeQuestionsScreen } from './FadeQuestionsScreen';
import { stepIndicatorStyles } from '../data/stepIndicatorStyles';
import { QuestionCarousel } from '../interfaces/QuestionInterfaces';
import { CarouselForQuestions } from './CarouselForQuestions';

interface Props extends StackScreenProps<any, any> { };

const { width: windowWidth, height: windowsHeight } = Dimensions.get('window');

const duration = 1000;
const circleSize = windowsHeight <= 593 ? 70 : 100;

export const CreateObserveQuestionsPage = ({ navigation, route }: Props) => {


    const dataCarousel: QuestionCarousel[] = [{
        index: 2,
        questions: [{ questionsRGold: [{ type: '1' }] },
        { questionsRGold: [{ type: '2' }] },
        { questionsRGold: [{ type: '3' }] },
        { questionsRGold: [{ type: '4' }] },
        { questionsRGold: [{ type: '5' }] },
        { questionsRGold: [{ type: '6' }] },
        { questionsRGold: [{ type: '7' }] },
        { questionsRGold: [{ type: '8' }] },
        { questionsRGold: [{ type: '1' }, { type: '2' }, { type: '3' }, { type: '4' }] }
            , { questionsRGold: [{ type: '5' }, { type: '6' }, { type: '7' }, { type: '8' }, { type: '9' }] }]

    }];

    let page = 2;


    const [activeIndex, setActiveIndex] = useState(2);
    console.log(activeIndex);
    const [moveCarousel, setMoveCarousel] = useState(1);
    /*  const [moveCarousel2, setMoveCarousel2] = useState(1);
     const [moveCarousel3, setMoveCarousel3] = useState(1); */

    //animacion de fondo
    const animatedBGCircleValue = useSharedValue(0);
    const [currentColor, setCurrentColor] = useState(colors.dlsGrayPrimary);

    const animatedBGColorValue = useSharedValue(0);

    const animatedBGStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(animatedBGColorValue.value,
            [0, 0.5, 0.501, 1],
            [colors.dlsGrayPrimary, colors.dlsGrayPrimary, colors.dlsYellowSecondary, colors.dlsYellowSecondary]
        )

        return { backgroundColor: backgroundColor }
    })

    const animatedInterpCircleStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(animatedBGColorValue.value,
            [0, 0.5, 0.501, 1],
            [colors.dlsYellowSecondary, colors.dlsYellowSecondary, colors.dlsGrayPrimary, colors.dlsGrayPrimary]
        )

        const scale = interpolate(animatedBGCircleValue.value,
            [0, 0.5, 1], [1, 6, 1]);

        const rotateY = interpolate(animatedBGCircleValue.value,
            [0, 0.5, 1], [0, 90, 180]);

        return {
            backgroundColor,
            transform: [{ perspective: 200 },
            {
                rotateY: `-${rotateY}deg`
            }, {
                scale: scale
            }]
        }

    });

    const animatedInterpCircleBtnStyle = useAnimatedStyle(() => {

        const scale = interpolate(animatedBGCircleValue.value,
            [0, 0.05, 0.5, 1], [1, 0, 0, 1]);

        const rotateY = interpolate(animatedBGCircleValue.value,
            [0, 0.5, 1], [0, 180, 180]);

        const opacity = interpolate(animatedBGCircleValue.value,
            [0, 0.05, 0.9, 1], [1, 0, 0, 1]);

        return {
            transform: [{ perspective: 200 },
            {
                rotateY: `${rotateY}deg`
            }, {
                scale: scale
            }],
            opacity: opacity
        }

    });

    //movimiento entre carruseles
    const [trasladeCarousel, setTrasladeCarousel] = useState<number>(0);

    const opacityPagesValue = useSharedValue(0);

    const opacityPagesStyle = useAnimatedStyle(() => {

        const opacity = interpolate(opacityPagesValue.value,
            [0, 1], [1, 0]);

        return {
            opacity: opacity
        }

    });

    const runAnimation = (nextPrev: 'next' | 'prev') => {

        opacityPagesValue.value = withTiming(1, { duration: 200 });

        animatedBGCircleValue.value = nextPrev === 'next' ? 0 : 1;
        animatedBGCircleValue.value = withTiming(nextPrev === 'next' ? 1 : 0, { duration }, () => {
            opacityPagesValue.value = withDelay(200, withTiming(0, { duration: 200 }))
        });

        animatedBGColorValue.value = withTiming((activeIndex % 2) === 0 ? 1 : 0, { duration });

        /*  setTrasladeCarousel(nextPrev === 'next' ? trasladeCarousel - windowWidth : trasladeCarousel + windowWidth); */

        //para iconos
        setCurrentColor(currentColor === colors.dlsGrayPrimary ? colors.dlsYellowSecondary : colors.dlsGrayPrimary);

        setActiveIndex(nextPrev === 'next' ? activeIndex + 1 : activeIndex - 1);
    }

    const onPress = () => {
        switch (activeIndex) {
            case 2:
                if (moveCarousel === 4) {
                    setMoveCarousel(moveCarousel + 1);
                    runAnimation('next');
                } else {
                    setMoveCarousel(moveCarousel + 1);
                }
                break;
            case 3:
                if (moveCarousel == 8) {
                    setMoveCarousel(moveCarousel + 1);
                    runAnimation('next');
                } else {
                    setMoveCarousel(moveCarousel + 1)
                }
                break;
            case 4:
                if (moveCarousel === 10) {
                    navigation.navigate('CreateObserveFinalPage');
                } else {
                    setMoveCarousel(moveCarousel + 1)
                }
                break;
        }
    }

    const backBtn = () => {
        switch (activeIndex) {
            case 2:
                if (moveCarousel === 1) {
                    navigation.pop();
                } else {
                    setMoveCarousel(moveCarousel - 1);
                }
                break;
            case 3:
                if (moveCarousel === 5) {
                    setMoveCarousel(moveCarousel - 1)
                    runAnimation('prev');
                } else {
                    setMoveCarousel(moveCarousel - 1)
                }
                break;
            case 4:
                if (moveCarousel === 9) {
                    setMoveCarousel(moveCarousel - 1)
                    runAnimation('prev');
                } else {
                    setMoveCarousel(moveCarousel - 1)
                }
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.screen}>
                {/* <StatusBar hidden /> */}

                <Animated.View style={[StyleSheet.absoluteFillObject,
                styles.circleCointainer,
                    animatedBGStyle
                ]}>

                    <Animated.View style={[
                        styles.circle,
                        animatedInterpCircleStyle

                    ]}>

                        <TouchableOpacity onPress={onPress}>
                            <Animated.View
                                style={[
                                    styles.circleButton,
                                    animatedInterpCircleBtnStyle
                                ]}>

                                <Icon
                                    name='arrow-forward-outline'
                                    size={28}
                                    color={currentColor} />
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>

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
                    //renderLabel={renderLabel} 
                    //onPress={onStepPress} 
                    />
                </View>

                {/* margin bottom es lo que ocupa el circulo de animación - no quitar */}
                <Animated.View style={[{
                    flex: 1, marginBottom: windowsHeight <= 760 ?
                        windowsHeight <= 593 ? '25%' : '35%'
                        :
                        200
                }, opacityPagesStyle]}>
                    <CarouselForQuestions
                        data={dataCarousel[0].questions}

                        moveCarousel={moveCarousel}
                        indexScreen={activeIndex}
                    />
                </Animated.View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    circleCointainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 8,
        paddingBottom: windowsHeight <= 760 ? '10%' : 100,
        backgroundColor: colors.dlsGrayPrimary
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: colors.dlsYellowSecondary
    },
    circleButton: {
        height: windowsHeight <= 593 ? 70 : 100,
        width: windowsHeight <= 593 ? 70 : 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});