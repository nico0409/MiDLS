import React, { useEffect } from 'react'
import { getVersion } from 'react-native-device-info';
import { Platform } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import checkVersion from 'react-native-store-version';

interface Props {
    setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    setLockScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckUpdateAndroid = async ({ setNeedsUpdate, setLockScreen }: Props) => {


    const init = async () => {
        try {
            const check = await checkVersion({
                version: getVersion(), // app local version
                androidStoreURL: 'https://play.google.com/store/apps/details?id=com.midls',
            });

            if (check.result === "new") {
                let oldVersArr = check.local.split('.');
                let newVersArr = check.remote.split('.');

                if (parseInt(newVersArr[0]) > parseInt(oldVersArr[0])) {
                    setLockScreen(true);
                } else if (parseInt(newVersArr[1]) > parseInt(oldVersArr[1])) {
                    setLockScreen(true);
                }

                return true;
            } else return false;
        } catch (e) {
            ;
            return false;
        }


    };


    if (Platform.OS == 'android') {


        //            if (isConnected === true) {

        //needsUpdate  =await init()
        setNeedsUpdate(await init())
        //          }

    }

    /* return needsUpdate */
}
