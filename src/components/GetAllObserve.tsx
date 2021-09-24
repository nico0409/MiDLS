import {useEffect} from 'react';
import axios from 'axios';
import {parse} from 'fast-xml-parser'
import { AllObserve } from '../interfaces/prompInterfaces';



 export const  GetAllObserve = (fecha:string,emplid:string) => {

  let respuesta:AllObserve

     console.log("inicia peticion");

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


 
    axios.post('http://www.dls-tst-peoplesoft.com:27600/PSIGW/PeopleSoftServiceListeningConnector/DLHR_APP_MIDLS_PROMP.1.wsdl',
      xmls,
      {
        headers:
        {
          'Content-Type': 'text/xml',
          SOAPAction: 'DL_HR_ALL_OBSERVE.v1'
        }
      }).then(res => {

        respuesta= parse(res.data)
         let tarjeta = respuesta['soapenv:Envelope']['soapenv:Body'].DLHR_ALL_OBSERVE_COLL.DLHR_ALL_OBSERVE;
console.log(Array.isArray(tarjeta)?tarjeta[0].NroTarjeta:tarjeta.NroTarjeta);
        console.log("finaliza la peticion");
      }).catch(err => { console.log(err) }); 

}
