import { useNetInfo } from '@react-native-community/netinfo'
import React, { createContext, useReducer, useState, useEffect } from 'react'
import { authReducer, AuthState } from './authReducer'
import { SendObserveStorage } from '../components/SendObserveStorage';
import { Asingstorage, GetStorage } from '../components/Storage';
import { StorageTypes, lastDataUpdateDttm } from '../interfaces/prompInterfaces';
import { GetPrompt } from '../components/GetPrompt';

/* import BackgroundTimer from 'react-native-background-timer'; */
import { useAllObserve } from '../hooks/useAllObserve';
import { storageEmplid } from '../interfaces/storageInterface';
import { CheckUpdateAndroid } from '../components/CheckUpdateAndroid';
import { CheckUpdateIos } from '../components/CheckUpdateIos';

import BackgroundService from 'react-native-background-actions';
/* import { AppState } from 'react-native'; */

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

    const refreshData = async () => {
        console.log("se inicia refresh data");

        await CheckUpdateAndroid({ setAppNeedsUpdate, setAppLockScreen });
        await CheckUpdateIos({ setAppNeedsUpdate, setAppLockScreen, setAppLinkUpdateIos });

        if (!appLockScreen) {

            const prompts: StorageTypes = { StorageType: 'prompt' };

            await Asingstorage(prompts, await GetPrompt(setIsErrorResponse));

            await SendObserveStorage();
            await Asingstorage({ StorageType: 'lastTObsUpdateDttm' }, { dateUpd: new Date().toString() });
            setReloadCardList(true);
            setBackgroundRequestReload(true);
        }
    };

    /* const validateCustomTime = async () => {

        //la función consiste en que pueda actualizar los datos entre los horarios de 5hs - 7hs(incluido), 13hs a 14hs(incluido) y 21hs a 22hs(incluido)

        const actualDate = new Date();

        function valDateIntfc(object: any): object is lastDataUpdateDttm { return true }

        const lastDate = await GetStorage({ StorageType: 'lastDataUpdateDttm' });

        if (lastDate !== null && valDateIntfc(lastDate)) {

            const lastDateFormatted = new Date(lastDate.dateUpd);
            const lastDateHour = lastDateFormatted.getHours();
            const actualHour = actualDate.getHours();

            if (lastDateFormatted.getFullYear() === actualDate.getFullYear() && lastDateFormatted.getMonth() === actualDate.getMonth() && lastDateFormatted.getDay() === actualDate.getDay()) {

                if ((actualHour >= 5 && actualHour <= 7 && lastDateHour < 5) ||
                    (actualHour >= 13 && actualHour <= 14 && lastDateHour < 13) ||
                    (actualHour >= 21 && actualHour <= 22 && lastDateHour < 21)) {
                    refreshData();
                }

            } else {
                if ((actualHour >= 5 && actualHour <= 7) ||
                    (actualHour >= 13 && actualHour <= 14) ||
                    (actualHour >= 21 && actualHour <= 22)) {
                    refreshData();
                }
            }
        }
    }; */

    useEffect(() => {

        if (isConnected === true) {
            console.log("enviando storage");

            sendObserve();
        }

    }, [isConnected])

    //@ts-ignore
    const sleep = (time: number) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async (taskDataArguments: any) => {
        // Example of an infinite loop task
        console.log("BackgroundService.isRunning():", BackgroundService.isRunning());

        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                
                switch (new Date().getMinutes()) {
                    case 0:
                    case 5:
                    case 10:
                    case 15:
                    case 25:
                    case 30:
                    case 35:
                    case 40:
                    case 45:
                    case 55:
                        console.log("se realizo refresh de background");
                        
                        refreshData();
                        break;
                }
                //console.log("AppState:",AppState.currentState);
                await sleep(60000);
            }
        });
    };

    const options = {
        taskName: 'Mi Dls Sincronización',
        taskTitle: 'Mi Dls',
        taskDesc: 'Servicio de sincronización de datos Activo.',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        linkingURI: '-',
        parameters: {
            delay: 1000,
        },
    };

    useEffect(() => {

        /* BackgroundTimer no funciona correctamente en Android 13, se utiliza Background Service en su reemplazo */
        /* BackgroundTimer.runBackgroundTimer(() => {
            console.log("se ejecuto background timer ", new Date());
            refreshData();
        }, 600000); */
        console.log("ejecutar back service");

        BackgroundService.start(veryIntensiveTask, options);
        /* BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call */
        // iOS will also run everything here in the background until .stop() is called
        //BackgroundService.stop();

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


