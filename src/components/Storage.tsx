import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceID } from '../interfaces/deviceIdInterface';
import { StorageTypes, AllObserveType, PromptObserveType, objUseForm, DlhrAllObserve, statusAuthStorage, lastDataUpdateDttm, lastTObsUpdateDttm } from '../interfaces/prompInterfaces';
import { storageEmplid } from '../interfaces/storageInterface';

export const Asingstorage = async ({ StorageType }: StorageTypes, data: Object | Object[]) => {
    console.log("entrando a asignar", StorageType, data);

    /* StorageType === 'prompt' ?
        data.hasOwnProperty("PromptObserve") &&
        await AsyncStorage.setItem(StorageType, JSON.stringify(data)) :
        await AsyncStorage.setItem(StorageType, JSON.stringify(data)) */

    if (StorageType === 'prompt') {
        data.hasOwnProperty("PromptObserve") && await AsyncStorage.setItem(StorageType, JSON.stringify(data));

        await AsyncStorage.setItem('lastDataUpdateDttm', JSON.stringify({ dateUpd: new Date().toString() }));

    } else {
        await AsyncStorage.setItem(StorageType, JSON.stringify(data))
    }

}

export const GetStorage = async ({ StorageType }: StorageTypes) => {

    const Datos = await AsyncStorage.getItem(StorageType);

    switch (StorageType) {
        case 'allObserve':
            const allObserve: AllObserveType = JSON.parse(Datos!)
            return allObserve;

        case 'offlineObserveCards':
            const ObserveCard: objUseForm[] = JSON.parse(Datos!)
            return ObserveCard;

        case 'offlineObserveCardsDescr':
            const offfObsCardDesc: DlhrAllObserve[] = JSON.parse(Datos!)
            return offfObsCardDesc;

        case 'prompt':
            const prompt: PromptObserveType = JSON.parse(Datos!)
            return prompt;

        case 'emplid':
            const emplid: storageEmplid = JSON.parse(Datos!)
            return emplid;

        case 'signInStatus':
            const signInStatus: statusAuthStorage = JSON.parse(Datos!)
            return signInStatus;

        case 'lastDataUpdateDttm':
            const lastDataUpdateDttm: lastDataUpdateDttm = JSON.parse(Datos!)
            return lastDataUpdateDttm;

        case 'lastTObsUpdateDttm':
            const lastTObsUpdateDttm: lastTObsUpdateDttm = JSON.parse(Datos!)
            return lastTObsUpdateDttm;

        case 'deviceId':
            const deviceId: DeviceID = JSON.parse(Datos!)
            return deviceId;

        default:
            return null;

    }
}

const deleteFunction = async (data: any, dataDescr: any, item: number) => {
    function isofflineObserveCard(object: any): object is objUseForm[] {
        return true
    }
    function isofflineObserveCardDescr(object: any): object is objUseForm[] {
        return true
    }

    if (isofflineObserveCard(data)) {

        data.splice(item, 1);


        if (data.length === 0) {
            await AsyncStorage.removeItem('offlineObserveCards');
        } else {
            Asingstorage({ StorageType: 'offlineObserveCards' }, data);
        }

    }
    if (isofflineObserveCardDescr(dataDescr)) {

        dataDescr.splice(item, 1)
        if (data.length === 0) {
            await AsyncStorage.removeItem('offlineObserveCardsDescr');
            console.log("tarjeta en storage eliminada");
            
        } else {
            Asingstorage({ StorageType: 'offlineObserveCardsDescr' }, dataDescr);
        }
    }
}

export const DeleteStorage = async (items: number) => {

    const data = await GetStorage({ StorageType: 'offlineObserveCards' });
    const dataDescr = await GetStorage({ StorageType: 'offlineObserveCardsDescr' });
    await deleteFunction(data, dataDescr, items);

}


export const UpdateErrorState = async (item: number) => {

    function isofflineObserveCardDescr(object: any): object is DlhrAllObserve[] {
        return true
    }

    const dataDescr = await GetStorage({ StorageType: 'offlineObserveCardsDescr' });

    if (isofflineObserveCardDescr(dataDescr)) {
        dataDescr[item].ERR_TYPE = 'SERVER';
    }

    dataDescr && Asingstorage({ StorageType: 'offlineObserveCardsDescr' }, dataDescr);
};


export const DeleteStorageById = async (idTarjeta: string) => {

    function isofflineObserveCards(object: any): object is objUseForm[] {
        return true
    }
    function isofflineObserveCardDescr(object: any): object is DlhrAllObserve[] {
        return true
    }

    const data = await GetStorage({ StorageType: 'offlineObserveCards' });
    const dataDescr = await GetStorage({ StorageType: 'offlineObserveCardsDescr' });

    if (isofflineObserveCards(data)) {
        const newArrayData = data.filter(item => item['m38:DL_NTARJETA'] !== idTarjeta);
    
        if (newArrayData.length === 0) {
            await AsyncStorage.removeItem('offlineObserveCards');
        } else {
            await Asingstorage({ StorageType: 'offlineObserveCards' }, newArrayData);
        }
    }

    if (isofflineObserveCardDescr(dataDescr)) {
        const newArrayData = dataDescr.filter(item =>  item.NroTarjeta !== idTarjeta);

        if (newArrayData.length === 0) {
            await AsyncStorage.removeItem('offlineObserveCardsDescr');
        } else {
            await Asingstorage({ StorageType: 'offlineObserveCardsDescr' }, newArrayData);
        }
    }


}