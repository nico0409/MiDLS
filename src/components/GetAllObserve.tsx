import React from 'react';
import { parse } from 'fast-xml-parser';
import { AllObserve, AllObserveType } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';



export const GetAllObserve = async (fecha: string, emplid: string) => {

  let respuesta:AllObserveType={}

     

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

        
          
         
         respuesta={AllObserve: parse(decodeURIComponent(encodeURIComponent(res.data))),
         type:'AllObserveType'}
      }).catch(err => { console.log(err) }); 
return respuesta;
}
