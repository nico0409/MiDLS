import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { TarjetaObserveScreen } from '../screens/TarjetaObserveScreen';
import { CreateObserveScreen } from '../screens/CreateObserveScreen';
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
import Icon from 'react-native-vector-icons/Ionicons';


export type RoutstackParams = {

    EditObvservCardScreen: InterfGetOnesCard
    TarjetaObserveScreen: { name: string, emplid: string }

}


interface Props extends StackScreenProps<any, any> { };

const FormContext = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

const Stack = createStackNavigator();

export const StackNavigatorObserve = ({ navigation }: Props) => {


    const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setisLogin] = useState(false);
    const authContext = useContext(AuthContext);



    const getsAuthStorage = async () => {

        function isAuthStorage(object: any): object is statusAuthStorage {
            return true
        }

        const statusStorage = await GetStorage({ StorageType: 'signInStatus' });

        if (statusStorage !== null) {
            if (isAuthStorage(statusStorage)) {
                return statusStorage.status === true || authContext.status === 'authenticated' ? true : false

            }
        } else {
            return authContext.status === 'authenticated' ? true : false
        }
    }

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
        }
        setIsLoading(false);
    }

    useEffect(() => {
        checkStorage()
    }, [])

    const noLogin = () => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={navigation.goBack} style={{ paddingTop: 5 }}>
                    <Icon name="chevron-back-outline" size={40} color={colors.dlsYellowSecondary} />
                </TouchableOpacity>

                <View style={{ flex: 1}}>
                    <View style={{
                        height: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                    }}>
                        <Image source={require('../assets/login_img.png')}
                            style={{
                                width: '80%',
                                height: '80%',
                                resizeMode: 'contain',
                                borderRadius: 50
                            }}
                        />
                    </View>

                    <View style={{ flex: 1,paddingTop:20}}>
                        <Text style={{ color: 'white', paddingHorizontal: 35,fontSize: 32, fontFamily: 'Stag-Semibold',textAlign:'center'}}>
                            Por  favor  inicie  sesión  en  la  aplicación  para  poder  utilizar  esta  funcionalidad.
                        </Text>
                    </View>

                </View>

            </View>
        )
    }

    return (
        <FormContext>
            <SafeAreaView style={styles.container}>
                {isLogin ?
                    // carga pantalla de aviso  de que no esta logueado
                    noLogin()
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