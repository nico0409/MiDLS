import React from 'react';
import { parse } from 'fast-xml-parser';
import { PromptObserve, DlhrObserveEmplid } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';


export const PostEditObservCard = (bodyRequest: string) => {


  let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m38="http://xmlns.oracle.com/Enterprise/Tools/schemas/M161738.V1">\
    <soapenv:Header/>\
    <soapenv:Body>\
    <m38:Updatedata__CompIntfc__DLHR_TA_OBSERV_CI>\
    ${bodyRequest}\
    </m38:Updatedata__CompIntfc__DLHR_TA_OBSERV_CI>\
    </soapenv:Body>\
 </soapenv:Envelope>`;

  PSDB.post('/CI_DLHR_TA_OBSERV_CI.1.wsdl',
    xmls,
    {
      headers:
      {
        'Content-Type': 'text/xml',
        SOAPAction: 'UPDATEDATA.V1'
      }
    }).then(res => {
      console.log( res.status);
       
      console.log(JSON.stringify(parse(res.data)));

     
    }).catch(err => { console.log(err) });

}