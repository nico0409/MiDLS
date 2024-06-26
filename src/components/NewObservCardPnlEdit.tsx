import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';
import { j2xParser } from 'fast-xml-parser'
import PSDB from '../api/PSDB';
import { parse } from 'fast-xml-parser';
import { ConvertXML } from '../../helpers/ConvertXML';
import { RespNewCard } from '../interfaces/respNewCardObs';
import { DeleteStorageById } from './Storage';


interface Props {
   form: objUseForm;
   alertSend: (sended: boolean, typeError?: 'NETWORK' | 'SERVER') => void;
   setReloadCardList: React.Dispatch<React.SetStateAction<boolean>>;
   onChange: (value: string, field: keyof M38GetCompIntfcDLHRTAOBSERVCIResponse) => void;
   formStateSend: M38GetCompIntfcDLHRTAOBSERVCIResponse;
   setErrorType: React.Dispatch<React.SetStateAction<string>>;
   setIsLoadingResponse: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewObservCardPnlEdit = ({ form, alertSend,setReloadCardList,onChange,formStateSend,setErrorType,setIsLoadingResponse }: Props) => {

   var defaultOptions = {
      attributeNamePrefix: "@_",
      attrNodeName: "@", //default is false
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataTagName: "__cdata", //default is false
      cdataPositionChar: "\\c",
      format: false,
      indentBy: "  ",
      supressEmptyNode: true,
      //   tagValueProcessor: a=> he.encode(a, { useNamedReferences: true}),// default is a=>a
      // attrValueProcessor: a=> he.encode(a, {isAttributeValue: isAttribute, useNamedReferences: true})// default is a=>a
   };

   ConvertXML(form);
   var parser = new j2xParser(defaultOptions);
   var xml = parser.parse(form);

   let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m38="http://xmlns.oracle.com/Enterprise/Tools/schemas/M558814.V1">\
   <soapenv:Header/>\
   <soapenv:Body>\
   <m38:Create__CompIntfc__DLHR_TA_OBSERV_CI>\
   ${xml}\
   </m38:Create__CompIntfc__DLHR_TA_OBSERV_CI>\
   </soapenv:Body>\
   </soapenv:Envelope>`;

   PSDB.post('/CI_DLHR_TA_OBSERV_CI.1.wsdl',
   xmls,
   {
      headers:
      {
         'Content-Type': 'text/xml',
         SOAPAction: 'Create.V1'
      }
   }).then(async (res) => {

      const resp: RespNewCard = parse(res.data);

      const dlTarjeta:string = resp['soapenv:Envelope']['soapenv:Body']['m38:Create__CompIntfc__DLHR_TA_OBSERV_CIResponse']['m38:detail']['m38:DLHR_TA_OBSERV_CI']['m38:DL_NTARJETA'];

      await DeleteStorageById(formStateSend['m38:DL_NTARJETA']!);

      onChange(dlTarjeta,'m38:DL_NTARJETA');

      setReloadCardList(true);
      setErrorType('');
      alertSend(true);

      setIsLoadingResponse(false);      

   }).catch(async (err) => {
      setErrorType(err.response ? 'SERVER': 'NETWORK');
      alertSend(false,err.response ? 'SERVER': 'NETWORK');
      
      setIsLoadingResponse(false);    
   })

}