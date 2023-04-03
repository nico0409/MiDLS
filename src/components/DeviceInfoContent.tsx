import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { useAllObserve } from '../hooks/useAllObserve';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { lastDataUpdateDttm, lastTObsUpdateDttm, StorageTypes, deviceId } from '../interfaces/prompInterfaces';
import { storageEmplid } from '../interfaces/storageInterface';
import { colors } from '../Themes/DlsTheme';
import { GetDeviceId } from './GetDeviceId';
import { GetPrompt } from './GetPrompt';
import { SendObserveStorage } from './SendObserveStorage';
import { Asingstorage, GetStorage } from './Storage';

export const DeviceInfoContent = () => {

    const { deviceId,brand, deviceName, model, externalIp } = useDeviceInfo();

    const [lastUpdDataDate, setLastUpdDataDate] = useState('-');
    const [lastTObsUpdateDttm, setLastTObsUpdateDttm] = useState('-');
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isErrorResponse, setIsErrorResponse] = useState(false);
    const [isErrorResponse2, setIsErrorResponse2] = useState(false);
    const [emplid, setEmplid] = useState('');

    const { ErrorResponse, loadAllObserve } = useAllObserve(emplid);

    const formattedDate = (d = new Date) => {

        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
        let hour = String(d.getHours());
        let minute = String(d.getMinutes());
        let second = String(d.getSeconds());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour.length < 2) hour = '0' + hour;
        if (minute.length < 2) minute = '0' + minute;
        if (second.length < 2) second = '0' + second;

        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }

    const getData = async (runEmplid: boolean) => {

        if (runEmplid) {
            function valEmplid(object: any): object is storageEmplid {
                return true
            }

            const getemplid = await GetStorage({ StorageType: 'emplid' });
            if (getemplid !== null) {
                if (valEmplid(getemplid)) {
                    setEmplid(getemplid.emplid);
                }
            }
        }

        function isAuthStorage(object: any): object is lastDataUpdateDttm {
            return true
        }

        const storageUpdDttmValue = await GetStorage({ StorageType: 'lastDataUpdateDttm' });
        if (storageUpdDttmValue !== null) {
            if (isAuthStorage(storageUpdDttmValue)) {
                setLastUpdDataDate(formattedDate(new Date(storageUpdDttmValue.dateUpd)));
            }
        }

        function isAuthStorage2(object: any): object is lastTObsUpdateDttm {
            return true
        }

        const storageObsDttmValue = await GetStorage({ StorageType: 'lastTObsUpdateDttm' });
        if (storageObsDttmValue !== null) {
            if (isAuthStorage2(storageObsDttmValue)) {
                setLastTObsUpdateDttm(formattedDate(new Date(storageObsDttmValue.dateUpd)));
            }
        }
    };

    const refreshData = async () => {

        setIsLoadingData(true);
        const prompts: StorageTypes = { StorageType: 'prompt' };

        await Asingstorage(prompts, await GetPrompt(setIsErrorResponse));

        if (emplid) {
            await loadAllObserve();
            setIsErrorResponse2(ErrorResponse);
            await SendObserveStorage();
        }

        setIsLoadingData(false);
        getData(false);
    };

    useEffect(() => {

        getData(true);

    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Detalles del dispositivo</Text>
            </View>

            <View style={styles.detailContainer}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>ID Dispositivo:</Text>
                    <Text style={styles.valueTextStyle}>{deviceId}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Nombre:</Text>
                    <Text style={styles.valueTextStyle}>{deviceName}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Marca:</Text>
                    <Text style={styles.valueTextStyle}>{brand}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Modelo:</Text>
                    <Text style={styles.valueTextStyle}>{model}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Dirección IP:</Text>
                    <Text style={styles.valueTextStyle}>{externalIp}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Fecha actualización Datos:</Text>
                    <Text style={styles.valueTextStyle}>{lastUpdDataDate}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Fecha actualización Observe:</Text>
                    <Text style={styles.valueTextStyle}>{lastTObsUpdateDttm}</Text>
                </View>
            </View>

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={styles.buttonContent}
                    onPress={() => refreshData()}>
                    {isLoadingData ?
                        <Chase size={40} color="white" /> :
                        <View>
                            <Text style={styles.buttonText}>Actualizar Datos</Text>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    titleContainer: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailContainer: {
        flexDirection: 'column',
    },
    titleText: {
        fontFamily: 'Stag-Semibold',
        color: colors.dlsYellowSecondary,
        fontSize: 20
    },
    fieldContainer: {
        alignItems: 'center',
        marginBottom: '2%'
    },
    fieldTextStyle: {
        color: colors.dlsYellowSecondary,
        fontSize: 24,
        fontFamily: 'StagSans-Light',
    },
    valueTextStyle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'StagSans-Light',
    },
    footerContainer: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        height: '65%',
        width: '75%',
        borderRadius: 25,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'Stag-Semibold',
    }
});