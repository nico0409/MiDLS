import {useEffect} from 'react';
import axios from 'axios';


 export const  GetPrompt = () => {

 let respuesta :any

    console.log("inicia peticion");

    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dls="http://xmlns.oracle.com/Enterprise/Tools/schemas/DLS_ICSA_TEST.DOC_TEST2.v1">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <dls:DOC_TEST2>\
          <!--Optional:-->\
          <dls:request></dls:request>\
       </dls:DOC_TEST2>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    axios.post('http://www.dls-tst-peoplesoft.com:27600/PSIGW/PeopleSoftServiceListeningConnector/DLHR_APP_MIDLS_PROMP.1.wsdl',
      xmls,
      {
        headers:
        {
          'Content-Type': 'text/xml',
          SOAPAction: 'DLHR_APP_PROMPT.v1'
        }
      }).then(res => {
        console.log(res.data);
        respuesta=res;
        console.log("finaliza la peticion");
      }).catch(err => { console.log(err) });

}