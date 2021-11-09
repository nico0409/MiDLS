import React, { useContext, useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { Chase } from 'react-native-animated-spinkit';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../Themes/DlsTheme';
import { AuthContext } from '../context/formContext/AuthContext';
import { NewObservCard } from './NewObservCard';
import Card from './Transformations/components/Card';

interface Props extends StackScreenProps<any, any> { };

const { height } = Dimensions.get('window');

export const CreateObserveFinalPage = ({ navigation }: Props) => {

    const { form, cardDescr, setCardDescr, setReloadCardList } = useContext(AuthContext);

    const [reqSended, setReqSended] = useState<'pending' | 'sended' | 'error'>('pending');
    const [bgCircleColor, setBgCircleColor] = useState('grey');

    const opacityHomeValue = useSharedValue(0);
    const loadingValue = useSharedValue(0);
    const statusIconValue = useSharedValue(height);
    const cardValue = useSharedValue(height);
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
                            opacityHomeValue.value = 1;
                            statusIconValue.value = 0;
                            cardValue.value = 0;
                            circleBGValue.value = Math.ceil(height / 95);
                        }
                    })
            }],
        };
    });

    const animatedHomeIcon = useAnimatedStyle(() => {
        return {
            opacity: withDelay(1000, withTiming(opacityHomeValue.value, { duration: 400 }))
        };
    });

    const animatedIconStatusStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: withSpring(statusIconValue.value, {
                    damping: 12,
                    stiffness: 70,
                })
            }],
        };
    });

    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: withSpring(cardValue.value, {
                    damping: 20,
                    stiffness: 20,
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
            NewObservCard({ form, setReqSended, setBgCircleColor, loadingValue, cardDescr, setCardDescr,setReloadCardList });
        }, 2000);
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

            <Animated.View style={[{ width: '100%', alignItems: 'flex-end' }, animatedHomeIcon]}>
                <TouchableOpacity
                    style={{ paddingRight: 10, paddingTop: 10 }}
                    onPress={() => {
                        /* navigation.replace('TarjetaObserveScreen',{name:emplidSelect.fieldValue2,emplid:emplidSelect.fieldValue1}) */
                        navigation.pop(3)
                    }}>
                    <Icon name="home" size={40} color="white" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.loadingContainer, animatedLoadingStyle]}>
                <Chase size={140} color="white" />
            </Animated.View>

            <Animated.View style={animatedCardStyle}>
                <View style={{ marginHorizontal: '10%', marginBottom: '10%' }}>
                    {reqSended === 'sended' ?
                        <>
                            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>Listo!</Text>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>La tarjeta ha sido enviada correctamente.</Text>
                        </>
                        :
                        <>
                            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>Ups!</Text>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Error al intentar conectarse a Internet.</Text>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Cuando el dispositivo detecte una conexión, la tarjeta se enviará automaticamente.</Text>
                        </>
                    }
                </View>
                <View style={styles.cardContainer}>
                    <Card index={1} item={cardDescr} />
                </View>
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: height * 0.08,
    },
    iconStatusContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: height * 0.10,
        position: 'absolute',
    },
    circleBackground: {
        height: 200,
        width: 200,
        borderRadius: 200,
        position: 'absolute',
        bottom: -50,
        alignSelf: 'center'
    },
    cardContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
    }
})