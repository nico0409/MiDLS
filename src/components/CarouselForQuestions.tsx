import React, { useState } from 'react'
import { Dimensions, View } from 'react-native';
import { QuestionsCmp } from './Questions';
import Carousel from 'react-native-snap-carousel';
import { questionType } from '../interfaces/QuestionInterfaces';

const windowWidth = Dimensions.get('window').width;

interface Props{
    data: questionType[]
}

export const CarouselForQuestions = ({data}:Props) => {

    const [activeIndex, setActiveIndex] = useState(0);


    const renderItem = (item: questionType, index: number) => {
        
        return (
            <View >
                <QuestionsCmp questiontType={item} />
            </View>
        )
    }

    return (
        <>
            <Carousel
                data={data}
                renderItem={({ item, index }) => renderItem(item, index)}
                sliderWidth={windowWidth}
                itemWidth={windowWidth}
                /* ref={carouselRef} */
                onSnapToItem={(index) => {
                    setActiveIndex(index)
                }}
            />
        </>
    )
}
