import React, { useEffect, useRef, useState, } from 'react'
import { Animated, Dimensions, Text, View } from 'react-native';
import { useFade } from '../hooks/UseFade';
import Carousel from 'react-native-snap-carousel';

interface Props {
    opacity: Animated.Value;
    index: number;
}

type Props2 = {
    children: React.ReactElement;
    waitBeforeShow?: number;
};

const windowWidth = Dimensions.get('window').width;

export const FadeQuestionsScreen = ({ opacity, index }: Props) => {


    const ScreensCarousel = (index: number) => {

        const dataTemp = [{}, {}];

        const [activeIndex, setActiveIndex] = useState(0);
        const [activeIndex2, setActiveIndex2] = useState(0);
        const [activeIndex3, setActiveIndex3] = useState(0);

        const renderItem = (item: any, index: number) => {

            return (
                <View style={{/* backgroundColor:'red' */}}>
                    <Text style={{ color: 'white' }}>Holaaa</Text>
                    <Text style={{ color: 'white' }}>Holaaa</Text>
                </View>
            )
        }


        switch (index) {
            case 2:
                return (
                    <View >

                        <Carousel
                            data={dataTemp}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            sliderWidth={windowWidth}
                            itemWidth={windowWidth}
                            onSnapToItem={(index) => {
                                setActiveIndex(index)
                            }}
                        />
                       {/*  <Text style={{ color: 'white' }}>Holaaa</Text> */}

                    </View>
                )
            case 3:
                return (
                    <View >

                        <Carousel
                            data={dataTemp}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            sliderWidth={windowWidth}
                            itemWidth={windowWidth}
                            onSnapToItem={(index) => {
                                setActiveIndex2(index)
                            }}
                        />
                       {/*  <Text style={{ color: 'white' }}>Holaaa</Text> */}

                    </View>
                )
            case 4:
                return (
                    <View >

                        <Carousel
                            data={dataTemp}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            sliderWidth={windowWidth}
                            itemWidth={windowWidth}
                            onSnapToItem={(index) => {
                                setActiveIndex3(index)
                            }}
                        />
                       {/*  <Text style={{ color: 'white' }}>Holaaa</Text> */}

                    </View>
                )
        }
    };

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

    return (
        <>
            <Animated.View style={{ flex: 1, opacity }}>
                {/* <Delayed> */}
                    <>
                        {ScreensCarousel(index)}
                    </>
                {/* </Delayed> */}
            </Animated.View>
        </>
    )
}
