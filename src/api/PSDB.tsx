import axios from 'axios';
import { Platform } from 'react-native';

const PSDB = axios.create({
    baseURL: 'http://www.dls-tst-peoplesoft.com:27600/PSIGW/PeopleSoftServiceListeningConnector',
    timeout: Platform.OS === "ios" ? 19000 : 60000 
});

export default PSDB;


