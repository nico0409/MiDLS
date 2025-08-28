import React from 'react';
import PSDB from '../api/PSDB';
import { parse } from 'fast-xml-parser';
import { DeviceID, DlhrDeviceResp } from '../interfaces/deviceIdInterface';
import utf8 from 'utf8';

export const GetDeviceId = async (nombre: string, marca: string, modelo: string, ip: string) => {

    let respuesta: DeviceID = {}

    let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dlhr="http://xmlns.oracle.com/Enterprise/Tools/schemas/DLHR_MI_DLS.DLHR_DEVICE_REQ.v1">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <dlhr:DLHR_DEVICE_REQ>\
            <dlhr:nombre>${nombre}</dlhr:nombre>\
            <dlhr:marca>${marca}</dlhr:marca>\
            <dlhr:modelo>${modelo}</dlhr:modelo>\
            <dlhr:ip>${ip}</dlhr:ip>\
       </dlhr:DLHR_DEVICE_REQ>\
    </soapenv:Body>\
    </soapenv:Envelope>`;

    await PSDB.post('/DLHR_APP_MIDLS_PROMP.1.wsdl',
        xmls,
        {
            headers:
            {
                'Content-Type': 'text/xml',
                SOAPAction: 'DLHR_DEVICE_ID.v1',

            }
        }).then(res => {
            //con esta validacion verifica si debe hacer decode
            let resData:string;
            if (/Ã[\x80-\xBF]|Â[\x80-\xBF]|â[\x80-\xBF]|�/.test(res.data)){
               resData = utf8.decode(res.data);
            }else{
               resData = res.data;
            }
            
            respuesta = parse(resData);

        }).catch(err => {
        
        });

    return respuesta;

}