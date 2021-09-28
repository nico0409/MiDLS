import React from 'react';
import { parse } from 'fast-xml-parser'
import { PromptObserve, DlhrObserveEmplid } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';


export const GetPrompt = async () => {

   let respuesta: PromptObserve = {}



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
            SOAPAction: 'DLHR_APP_PROMPT.v1'
         }
      }).then(res => {




         respuesta = parse(res.data);


         let empleado = respuesta['soapenv:Envelope']!['soapenv:Body']!.DLHR_OBSERVE_PROMPT!.DLHR_OBSERVE_EMPLID;

         /* (Array.isArray(empleado))?
           console.log(empleado[0].NOMBRE):
           console.log(empleado!.NOMBRE); */

      }).catch(err => { console.log(err) });
   return respuesta;
}




