import React, { useState, useContext, useEffect, useRef } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { QuestionsCmp } from './Questions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { questionsRGold } from '../interfaces/QuestionInterfaces';
import { AuthContext } from '../context/formContext/AuthContext';
import { Rulegold } from './Rulegold';

const windowWidth = Dimensions.get('window').width;

interface Props {
    data: questionsRGold[];
    moveCarousel: number;
    indexScreen: number
}

export const CarouselForQuestions = ({ data, moveCarousel, indexScreen }: Props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const carouselRef = useRef(null);

    const [paginationArray, setpaginationArray] = useState([1,2,3,4])

    const { form, onChange } = useContext(AuthContext);
    
    
    
    useEffect(() => {

                // @ts-ignore
                carouselRef.current.snapToItem(moveCarousel - 1, true);
                
    }, [moveCarousel])
   
    useEffect(() => {
       indexScreen===4&& setpaginationArray([1,2])
    }, [indexScreen])
    

    const renderItem = (item: questionsRGold) => {

        
        switch (indexScreen) {
          case undefined:
                return (<></>) 
            case 4:
                return (<ScrollView style={{
                    marginTop: 24,
                    marginHorizontal:'10%'}}>
                    <Text style={{color:'white',fontSize:18,fontWeight:'bold',paddingBottom:10}}>Reglas de Oro</Text>
                    {item.questionsRGold?.map(element => {
                        return (
                            <View key={Math.random()}>
                                <Rulegold form={form} onChange={onChange} questiontType={element} />
                            </View>
                        )
                    })}
                </ScrollView>)
            case 3:
                return (
                    <ScrollView>
                    <QuestionsCmp questiontType={item.questionsRGold![0]} form={form} onChange={onChange} darkText/>
                    </ScrollView>
                );
            default:
                return (
                    <ScrollView>
                    <QuestionsCmp questiontType={item.questionsRGold![0]} form={form} onChange={onChange} />
                    </ScrollView>
                );
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
                dotsLength={paginationArray.length}
                activeDotIndex={indexScreen===2?activeIndex:indexScreen===3?activeIndex-4:activeIndex-8}
                containerStyle={{ paddingTop: 5, paddingBottom: 30 }}
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
