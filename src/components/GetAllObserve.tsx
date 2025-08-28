import React from 'react';
import { parse } from 'fast-xml-parser';
import { AllObserve, AllObserveType } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';
import utf8 from 'utf8';

export const GetAllObserve = async (fecha: string, emplid: string, isError: boolean) => {

   let respuesta: AllObserveType = {}

   let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dlhr="http://xmlns.oracle.com/Enterprise/Tools/schemas/DLHR_MI_DLS.DLHR_REQUEST_ALL_OBSERVE.v1">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <dlhr:DLHR_REQUEST_ALL_OBSERVE>\
          <!--Optional:-->\
          <dlhr:fecha>${fecha}</dlhr:fecha>\
          <!--Optional:-->\
          <dlhr:emplid>${emplid}</dlhr:emplid>\
       </dlhr:DLHR_REQUEST_ALL_OBSERVE>\
    </soapenv:Body>\
 </soapenv:Envelope>`;

   await PSDB.post('/DLHR_APP_MIDLS_PROMP.1.wsdl',
      xmls,
      {
         headers:
         {
            'Content-Type': 'text/xml',
            SOAPAction: 'DL_HR_ALL_OBSERVE.v1',
            responseType: 'arraybuffer',
            responseEncoding: 'binary'
         }
      }).then(res => {
         //con esta validacion verifica si debe hacer decode
         let resData:string;
         if (/Ã[\x80-\xBF]|Â[\x80-\xBF]|â[\x80-\xBF]|�/.test(res.data)){
            resData = utf8.decode(res.data);
         }else{
            resData = res.data;
         }
         
         respuesta = {
            AllObserve: parse(resData),
            type: 'AllObserveType'
         }
         isError = false;
      }).catch(err => {
         isError = true;
      });
   return respuesta;
}
