import React, { useRef } from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { CarouselForQuestions } from './CarouselForQuestions';
import { QuestionCarousel, questionsRGold } from '../interfaces/QuestionInterfaces';
import { transform } from '@babel/core';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    /* animatedValueOp?: Animated.Value;
    animatedValue?: Animated.Value; */
    dataCarousel: QuestionCarousel[];
    moveCarousel: number;
    moveCarousel2: number;
    moveCarousel3: number;
    trasladeCarousel: number;
    opacityPagesStyle: {
        opacity: number;
    }
}

const windowWidth = Dimensions.get('window').width;

export const FadeQuestionsScreen = ({ dataCarousel, moveCarousel, moveCarousel2, moveCarousel3,trasladeCarousel,opacityPagesStyle }: Props) => {

    return (
        <>
            <Animated.View style={[{
                flex: 1,
                flexDirection: 'row',
                width: windowWidth * 3,
                 transform: [
                    {
                        translateX: trasladeCarousel
                    }
                ],
            },opacityPagesStyle]}>
                {
                    dataCarousel.map(element => {
                        return (
                            <View
                                style={{ width: windowWidth }}
                                key={element.index}
                            >
                                <CarouselForQuestions
                                    data={element.questions}
                                    moveCarousel={moveCarousel}
                                    moveCarousel2={moveCarousel2}
                                    moveCarousel3={moveCarousel3}
                                    indexScreen={element.index}
                                />
                            </View>
                        )
                    })
                }

            </Animated.View>
        </>
    )
}
