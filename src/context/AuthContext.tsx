import React, { createContext, useReducer, useState, useEffect } from 'react';
import { AppState, Platform, PermissionsAndroid } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { authReducer, AuthState } from './authReducer'
import { SendObserveStorage } from '../components/SendObserveStorage';
import { Asingstorage, GetStorage } from '../components/Storage';
import { StorageTypes, lastDataUpdateDttm, refreshLoadObserveBG } from '../interfaces/prompInterfaces';
import { GetPrompt } from '../components/GetPrompt';

/* import BackgroundTimer from 'react-native-background-timer'; */
import { CheckUpdateAndroid } from '../components/CheckUpdateAndroid';
import { CheckUpdateIos } from '../components/CheckUpdateIos';

import BackgroundService from 'react-native-background-actions';
import { useAppState } from '../hooks/useAppState';
import { colors } from '../Themes/DlsTheme';
import { CheckUpdateAndroidBoolean } from '../components/CheckUpdateAndroidBoolean';
import { CheckUpdateIosBoolean } from '../components/CheckUpdateIosBoolean';

type AuthContextProps = {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    errorMessage: string | null;
    currentUrlNews: string;
    currentUrlProfile: string;
    signIn: () => void;
    logOut: () => void;
    removeError: () => void;
    changeURLNews: (url: string) => void;
    changeURLProfile: (url: string) => void;
    reloadCardList: boolean;
    setReloadCardList: React.Dispatch<React.SetStateAction<boolean>>;
    appNeedsUpdate: boolean;
    setAppNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    appLockScreen: boolean;
    setAppLockScreen: React.Dispatch<React.SetStateAction<boolean>>;
    appLinkUpdateIos: string;
    setAppLinkUpdateIos: React.Dispatch<React.SetStateAction<string>>;
    backgroundRequestReload: boolean;
    setBackgroundRequestReload: React.Dispatch<React.SetStateAction<boolean>>
}

const authInitialState: AuthState = {
    status: 'checking',
    errorMessage: '',
}

type options = {
    taskName: string;
    taskTitle: string;
    taskDesc: string;
    taskIcon: {
        name: string;
        type: string;
        package?: string;
    };
    color?: string | undefined;
    linkingURI?: string | undefined;
    parameters: {
        delay: number;
    };
}

export const AuthContext = createContext({} as AuthContextProps)



