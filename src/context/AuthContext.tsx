import { useNetInfo } from '@react-native-community/netinfo'
import React, { createContext, useReducer, useState, useEffect } from 'react'
import { authReducer, AuthState } from './authReducer'
import { SendObserveStorage } from '../components/SendObserveStorage';
import { Asingstorage, GetStorage } from '../components/Storage';
import { StorageTypes, lastDataUpdateDttm } from '../interfaces/prompInterfaces';
import { GetPrompt } from '../components/GetPrompt';

import BackgroundTimer from 'react-native-background-timer';
import { useAllObserve } from '../hooks/useAllObserve';
import { storageEmplid } from '../interfaces/storageInterface';
import { CheckUpdateAndroid } from '../components/CheckUpdateAndroid';
import { CheckUpdateIos } from '../components/CheckUpdateIos';



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
}

const authInitialState: AuthState = {
    status: 'checking',
    errorMessage: '',
}


export const AuthContext = createContext({} as AuthContextProps)



export const AuthProvider = ({ children }: any) => {

    const { isConnected } = useNetInfo();

    const [reloadCardList, setReloadCardList] = useState(false);

    const [appNeedsUpdate, setAppNeedsUpdate] = useState(false);
    const [appLockScreen, setAppLockScreen] = useState(false);
    const [appLinkUpdateIos, setAppLinkUpdateIos] = useState("");

    const [isErrorResponse, setIsErrorResponse] = useState(false);

    const [emplid, setEmplid] = useState('');
    const { ErrorResponse, loadAllObserve } = useAllObserve(emplid);

    let currentUrlNews = '';
    let currentUrlProfile = '';
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const sendObserve = async () => {
        await SendObserveStorage();
        setReloadCardList(true);
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
            currentUrlNews.includes('https://midls.dls-archer.com/midls/mi-recibo/') ||
            currentUrlNews.includes('https://midls.dls-archer.com/midls/contacto-2/') ||
            currentUrlNews.includes('https://midls.dls-archer.com/midls/consultas-y-reclamos/')
        ) && state.status != 'authenticated') {
            await Asingstorage({ StorageType: 'signInStatus' }, { status: true });

            dispatch({ type: 'signIn' })
        }
        if (((currentUrlNews.includes('https://midls.dls-archer.com/midls/login/') ||
            currentUrlProfile.includes('https://midls.dls-archer.com/midls/login/')) && (state.status == 'authenticated' || state.status == 'checking'))) {

            dispatch({ type: 'logOut' })
        }

    };

    const getEmplid = async () => {

        function valEmplid(object: any): object is storageEmplid { return true }

        const getemplid = await GetStorage({ StorageType: 'emplid' });
        if (getemplid !== null) {
            if (valEmplid(getemplid)) {
                setEmplid(getemplid.emplid);
            }
        }
    }

    const refreshData = async () => {

        await CheckUpdateAndroid({ setAppNeedsUpdate, setAppLockScreen });
        await CheckUpdateIos({ setAppNeedsUpdate, setAppLockScreen, setAppLinkUpdateIos });

        if (appLockScreen) {

            const prompts: StorageTypes = { StorageType: 'prompt' };

            await getEmplid();

            await Asingstorage(prompts, await GetPrompt(setIsErrorResponse));

            if (emplid) {
                await loadAllObserve();
                await SendObserveStorage();
            }
        }
    };

    const validateCustomTime = async () => {

        /* la función consiste en que pueda actualizar los datos entre los horarios de 5hs - 7hs(incluido), 13hs a 14hs(incluido) y 21hs a 22hs(incluido)*/

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
    };

    useEffect(() => {

        if (isConnected === true) {
            console.log("enviando storage");

            sendObserve();
        }

    }, [isConnected])

    useEffect(() => {

        BackgroundTimer.runBackgroundTimer(() => {
            console.log("se ejecuto background timer");
            validateCustomTime();
        }, 3600000); 

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
            setAppLinkUpdateIos
        }}>
            {children}
        </AuthContext.Provider>
    )

}


