import React from 'react'
import { View, StyleSheet, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';

const circleSize = 100;

export const AnimatedCircle = ({ onPress, animatedValue }: any) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.circleCointainer]}>
            <Animated.View style={[
                styles.circle,
                {
                    transform: [
                        {
                            rotateY: animatedValue.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: ['0deg', '-90deg', '-180deg']
                            })
                        },
                        {
                            scale: animatedValue.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [1, 10, 1]
                            })
                        }
                    ]
                }
            ]}>
                <TouchableOpacity onPress={onPress}>
                    <View style={[styles.circle, styles.circleButton]}>
                        <Icon
                            name='arrow-forward-outline'
                            size={28}
                            color={colors.dlsGrayPrimary} />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
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
        paddingBottom: 100,
        backgroundColor: colors.dlsGrayPrimary
    },
    circle: {
        backgroundColor: colors.dlsYellowSecondary,
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2
    },
    circleButton: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    }
});