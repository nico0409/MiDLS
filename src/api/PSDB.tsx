import axios from 'axios';

const PSDB = axios.create({
    baseURL: 'http://www.dls-tst-peoplesoft.com:37600/PSIGW/PeopleSoftServiceListeningConnector'
});

export default PSDB;


