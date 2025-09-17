import axios from 'axios';

const PSDB = axios.create({
    baseURL: 'http://10.0.10.251:27600/PSIGW/PeopleSoftServiceListeningConnector',
    timeout: 6000 
});

export default PSDB;


