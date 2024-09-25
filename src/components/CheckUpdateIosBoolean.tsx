import React from 'react';
import { CheckVersionIos } from './checkVersionIos';
import { getVersion } from 'react-native-device-info';
import { Platform } from 'react-native';

export const CheckUpdateIosBoolean = async () => {

    
    if (Platform.OS == 'ios') {
        try {
            const versionNew = await CheckVersionIos()
            const versionDevice = getVersion()

            const veriosnNewIos = versionNew['soapenv:Envelope']?.['soapenv:Body'].DOC_TEST2?.request;

            if (versionDevice !== veriosnNewIos) {

                let oldVersArr = versionDevice.split('.');
                let newVersArr = veriosnNewIos!.split('.');

                if (parseInt(newVersArr[0]) > parseInt(oldVersArr[0])) {
                    return true;
                } else if (parseInt(newVersArr[1]) > parseInt(oldVersArr[1])) {
                    return true;
                }

            } else return false;
        }
        catch (e) {
            return false;
        }
    }else return false;
}

