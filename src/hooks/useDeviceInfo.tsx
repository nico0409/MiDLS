import React, { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { GetStorage } from '../components/Storage';
import { DeviceID } from '../interfaces/deviceIdInterface';

export const useDeviceInfo = () => {

    const [deviceId, setDeviceId] = useState('');
    const [brand, setBrand] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [model, setModel] = useState('');
    const [externalIp, setExternalIp] = useState('');

    const getDeviceId = async () => {

        function valDeviceObj(object: any): object is DeviceID {
            return true
        }

        const getDeviceId = await GetStorage({ StorageType: 'deviceId' });
        if (getDeviceId !== null) {
            if (valDeviceObj(getDeviceId)) {
                setDeviceId(getDeviceId['soapenv:Envelope']?.['soapenv:Body']?.DLHR_DEVICE_RESP?.dls_device_id!);
            }
        }
    }

    const promisesInfo = async () => {

        await DeviceInfo.getDeviceName().then((deviceName) => {
            setDeviceName(deviceName);
        });

        await NetworkInfo.getIPV4Address().then(ipV4Addres => {
            ipV4Addres && setExternalIp(ipV4Addres);
        });
    };

    useEffect(() => {
        getDeviceId();
        setBrand(DeviceInfo.getBrand());
        setModel(DeviceInfo.getModel());
        promisesInfo();
    }, []);


    return { deviceId, brand, deviceName, model, externalIp }

}