import React, { useContext, useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Chase } from 'react-native-animated-spinkit';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../Themes/DlsTheme';
import { AuthContext } from '../context/formContext/AuthContext';
import { NewObservCard } from './NewObservCard';

const { height } = Dimensions.get('window');

export const CreateObserveFinalPage = () => {

    const { form } = useContext(AuthContext);

    const [reqSended, setReqSended] = useState<'pending' | 'sended' | 'error'>('pending');
    const [bgCircleColor, setBgCircleColor] = useState('grey');

    console.log(form);

    const loadingValue = useSharedValue(0);
    const statusIconValue = useSharedValue(height);
    const circleBGValue = useSharedValue(0);

    const animatedLoadingStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: withSpring(loadingValue.value, {
                    damping: 20,
                    stiffness: 150,
                },
                    () => {
                        //esta condición se pone porque el callback de reanimated se ejecuta a penas renderiza por primera vez,cosa que esta mál
                        //entonces se indica algun tipo de state y se setea en algun lado para que se ejecute en el callback que esperamos y cuando queramos
                        if (reqSended !== 'pending') {
                            statusIconValue.value = 0;
                            circleBGValue.value = Math.ceil(height / 95);
                        }
                    })
            }],
        };
    });

    const animatedIconStatusStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: withSpring(statusIconValue.value, {
                    damping: 14,
                    stiffness: 70,
                })
            }],
        };
    });

    const animatedCircleBgStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: withTiming(circleBGValue.value, { duration: 500 })
            }],
        };
    });

    useEffect(() => {
        setTimeout(() => {
            NewObservCard({form, setReqSended, setBgCircleColor, loadingValue});
        }, 1350);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>
            <Animated.View style={[styles.circleBackground, { backgroundColor: bgCircleColor }, animatedCircleBgStyle]} />

            <Animated.View style={[styles.iconStatusContainer, animatedIconStatusStyle]}>
                {reqSended === 'sended' ?
                    <Icon name="checkmark-circle" size={140} color="white" />
                    :
                    <Icon name="cloud-offline" size={140} color="white" />
                }
            </Animated.View>

            <Animated.View style={[styles.loadingContainer, animatedLoadingStyle]}>
                <Chase size={140} color="white" />
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: height * 0.2,
    },
    iconStatusContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: height * 0.2,
        position: 'absolute'
    },
    circleBackground: {
        height: 200,
        width: 200,
        borderRadius: 200,
        position: 'absolute',
        bottom: -50,
        alignSelf: 'center'
    }
})