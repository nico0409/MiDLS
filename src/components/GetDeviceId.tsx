import React from 'react';
import PSDB from '../api/PSDB';
import { parse } from 'fast-xml-parser';
import { DeviceID, DlhrDeviceResp } from '../interfaces/deviceIdInterface';

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
            respuesta = parse(decodeURIComponent(escape(res.data)));

        }).catch(err => {
        
        });

    return respuesta;

}