import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageTypes, AllObserveType, PromptObserveType, objUseForm } from '../interfaces/prompInterfaces';
import { storageEmplid } from '../interfaces/storageInterface';

export const Asingstorage = async ({ StorageType }: StorageTypes, data: Object | Object[]) => {
    await AsyncStorage.setItem(StorageType, JSON.stringify(data));
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

        case 'prompt':
            const prompt: PromptObserveType = JSON.parse(Datos!)
            return prompt;

        case 'emplid':
            const emplid: storageEmplid = JSON.parse(Datos!)
            return emplid
    }
}