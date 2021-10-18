import React, { useState, useContext, useEffect, useRef } from 'react'
import { Dimensions, View } from 'react-native';
import { QuestionsCmp } from './Questions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { questionType } from '../interfaces/QuestionInterfaces';
import { AuthContext } from '../context/formContext/AuthContext';

const windowWidth = Dimensions.get('window').width;

interface Props {
    data: questionType[];
    moveCarousel: number;
    moveCarousel2: number;
    moveCarousel3: number;
    index: number
}

export const CarouselForQuestions = ({ data, moveCarousel, moveCarousel2, moveCarousel3, index }: Props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const carouselRef = useRef(null);

    const { form, onChange } = useContext(AuthContext);

    useEffect(() => {
        if (index === 2) {
            // @ts-ignore
            carouselRef.current.snapToItem(moveCarousel - 1, true);
        } else
            if (index === 3) {
                // @ts-ignore
                carouselRef.current.snapToItem(moveCarousel2 - 1, true);
            } else
                if (index === 4) {
                    // @ts-ignore
                    carouselRef.current.snapToItem(moveCarousel3 - 1, true);
                }

    }, [moveCarousel, moveCarousel2, moveCarousel3])

   /*  console.log(moveCarousel, moveCarousel2, moveCarousel3); */

    const renderItem = (item: questionType, index: number) => {

        return (
            <View >
                <QuestionsCmp questiontType={item} form={form} onChange={onChange} />
            </View>
        )
    }

    return (
        <>
            <Carousel
                data={data}
                renderItem={({ item, index }) => renderItem(item, index)}
                scrollEnabled={false}
                sliderWidth={windowWidth}
                itemWidth={windowWidth}
                ref={carouselRef}
                onSnapToItem={(index) => {
                    setActiveIndex(index)
                }}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                containerStyle={{ paddingVertical: 5 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </>
    )
}
