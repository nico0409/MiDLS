import React, { useContext, useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { Chase } from 'react-native-animated-spinkit';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../Themes/DlsTheme';
import { AuthContext } from '../context/formContext/AuthContext';
import { AuthContext as AuthcontextGeneral } from '../context/AuthContext'
import { NewObservCard } from './NewObservCard';
import Card from './Transformations/components/Card';

interface Props extends StackScreenProps<any, any> { };

const { height } = Dimensions.get('window');

const textDescrSize = height <= 535 ? 18 : 20;

const textTitleSize = height <= 535 ? 32 : 40;

export const CreateObserveFinalPage = ({ navigation }: Props) => {

    const { form, cardDescr, setCardDescr } = useContext(AuthContext);

    const { setReloadCardList } = useContext(AuthcontextGeneral);

    const [reqSended, setReqSended] = useState<'pending' | 'sended' | 'error'>('pending');
    const [errorType, setErrorType] = useState<'SERVER' | 'NETWORK'>();
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
            NewObservCard({ form, setReqSended, setBgCircleColor, loadingValue, cardDescr, setCardDescr, setReloadCardList, setErrorType });
        }, 2000);
    }, [])

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            e.preventDefault();
        })
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

            <Animated.View style={[styles.circleBackground, { backgroundColor: bgCircleColor }, animatedCircleBgStyle]} />

            <Animated.View style={[styles.iconStatusContainer, animatedIconStatusStyle]}>
                {reqSended === 'sended' ?
                    <Icon name="check-circle-outline" size={height <= 593 ? 110 : 140} color="white" />
                    :
                    errorType === 'NETWORK' ?
                    <Icon name="wifi-off" size={height <= 593 ? 110 : 140} color="white" />
                    :
                    <Icon name="cloud-off" size={height <= 593 ? 110 : 140} color="white" />
                }
            </Animated.View>

            <Animated.View style={[{ width: '100%', alignItems: 'flex-end' }, animatedHomeIcon]}>
                <TouchableOpacity
                    style={{ paddingRight: 10, paddingTop: 10 }}
                    onPress={() => {
                        /* navigation.replace('TarjetaObserveScreen',{name:emplidSelect.fieldValue2,emplid:emplidSelect.fieldValue1}) */
                        navigation.removeListener('beforeRemove', () => { });
                        navigation.pop(3)
                    }}>
                    <Icon name="home" size={40} color="white" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.loadingContainer, animatedLoadingStyle]}>
                <Chase size={height <= 593? height <= 593 ? 50 : 90 : 140} color="white" />
            </Animated.View>

            <Animated.View style={[{ backgroundColor: colors.dlsGrayPrimary, flex: 1, alignItems: 'center', justifyContent: 'space-evenly', borderTopLeftRadius: 60, borderTopRightRadius: 60 }, animatedCardStyle]}>
                <View style={{ marginHorizontal: '10%' }}>
                    {reqSended === 'sended' ?
                        <>
                            <Text style={{ color: 'white', fontSize: textTitleSize, fontWeight: 'bold' }}>Listo!</Text>
                            <Text style={{ color: 'white', fontSize: textDescrSize, fontWeight: 'bold' }}>La tarjeta ha sido enviada correctamente.</Text>
                        </>
                        :
                        <>
                            {errorType === 'NETWORK' ?
                                <>
                                    <Text style={{ color: 'white', fontSize: textTitleSize, fontWeight: 'bold' }}>Ups!</Text>
                                    <Text style={{ color: 'white', fontSize: textDescrSize, fontWeight: 'bold' }}>No hay conexión a internet.</Text>
                                    <Text style={{ color: 'white', fontSize: textDescrSize, fontWeight: 'bold' }}>No te preocupes, la tarjeta se guardó y cuando el dispositivo detecte una conexión, la enviará automáticamente.</Text>
                                </>
                                :
                                <>
                                    <Text style={{ color: 'white', fontSize: textTitleSize, fontWeight: 'bold' }}>Ups!</Text>
                                    <Text style={{ color: 'white', fontSize: textDescrSize, fontWeight: 'bold' }}>Hubo un problema con el servidor.</Text>
                                    <Text style={{ color: 'white', fontSize: textDescrSize, fontWeight: 'bold' }}>No te preocupes, la tarjeta se guardó, revisala o contactá con un administrador.</Text>
                                </>
                            }
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
        paddingTop: height <= 593 ? height * 0.05 : height * 0.10,
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