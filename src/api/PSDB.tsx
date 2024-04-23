import axios from 'axios';
import { Platform } from 'react-native';

const PSDB = axios.create({
    baseURL: 'http://10.0.10.251:27600/PSIGW/PeopleSoftServiceListeningConnector',
    timeout: Platform.OS === "ios" ? 19000 : 60000 
});

export default PSDB;


