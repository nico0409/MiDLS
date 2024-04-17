import React from 'react'
import PSDB from '../api/PSDB';
import { parse } from 'fast-xml-parser'
import { CheckVersionIos } from './checkVersionIos';
import { getVersion } from 'react-native-device-info';
import { Platform } from 'react-native';
import { GetLinkIos } from './GetLinkIos';

interface Props {
    setAppNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    setAppLockScreen: React.Dispatch<React.SetStateAction<boolean>>;
    setAppLinkUpdateIos: React.Dispatch<React.SetStateAction<string>>;
}

export const CheckUpdateIos = async ({ setAppNeedsUpdate, setAppLockScreen, setAppLinkUpdateIos }: Props) => {

    const init = async () => {
        try {
            const versionNew = await CheckVersionIos()
            const versionDevice = getVersion()

            const veriosnNewIos = versionNew['soapenv:Envelope']?.['soapenv:Body'].DOC_TEST2?.request;



            if (versionDevice !== veriosnNewIos) {

                let oldVersArr = versionDevice.split('.');
                let newVersArr = veriosnNewIos!.split('.');

                if (parseInt(newVersArr[0]) > parseInt(oldVersArr[0])) {
                    setAppLockScreen(true);
                } else if (parseInt(newVersArr[1]) > parseInt(oldVersArr[1])) {
                    setAppLockScreen(true);

                }
                let linkIos = (await GetLinkIos())['soapenv:Envelope']?.['soapenv:Body'].DLHR_RESPONSE_IOS_LINK?.LINK_IOS!;
                if (linkIos) {
                    setAppLinkUpdateIos(linkIos)
                } else {
                    return false
                }
                return true;

            } else return false;
        }
        catch (e) {

            return false;
        }

    }


    if (Platform.OS == 'ios') {

        setAppNeedsUpdate(await init())

    }
}

