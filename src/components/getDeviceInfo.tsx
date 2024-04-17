import React, { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { GetStorage } from '../components/Storage';
import { DeviceID } from '../interfaces/deviceIdInterface';

export const getDeviceInfo = async () => {

    let deviceId :string;
    let brand :string;
    let deviceName :string;
    let model :string;
    let externalIp :string;

    const getDeviceId = async() =>{

        function valDeviceObj(object: any): object is DeviceID {
            return true
        }

        const getDeviceId = await GetStorage({ StorageType: 'deviceId' });
        if (getDeviceId !== null) {
            if (valDeviceObj(getDeviceId)) {
                if (getDeviceId['soapenv:Envelope']?.['soapenv:Body']?.DLHR_DEVICE_RESP?.dls_device_id ===undefined){
                    return '';
                }else{
                    return getDeviceId['soapenv:Envelope']?.['soapenv:Body']?.DLHR_DEVICE_RESP?.dls_device_id;
                }
            }else return '';
        }else return '';
}

    deviceId = await getDeviceId();
    brand = DeviceInfo.getBrand();
    deviceName = await DeviceInfo.getDeviceName().then((name) => {return name});
    model = DeviceInfo.getModel();
    externalIp = await NetworkInfo.getIPV4Address().then((ipV4Addres) => {return ipV4Addres ? ipV4Addres : ''});


    return { deviceId, brand, deviceName, model, externalIp }

}