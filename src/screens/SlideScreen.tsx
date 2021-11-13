import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Text, View, StyleSheet, TouchableOpacity/* , Animated */ } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { items } from '../data/SlideData';
import { Slide } from '../interfaces/appInterfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import { UseAnimation } from '../hooks/UseAnimation';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../Themes/DlsTheme';
//import { ThemeContext } from '../Context/themeContext/ThemeContext';
import { opacity } from '../libs/react-native-redash/src/Colors';

interface Props extends StackScreenProps<any, any> { };

export const SlidesScreen = ({ navigation }: Props) => {
    const { /* opacity ,*/ fadeIn, fadeOut } = UseAnimation(0);
    const [activIndex, setActivIndex] = useState(0);
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
    const carouselRef = useRef(null);

    /* const [isVisible, setIsvisible] = useState(false) */
    // const {theme:{colors}} = useContext(ThemeContext)  

    const renderItem = (item: Slide) => {

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.dlsGrayPrimary,
                borderRadius: 5,
                justifyContent: 'center'
            }}>
                <View style={{ width: '100%', height: '60%', padding: 30 }}>
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: '100%',
                        borderRadius: 30,
                        overflow: 'hidden'
                    }}>
                        <Image
                            source={item.img}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'center'
                            }}
                        />
                    </View>
                </View>

                <View style={{ paddingHorizontal: 40 }}>
                    <Text style={{
                        ...styles.title,
                        color: 'white'
                    }}>{item.title}</Text>
                    <Text style={{
                        ...styles.subtitle,
                        color: 'white'
                    }}>{item.desc}</Text>
                </View>

            </View>

        )
    }

    const widthText = useSharedValue(0);
    const padLeftText = useSharedValue(0);
    const opacity = useSharedValue(0);

    const widthTextAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(widthText.value, { duration: 400 }),
            paddingLeft: withTiming(padLeftText.value, { duration: 400 }),
            opacity: withDelay(400,withTiming(opacity.value, { duration: 300 }),)
        };
    });

    const runWidthAnimation = () =>{
        widthText.value = 80;
        padLeftText.value = 20;
        opacity.value = 1;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.dlsGrayPrimary,
                paddingTop: 50
            }}>
            <Carousel
                //ref={(c) => { this._carousel = c; }}
                data={items}
                renderItem={({ item }: { item: Slide }) => renderItem(item)}
                ref={carouselRef}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                scrollEnabled={false}
                layout="default"
                inactiveSlideOpacity={1}
                onSnapToItem={(index) => {
                    setActivIndex(index)
                    index=== items.length -1 && runWidthAnimation()
                    /* index === items.length - 1 && 
                     */
                    /* fadeIn() */
                    /* setIsvisible(true) */
                }}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                alignItems: 'center'
            }}>

                <Pagination
                    dotsLength={items.length}
                    activeDotIndex={activIndex}
                    dotStyle={{
                        width: 15,
                        height: 15,
                        borderRadius: 10,
                        backgroundColor: colors.dlsBluePrimary,
                    }}

                />
                {/*                 {
                    isVisible && <Animated.View style={{
                        opacity
                    }}> */}
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    backgroundColor: colors.dlsBluePrimary,
                    /* width: 120, */
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    
                }}
                    activeOpacity={0.9}
                    onPress={() => {

                        // @ts-ignore
                        carouselRef.current.snapToNext();
                        activIndex === items.length - 1 &&
                            navigation.replace("EmplidObserveScreen")
                    }}
                >
                    <Animated.View style={[widthTextAnimatedStyle, { flexWrap: 'wrap' }]}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Entrar</Text>
                    </Animated.View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Icon
                            name="chevron-forward-outline"
                            color="white"
                            size={25}
                        />
                    </View>
                </TouchableOpacity>

                {/*                     </Animated.View>
                } */}
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',


    },
    subtitle: {
        fontSize: 17
    }

});