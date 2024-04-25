import React, { createContext, useReducer, useState, useEffect } from 'react';
import { AppState } from 'react-native';
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

            //setReloadCardList(true);
            //setBackgroundRequestReload(true);
        }
    };

    const validateRefreshLoadObserveBG = async () => {
        console.log("comienza a validar refresh interno");
        
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
    const handleChange = (newState:any) =>{
        console.log("se ejecuto handleChange");
        
        if (newState === 'active') {
            validateRefreshLoadObserveBG();
        }
    }

    useEffect(() => {
        
        validateRefreshLoadObserveBG();
        AppState.addEventListener('change', handleChange);  
      
        return () => {
          AppState.removeEventListener('change', handleChange);  
        }
    }, [])

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
        await new Promise(async (resolve) => {
            let lastMinuteReaded = 0;
            for (let i = 0; BackgroundService.isRunning(); i++) {
                let minute = new Date().getMinutes();
                console.log("minute: ",minute,", lastMinuteReaded: ",lastMinuteReaded);
                
                switch (minute) {
                    case 0:
                    case 5:
                    case 10:
                    case 15:
                    case 20:
                    case 25:
                    case 30:
                    case 35:
                    case 40:
                    case 45:
                    case 50:
                    case 55:
                        if (lastMinuteReaded !== minute){
                            lastMinuteReaded = minute;
                            refreshData();
                        }
                }
                await sleep(30000);
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
        console.log("BackgroundService.isRunning():", BackgroundService.isRunning());
        if (BackgroundService.isRunning()) {
            console.log("servicio ya ejecutado");
        } else {
            console.log("ejecutar back service");
            BackgroundService.start(veryIntensiveTask, options);
        }
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


