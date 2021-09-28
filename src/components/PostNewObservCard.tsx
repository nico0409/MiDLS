import { useEffect } from 'react';
import { parse } from 'fast-xml-parser'
import { PromptObserve, DlhrObserveEmplid } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';


export const PostNewObservCard = (bodyRequest: string) => {



  console.log("inicia peticion");

  let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m38="http://xmlns.oracle.com/Enterprise/Tools/schemas/M558814.V1">\
    <soapenv:Header/>\
    <soapenv:Body>\
    <m38:Create__CompIntfc__DLHR_TA_OBSERV_CI>\
    ${bodyRequest}\
    </m38:Create__CompIntfc__DLHR_TA_OBSERV_CI>\
    </soapenv:Body>\
 </soapenv:Envelope>`;

  PSDB.post('http://www.dls-tst-peoplesoft.com:27600/PSIGW/PeopleSoftServiceListeningConnector/CI_DLHR_TA_OBSERV_CI.1.wsdl',
    xmls,
    {
      headers:
      {
        'Content-Type': 'text/xml',
        SOAPAction: 'Create.V1'
      }
    }).then(res => {

      console.log(JSON.stringify(parse(res.data)));

      console.log("finaliza la peticion");
    }).catch(err => { console.log(err) });

}