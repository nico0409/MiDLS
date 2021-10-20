import React, { useState, useContext, useEffect, useRef } from 'react'
import { Dimensions, View } from 'react-native';
import { QuestionsCmp } from './Questions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { questionType, questionsRGold } from '../interfaces/QuestionInterfaces';
import { AuthContext } from '../context/formContext/AuthContext';
import { Rulegold } from './Rulegold';

const windowWidth = Dimensions.get('window').width;

interface Props {
    data: questionsRGold[];
    moveCarousel: number;
    moveCarousel2: number;
    moveCarousel3: number;
    indexScreen: number
}

export const CarouselForQuestions = ({ data, moveCarousel, moveCarousel2, moveCarousel3, indexScreen }: Props) => {


    const [activeIndex, setActiveIndex] = useState(0);

    const carouselRef = useRef(null);

    const { form, onChange } = useContext(AuthContext);

    useEffect(() => {

        switch (indexScreen) {
            case 2:
                // @ts-ignore
                carouselRef.current.snapToItem(moveCarousel - 1, true);
                break;
            case 3:
                // @ts-ignore
                carouselRef.current.snapToItem(moveCarousel2 - 1, true);
                break;
            case 4:
                // @ts-ignore
                carouselRef.current.snapToItem(moveCarousel3 - 1, true);
                break;
        }

       /*  if (indexScreen === 2) {
            // @ts-ignore
            carouselRef.current.snapToItem(moveCarousel - 1, true);
        } else
            if (indexScreen === 3) {
                // @ts-ignore
                carouselRef.current.snapToItem(moveCarousel2 - 1, true);
            } else
                if (indexScreen === 4) {
                    // @ts-ignore
                    carouselRef.current.snapToItem(moveCarousel3 - 1, true);
                } */

    }, [moveCarousel, moveCarousel2, moveCarousel3])

    /*  console.log(moveCarousel, moveCarousel2, moveCarousel3); */

    const renderItem = (item: questionsRGold) => {

        switch (indexScreen) {
            case undefined:
                return (<></>)
            case 4:
                return (<>
                    {item.questionsRGold?.map(element => {
                        return (
                            <View key={Math.random()}>
                                <Rulegold form={form} onChange={onChange} questiontType={element} />
                            </View>
                        )
                    })}
                </>)
            default:
                return <QuestionsCmp questiontType={item.questionsRGold![0]} form={form} onChange={onChange} />;
        }
    }

    return (
        <>
            <Carousel
                data={data}
                renderItem={({ item }) => renderItem(item)}
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
