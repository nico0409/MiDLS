import React, { useRef } from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { CarouselForQuestions } from './CarouselForQuestions';
import { QuestionCarousel, questionsRGold } from '../interfaces/QuestionInterfaces';
import { transform } from '@babel/core';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
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
       {/*  eliminar */}
            {/* <Animated.View style={[{
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
                                    indexScreen={element.index}
                                />
                            </View>
                        )
                    })
                }

            </Animated.View> */}
        </>
    )
}
