import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { lastDataUpdateDttm, lastTObsUpdateDttm, StorageTypes } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';
import { GetStorage } from './Storage';

export const DeviceInfoContent = () => {

    const [brand, setBrand] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [model, setModel] = useState('');
    const [externalIp, setExternalIp] = useState('');
    const [lastUpdDataDate, setLastUpdDataDate] = useState('-');
    const [lastTObsUpdateDttm, setLastTObsUpdateDttm] = useState('-');

    useEffect(() => {

        setBrand(DeviceInfo.getBrand());

        DeviceInfo.getDeviceName().then((deviceName) => {
            setDeviceName(deviceName);
        });

        setModel(DeviceInfo.getModel());

        NetworkInfo.getIPV4Address().then(ipV4Addres => {
            ipV4Addres && setExternalIp(ipV4Addres);
        });

    }, []);

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

    const getData = async () => {

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

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Detalles del dispositivo</Text>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Nombre: </Text>
                    <Text style={styles.valueTextStyle}>{deviceName}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Marca: </Text>
                    <Text style={styles.valueTextStyle}>{brand}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Modelo: </Text>
                    <Text style={styles.valueTextStyle}>{model}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Dirección IP: </Text>
                    <Text style={styles.valueTextStyle}>{externalIp}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Fecha actualización Datos: </Text>
                    <Text style={styles.valueTextStyle}>{lastUpdDataDate}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTextStyle}>Fecha actualización Observe: </Text>
                    <Text style={styles.valueTextStyle}>{lastTObsUpdateDttm}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.buttonContent}
                        onPress={()=>(console.log('presionado'))}>
                        <View>
                            <Text style={styles.buttonText}>Actualizar Datos</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '5%'
    },
    detailContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
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
    buttonContainer: {
        width:'65%',
        height:'20%',
    },
    buttonContent: {
        flex:1,
        borderRadius: 25,
        backgroundColor: 'orange'
    },
    buttonText: {
        alignSelf: 'center',
    }
});