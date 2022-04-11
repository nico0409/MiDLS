import React, { useEffect, useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TarjetaObserveScreen } from '../screens/TarjetaObserveScreen';
import { CreateObserveScreen } from '../screens/CreateObserveScreen';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CreateObserveQuestionsPage } from '../components/CreateObserveQuestionsPage';
import { colors } from '../Themes/DlsTheme';
import { EmplidObserveScreen } from '../screens/EmplidObserveScreen';
import { EditObvservCardScreen } from '../screens/EditObvservCardScreen';
import { InterfGetOnesCard, statusAuthStorage } from '../interfaces/prompInterfaces';
import { AuthProvider } from '../context/formContext/AuthContext';
import { CreateObserveFinalPage } from '../components/CreateObserveFinalPage';
import { SlidesScreen } from '../screens/SlideScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import { GetStorage } from '../components/Storage';


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
    const [isLogin, setisLogin] = useState(false);
    const authContext = useContext(AuthContext);



    const getsAuthStorage = async () => {
        const statusStorage = await GetStorage({ StorageType: 'signInStatus' })

        function isAuthStorage(object: any): object is statusAuthStorage[] {
            return true
        }


        if (statusStorage !== null) {
            if (isAuthStorage(statusStorage)) {
                return statusStorage[0].status === true || authContext.status === 'authenticated' ? true : false

            }
        } else {
            return authContext.status === 'authenticated' ? true : false
        }
    }

    console.log("authContext", authContext.status);

    useEffect(() => {
        getsAuthStorage().then(res => {
            setisLogin(!res);
        })
    }, [authContext.status])

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
                {isLogin ?
                    // carga pantalla de aviso  de que no esta logueado
                    <Loading />
                    : isLoading ?
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