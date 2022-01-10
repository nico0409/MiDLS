import React, { useRef, useState } from 'react'
import { Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { items } from '../data/SlideData';
import { Slide } from '../interfaces/appInterfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '../Themes/DlsTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

interface Props extends StackScreenProps<any, any> { };

export const SlidesScreen = ({ navigation }: Props) => {

    const [activIndex, setActivIndex] = useState(0);
    const { width: screenWidth } = Dimensions.get('window');
    const carouselRef = useRef(null);

    //CheckBox
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    
    const renderItem = (item: Slide) => {

        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.dlsGrayPrimary,
                borderRadius: 5,
                justifyContent: 'center'
            }}>

                <View style={{ width: '100%', height: '50%', paddingVertical: 10, paddingHorizontal: 30 }}>
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
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </View>

                <View style={{ paddingHorizontal: 30 }}>
                    <Text style={{
                        ...styles.title,
                        color: 'white'
                    }}>{item.title}</Text>
                    <ScrollView>
                        <Text style={{
                            ...styles.subtitle,
                            color: 'white'
                        }}>{item.desc}</Text>
                    </ScrollView>
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
            opacity: withDelay(400, withTiming(opacity.value, { duration: 300 }),)
        };
    });

    const checkBoxAnimStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, { duration: 300 })
        };
    });

    const runWidthAnimation = () => {
        widthText.value = 100;
        padLeftText.value = 20;
        opacity.value = 1;
    }

    const finalActionEvents = async () => {
        toggleCheckBox &&
            await AsyncStorage.setItem('welcomeScreenLoaded', 'loaded');

        toggleCheckBox ?
            navigation.replace("EmplidObserveScreen")
            :
            navigation.navigate("EmplidObserveScreen")
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
                    index === items.length - 1 && runWidthAnimation()
                }}
            />

            <Animated.View style={[{
                flexDirection: 'row',
                paddingHorizontal: 36,
                alignItems: 'center',


            },
                checkBoxAnimStyle]}>
                <View style={{  marginRight: Platform.OS==='ios'?15:0}}>
                    <CheckBox

                        value={toggleCheckBox}
                        tintColors={{ true: colors.dlsBluePrimary, false: colors.dlsBtonColosWhite }}
                        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                        onValueChange={(newValue) => {
                            setToggleCheckBox(newValue)
                        }}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setToggleCheckBox(!toggleCheckBox) }}>
                    <Text style={{ color: 'white'/* , fontWeight: 'bold' */, fontSize: 16 }}>
                        No volver a mostrar
                    </Text>
                </TouchableOpacity>
            </Animated.View>

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
                        activIndex === items.length - 1 && finalActionEvents()

                    }}
                >
                    <Animated.View style={[widthTextAnimatedStyle, { flexWrap: 'wrap' }]}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Ingresar</Text>
                    </Animated.View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Icon
                            name="chevron-forward-outline"
                            color="white"
                            size={25}
                        />
                    </View>
                </TouchableOpacity>

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