import React from 'react'
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { checkVersion } from "react-native-check-version";

export const CheckUpdateAndroidBoolean = async () => {

    if (Platform.OS == 'android') {

        try {

            const check = await checkVersion({platform: 'android'});
            
            if (check.needsUpdate === true) {
                let oldVersArr = DeviceInfo.getVersion().split('.');
                let newVersArr = check.version.split('.');
                
                if (parseInt(newVersArr[0]) > parseInt(oldVersArr[0])) {
                    return true;
                } else if (parseInt(newVersArr[1]) > parseInt(oldVersArr[1])) {
                    return true ;
                }

            } else return false;
        } catch (e) {
            return false;
        }
    }else return false;
}
