import React, { useRef } from 'react'
import { Animated } from 'react-native';

export const useFade = (initialValue: number = 0) => {

    const opacity = useRef(new Animated.Value(initialValue)).current;

    const fadeIn = (duration: number, callback?: Function) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration,
                useNativeDriver: true
            }
        ).start(() => callback ? callback() : null);
    }

    const fadeOut = (duration: number, callback?: Function) => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration,
                useNativeDriver: true
            }
        ).start(() => callback ? callback() : null);
    }

    return {
        opacity,
        fadeIn,
        fadeOut
    }
}