export const AuthProvider = ({ children }: any) => {

    const { isConnected } = useNetInfo();

    const [reloadCardList, setReloadCardList] = useState(false);
    const [backgroundRequestReload, setBackgroundRequestReload] = useState(false);

    const [appNeedsUpdate, setAppNeedsUpdate] = useState(false);
    const [appLockScreen, setAppLockScreen] = useState(false);
    const [appLinkUpdateIos, setAppLinkUpdateIos] = useState("");

    const { status } = useAppState();

    const [isErrorResponse, setIsErrorResponse] = useState(false);

    let currentUrlNews = '';
    let currentUrlProfile = '';
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const sendObserve = async () => {
        await SendObserveStorage();
        setReloadCardList(true);
        setBackgroundRequestReload(true);
    }

    const logOut = () => { };

    const removeError = () => { };

    const changeURLNews = (url: string) => {
        currentUrlNews = url;
    }

    const changeURLProfile = (url: string) => {
        currentUrlProfile = url;
    }

    const signIn = async () => {

        if ((currentUrlProfile.includes('https://midls.dls-archer.com/midls/user/') ||
            currentUrlNews.includes('https://midls.dls-archer.com/midls/noticias/') ||
            currentUrlNews.includes('https://midls.dls-archer.com/midls/noticias-dls-buenos-aires/') ||
            /* currentUrlNews.includes('https://midls.dls-archer.com/midls/mi-recibo/') || */
            currentUrlNews.includes('https://midls.dls-archer.com/midls/contacto-2/') ||
            currentUrlNews.includes('https://midls.dls-archer.com/midls/consultas-y-reclamos/')
        ) && state.status != 'authenticated') {
            await Asingstorage({ StorageType: 'signInStatus' }, { status: true });

            dispatch({ type: 'signIn' })
        }
        if (((currentUrlNews.includes('https://midls.dls-archer.com/midls/login/') ||
            currentUrlNews.includes('https://midls.dls-archer.com/midls/login/?redirect_to=https%3A%2F%2Fmidls.dls-archer.com%2Fmidls%2Fuser%2F') ||
            currentUrlProfile.includes('https://midls.dls-archer.com/midls/login/') ||
            currentUrlProfile.includes('https://midls.dls-archer.com/midls/login/?redirect_to=https%3A%2F%2Fmidls.dls-archer.com%2Fmidls%2Fuser%2F')) && (state.status == 'authenticated' || state.status == 'checking'))) {

            dispatch({ type: 'logOut' })
        }

    };

    const checkAppUpdates = async () => {
        Platform.OS === "android" && await CheckUpdateAndroid({ setAppNeedsUpdate, setAppLockScreen });
        Platform.OS === "ios" && await CheckUpdateIos({ setAppNeedsUpdate, setAppLockScreen, setAppLinkUpdateIos });
    }

    const validateRefreshLoadObserveBG = async () => {
        console.log("se inicia validateRefreshLoadObserveBG");

        checkAppUpdates();

        function validateObject(object: any): object is refreshLoadObserveBG {
            return true
        }
        const getRefreshBGValue = await GetStorage({ StorageType: 'refreshLoadObserveBG' });

        if (getRefreshBGValue !== null) {
            if (validateObject(getRefreshBGValue)) {
                console.log("getRefreshBGValue.refreshLoadObserve", getRefreshBGValue.refreshLoadObserve);

                getRefreshBGValue.refreshLoadObserve && setReloadCardList(true);
                getRefreshBGValue.refreshLoadObserve && setBackgroundRequestReload(true);
                getRefreshBGValue.refreshLoadObserve && await Asingstorage({ StorageType: 'refreshLoadObserveBG' }, { refreshLoadObserve: false });
            }
        }
    }

    const refreshData = async (refreshPromptToo: boolean) => {
        
        //se chequea primero las validaciones de la version de la app en boolean porque si validamos por States, no lo hace correctamente.
        if (await CheckUpdateAndroidBoolean() || await CheckUpdateIosBoolean()) {
            console.log("background service finished");
            await BackgroundService.stop();
            //se chequeo que se ejecuta codigo despues de hacer el stop, asi que enviamos a ejecutar checkAppUpdates para que muestre el modal en el momento en caso de estar con la app activa
            await checkAppUpdates();
        } else {
            console.log("background service NO finished");
            if (refreshPromptToo) {
                const prompts: StorageTypes = { StorageType: 'prompt' };
                await Asingstorage(prompts, await GetPrompt(setIsErrorResponse));
            }

            await SendObserveStorage();

            console.log("AppState:", AppState.currentState);
            switch (AppState.currentState) {
                case 'background':
                case 'inactive':
                    await Asingstorage({ StorageType: 'refreshLoadObserveBG' }, { refreshLoadObserve: true });
                    break;
                case 'active':
                    setReloadCardList(true);
                    setBackgroundRequestReload(true);
                    break;
                default:
                    break;
            }
        }
    };

    //@ts-ignore
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async (taskDataArguments: any) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            let counterTo1hs = 0;
            for (let i = 0; BackgroundService.isRunning(); i++) {

                if (i > 0 && i % 15 === 0) {
                    counterTo1hs = counterTo1hs + 1;
                    if (counterTo1hs === 4) {
                        //true = refresh prompt too
                        // se ejecuta cada 1hs
                        refreshData(true);
                        counterTo1hs = 0;
                        console.log(new Date());

                    } else {
                        // se ejecuta cada 15min 
                        refreshData(false);
                        console.log(new Date());
                    }
                }
                await sleep(delay);
            }
        });
    };

    const options = {
        taskName: 'Mi Dls Sincronización',
        taskTitle: 'Mi Dls - Sincronización',
        taskDesc: 'Servicio de sincronización de datos Activo.',
        taskIcon: {
            name: 'white_dls_logo',
            type: 'mipmap',
        },
        color: colors.dlsGrayPrimary,
        linkingURI: ' ',
        parameters: {
            delay: 60000,/* 1 min */
        },
    };

    const runBackgroundService = async () => {
        console.log("BackgroundService.isRunning():", BackgroundService.isRunning());
        if (BackgroundService.isRunning()) {
            console.log("servicio ya ejecutado");
        } else {
            console.log("ejecutar back service");
            await BackgroundService.start(veryIntensiveTask, options);
        }
    };

    useEffect(() => {
        if (status === "active") {
            validateRefreshLoadObserveBG();
        }
    }, [status]);

    useEffect(() => {
        if (isConnected === true) {
            sendObserve();
        }
    }, [isConnected]);

    useEffect(() => {
        runBackgroundService();
    }, []);

    const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permiso para notificaciones denegado");
            }
        }
    };

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            logOut,
            removeError,
            changeURLNews,
            changeURLProfile,
            currentUrlNews,
            currentUrlProfile,
            reloadCardList,
            setReloadCardList,
            appNeedsUpdate,
            setAppNeedsUpdate,
            appLockScreen,
            setAppLockScreen,
            appLinkUpdateIos,
            setAppLinkUpdateIos,
            backgroundRequestReload,
            setBackgroundRequestReload
        }}>
            {children}
        </AuthContext.Provider>
    )

}


