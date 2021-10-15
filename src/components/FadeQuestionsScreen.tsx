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

/* type Props2 = {
    children: React.ReactElement;
    waitBeforeShow?: number;
};
 */

const windowWidth = Dimensions.get('window').width;

export const FadeQuestionsScreen = ({ animatedValueOp,animatedValue, dataCarousel, carouselRef }: Props) => {


    /* const ScreensCarousel = (indexSI: number) => {

        switch (indexSI) {
            case 2:
                return (
                    <View >
                        <CarouselForQuestions data={dataCarousel.find(({ index }) => index === indexSI)!.questions} />
                    </View>
                )
            case 3:
                return (
                    <View >
                        <CarouselForQuestions data={dataCarousel.find(({ index }) => index === indexSI)!.questions} />
                    </View>
                )
            case 4:
                return (
                    <View >
                        <CarouselForQuestions data={dataCarousel.find(({ index }) => index === indexSI)!.questions} />
                    </View>
                )
        }
    }; */

    /*     const Delayed = ({ children, waitBeforeShow = 100 }: Props2) => {
            const [isShown, setIsShown] = useState(false);
    
            useEffect(() => {
                console.log("se ejecuta delayed");
                console.log(waitBeforeShow);
                setTimeout(() => {
                    setIsShown(true);
                }, waitBeforeShow);
            }, []);
    
            return isShown ? children : null;
        }; */


    /* const scrollX = useRef(new Animated.Value(0)).current; */

    const CarouselList = () => {

        return (<>
            {
                dataCarousel.map(element => {
                    return (
                        <View
                            style={{ width: windowWidth }}
                            key={element.index}
                        >
                            <CarouselForQuestions data={element.questions} />
                        </View>
                    )
                })
            }
        </>)


    }

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
                            >
                                <CarouselForQuestions data={element.questions} />
                            </View>
                        )
                    })
                }
                {/* <ScrollView
                    horizontal={false}
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }
                    ],
                        { useNativeDriver: false })}
                    scrollEventThrottle={1}
                >
                    {dataCarousel.map(element => {
                        return (
                            <View
                                style={{flex:1, width: windowWidth }}
                                key={element.index}
                            >
                                <CarouselForQuestions data={element.questions} />
                            </View>
                        )
                    })}
                </ScrollView> */}

                {/* {ScreensCarousel(index)} */}
            </Animated.View>
        </>
    )
}
