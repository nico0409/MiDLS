import React, { useState } from 'react'
import { StyleSheet, Animated, View, useWindowDimensions, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';

const circleSize = 100;


interface Props {
    onPress: () => void;
    animatedValue: Animated.Value;
    animatedValue2: Animated.Value;
    backgroundColorRange: string | Animated.AnimatedInterpolation;
    dotBgColorRange: string | Animated.AnimatedInterpolation;
    currentColorString: string;
}

const{height}=Dimensions.get('window');
export const AnimatedCircle = ({ onPress, animatedValue, animatedValue2, backgroundColorRange, dotBgColorRange, currentColorString }: Props) => {

   
    
    return (
        <Animated.View style={[StyleSheet.absoluteFillObject,
            styles.circleCointainer,
            { backgroundColor: backgroundColorRange },
        ]}>

            <Animated.View style={[
                styles.circle,
                { backgroundColor: dotBgColorRange },
                {
                    transform: [
                        { perspective: 200 },
                        {
                            rotateY: animatedValue2.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: ['0deg', '-90deg', '-180deg']
                            })
                        },
                        {
                            scale: animatedValue2.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [1, 6, 1]
                            })
                        }
                    ]
                }
            ]}>

                <TouchableOpacity onPress={onPress}>
                    <Animated.View
                        style={[
                            styles.circleButton,
                            {
                                transform: [
                                    {
                                        scale: animatedValue.interpolate({
                                            inputRange: [0, 0.05, 0.5, 1],
                                            outputRange: [1, 0, 0, 1],
                                            // extrapolate: "clamp"
                                        }),
                                    },
                                    {
                                        rotateY: animatedValue.interpolate({
                                            inputRange: [0, 0.5, 0.9, 1],
                                            outputRange: ['0deg', '180deg', '180deg', '180deg'],
                                        }),
                                    },
                                ],
                                opacity: animatedValue.interpolate({
                                    inputRange: [0, 0.05, 0.9, 1],
                                    outputRange: [1, 0, 0, 1],
                                }),
                            }
                        ]}>

                        <Icon
                            name='arrow-forward-outline'
                            size={28}
                            color={currentColorString} />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        /* paddingTop: 100 */
    },
    circleCointainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 8,
        paddingBottom:(height*0.07),
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2
    },
    circleButton: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});