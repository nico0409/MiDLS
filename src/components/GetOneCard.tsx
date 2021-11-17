import { useEffect } from 'react';
import { parse } from 'fast-xml-parser'
import { PromptObserve, DlhrObserveEmplid, AllObserveType, InterfGetOnesCard, OneObservType } from '../interfaces/prompInterfaces';
import PSDB from '../api/PSDB';


export const GetOneCard = async (OneCard: InterfGetOnesCard) => {

    let respuesta: OneObservType = {}

    let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m38="http://xmlns.oracle.com/Enterprise/Tools/schemas/M1034079.V1">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <m38:Get__CompIntfc__DLHR_TA_OBSERV_CI>\
        <m38:BUSINESS_UNIT>${OneCard.busineesUnit}</m38:BUSINESS_UNIT>\
        <m38:DL_IDENTIF_DT>${OneCard.IdentifDt}</m38:DL_IDENTIF_DT>\
        <m38:DL_NTARJETA>${OneCard.Ntarjeta}</m38:DL_NTARJETA>\
     </m38:Get__CompIntfc__DLHR_TA_OBSERV_CI>\
  </soapenv:Body>\
</soapenv:Envelope>`;
(await PSDB.post('/CI_DLHR_TA_OBSERV_CI.1.wsdl',
        xmls,
        {
            headers:
            {
                'Content-Type': 'text/xml',
                SOAPAction: 'GET.V1'
            }
        }).then(
            res => {              
                respuesta = parse(decodeURIComponent(encodeURIComponent(res.data)))
            }

        ))




    return respuesta['soapenv:Envelope']?.['soapenv:Body']?.['m38:Get__CompIntfc__DLHR_TA_OBSERV_CIResponse'];
}