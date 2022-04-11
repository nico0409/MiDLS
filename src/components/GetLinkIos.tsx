import { parse } from 'fast-xml-parser';
import React from 'react'
import PSDB from '../api/PSDB';
import { IosVersion, IosVersionLink } from '../interfaces/prompInterfaces';

export const GetLinkIos = async () => {
   let respuesta: IosVersionLink = {}




   let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dls="http://xmlns.oracle.com/Enterprise/Tools/schemas/DLS_ICSA_TEST.DOC_TEST2.v1">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <dls:DOC_TEST2>\
           <!--Optional:-->\
           <dls:request></dls:request>\
        </dls:DOC_TEST2>\
     </soapenv:Body>\
  </soapenv:Envelope>';

   await PSDB.post('/DLHR_APP_MIDLS_PROMP.1.wsdl',
      xmls,
      {
         headers:
         {
            'Content-Type': 'text/xml',
            SOAPAction: 'DLHR_IOS_VER_LINK.v1',

         }
      }).then(res => {




         respuesta = parse((res.data));

      }).catch(err => {

      });
   return respuesta;
}
