import React from 'react';
import { parse } from 'fast-xml-parser'
import { PromptObserve, DlhrObserveEmplid, PromptObserveType } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';
import utf8 from 'utf8';

export const GetPrompt = async (setIsErrorResponse: React.Dispatch<React.SetStateAction<boolean>>) => {


   let respuesta: PromptObserveType = {}

   console.log("se ejecuta GET PROMPT---------"); 
   

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
            SOAPAction: 'DLHR_APP_PROMPT.v2',

         }
      }).then(res => {
         //con esta validacion verifica si debe hacer decode
         let resData:string;
         if (/Ã[\x80-\xBF]|Â[\x80-\xBF]|â[\x80-\xBF]|�/.test(res.data)){
            resData = utf8.decode(res.data);
         }else{
            resData = res.data;
         }

         setIsErrorResponse(false);
         console.log(parse(resData));
         
         respuesta = {
            PromptObserve: parse(resData),
            type: 'PromptObserveType'
         };
      }).catch(err => {setIsErrorResponse(true)});
   return respuesta;
}




