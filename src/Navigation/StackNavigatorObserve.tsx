import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TarjetaObserveScreen } from '../screens/TarjetaObserveScreen';
import { CreateObserveScreen } from '../screens/CreateObserveScreen';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CreateObserveQuestionsPage } from '../components/CreateObserveQuestionsPage';
import { colors } from '../Themes/DlsTheme';
import { EmplidObserveScreen } from '../screens/EmplidObserveScreen';
import { EditObvservCardScreen } from '../screens/EditObvservCardScreen';
import { InterfGetOnesCard } from '../interfaces/prompInterfaces';
import { AuthProvider } from '../context/formContext/AuthContext';
import { CreateObserveFinalPage } from '../components/CreateObserveFinalPage';
import { SlidesScreen } from '../screens/SlideScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/Loading';

export type RoutstackParams = {

    EditObvservCardScreen: InterfGetOnesCard
    TarjetaObserveScreen: { name: string, emplid: string }

}

const FormContext = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

const Stack = createStackNavigator();

export const StackNavigatorObserve = () => {

    const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkStorage = async () => {
        if (await AsyncStorage.getItem('welcomeScreenLoaded')) {
            /* console.log("entro a loaded: " + await AsyncStorage.getItem('welcomeScreenLoaded')); */
        } else {
            setShowWelcomeScreen(true);
            console.log("entro a null");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        checkStorage()
    }, [])

    return (
        <FormContext>
            <SafeAreaView style={styles.container}>
                {isLoading ?
                    <Loading />
                    :
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            cardStyle: {
                                backgroundColor: 'white'
                            }
                        }}
                    >
                        {showWelcomeScreen &&
                            <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
                        }
                        <Stack.Screen name="EmplidObserveScreen" component={EmplidObserveScreen} />
                        <Stack.Screen name="TarjetaObserveScreen" component={TarjetaObserveScreen} />
                        <Stack.Screen name="CreateObserveScreen" component={CreateObserveScreen} />
                        <Stack.Screen name="CreateObserveQuestionsPage" component={CreateObserveQuestionsPage} />
                        <Stack.Screen name="CreateObserveFinalPage" component={CreateObserveFinalPage} />
                        <Stack.Screen name="EditObvservCardScreen" component={EditObvservCardScreen} />
                    </Stack.Navigator>
                }
            </SafeAreaView>
        </FormContext>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dlsGrayPrimary,
        flex: 1,
    },
});