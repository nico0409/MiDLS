import React from 'react';
import { parse } from 'fast-xml-parser'
import { PromptObserve, DlhrObserveEmplid, PromptObserveType } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';

export const GetPrompt = async (setIsErrorResponse: React.Dispatch<React.SetStateAction<boolean>>) => {


   let respuesta: PromptObserveType = {}



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
            SOAPAction: 'DLHR_APP_PROMPT.v1',

         }
      }).then(res => {
         setIsErrorResponse(false);
         respuesta = {
            PromptObserve: parse(decodeURIComponent(escape(res.data))),
            type: 'PromptObserveType'
         };
      }).catch(err => {setIsErrorResponse(true)});
   return respuesta;
}




