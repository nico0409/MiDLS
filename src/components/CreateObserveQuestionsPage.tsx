import React, { useState, useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View, StyleSheet, Animated, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import { AnimatedCircle } from './AnimatedCircle';

interface Props extends StackScreenProps<any, any> { };

interface DataTemp {
    namepage: string;
}

/* const circleSize = 100; */

export const CreateObserveQuestionsPage = ({ navigation }: Props) => {

    const [activeIndex, setActiveIndex] = useState(2);

    const dataTemp: DataTemp[] = [{
        namepage: 'pagina1',
    },
    {
        namepage: 'pagina2',
    }]

    const firstIndicatorStyles = {
        stepIndicatorSize: 30,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 3,
        separatorStrokeUnfinishedWidth: 3,
        separatorStrokeFinishedWidth: 3,
        currentStepStrokeWidth: 5,
        stepStrokeWidth: 3,
        separatorFinishedColor: '#4aae4f',
        separatorUnFinishedColor: '#a4d4a5',
        stepIndicatorFinishedColor: '#4aae4f',
        stepIndicatorUnFinishedColor: '#a4d4a5',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 15,
        currentStepIndicatorLabelFontSize: 15,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: 12,
        currentStepLabelColor: '#4aae4f',
    };

    //animacion de fondo
    const animatedValue = useRef(new Animated.Value(0)).current;

    const onPress = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: colors.dlsGrayPrimary }}>
                <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => navigation.popToTop()}
                    >
                        <Icon name="chevron-back-outline" size={40} color={colors.dlsYellowSecondary} />
                    </TouchableOpacity>

                </View>

                <View style={{ paddingBottom: 10, marginHorizontal: 20 }}>
                    <StepIndicator
                        stepCount={5}
                        customStyles={firstIndicatorStyles}
                        currentPosition={activeIndex}
                        labels={['Paso 1', 'Paso 2']}
                    /* renderLabel={renderLabel} */
                    /* onPress={onStepPress} */
                    />
                </View>
            </View>


            <View style={styles.screen}>
                {/* <StatusBar hidden /> */}
                <AnimatedCircle onPress={onPress} animatedValue={animatedValue} />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        /* paddingTop: 100 */
    }
});