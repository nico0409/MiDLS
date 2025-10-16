import axios from 'axios';

const PSDB = axios.create({
    baseURL: 'http://www.dls-peoplesoft.com:57609/PSIGW/PeopleSoftServiceListeningConnector',
    timeout: 30000 
});

export default PSDB;


