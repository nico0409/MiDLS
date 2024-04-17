import axios from 'axios';
import { Platform } from 'react-native';

const PSDB = axios.create({
    baseURL: 'http://www.dls-peoplesoft.com:57609/PSIGW/PeopleSoftServiceListeningConnector',
    timeout: Platform.OS === "ios" ? 19000 : 60000 
});

export default PSDB;


