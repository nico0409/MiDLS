import React, { useEffect } from 'react'
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
/*import checkVersion from 'react-native-store-version';*/
import { checkVersion } from "react-native-check-version";

interface Props {
    setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    setLockScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckUpdateAndroid = async ({ setNeedsUpdate, setLockScreen }: Props) => {

    const init = async () => {

        try {

            const check = await checkVersion({platform: 'android'});
            
            if (check.needsUpdate === true) {
                let oldVersArr = DeviceInfo.getVersion().split('.');
                let newVersArr = check.version.split('.');

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

        setNeedsUpdate(await init())

    }
    /* return needsUpdate */
}
