import React, { useRef } from 'react';
import { Animated, Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import { CarouselForQuestions } from './CarouselForQuestions';
import { QuestionCarousel, questionType } from '../interfaces/QuestionInterfaces';
import { transform } from '@babel/core';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    animatedValueOp: Animated.Value;
    animatedValue: Animated.Value;
    dataCarousel: QuestionCarousel[],
    carouselRef?: React.MutableRefObject<null>
}

const windowWidth = Dimensions.get('window').width;

export const FadeQuestionsScreen = ({ animatedValueOp,animatedValue, dataCarousel, carouselRef }: Props) => {

    return (
        <>
            <Animated.View style={{
                 flex: 1,
                 flexDirection: 'row',
                 width: windowWidth * 3,
                 transform:[
                     {translateX: animatedValue.interpolate({
                         inputRange:[0,1,2],
                         outputRange:[0,-windowWidth,-windowWidth*2]
                     })}
                 ],
                 opacity: animatedValueOp.interpolate({
                    inputRange:[0,1],
                    outputRange:[1,0]
                })
                }}>
                {
                    dataCarousel.map(element => {
                        return (
                            <View
                                style={{ width: windowWidth}}
                                key={element.index}
                            >
                                <CarouselForQuestions data={element.questions} />
                            </View>
                        )
                    })
                }

            </Animated.View>
        </>
    )
}
