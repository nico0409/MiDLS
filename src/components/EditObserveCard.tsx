import { M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import { j2xParser } from 'fast-xml-parser'
import { PostEditObservCard } from './PostEditObservCard';
import PSDB from '../api/PSDB';
import { parse } from 'fast-xml-parser';
import { ConvertXML } from '../../helpers/ConvertXML';


interface Props {
   form: M38GetCompIntfcDLHRTAOBSERVCIResponse;
   alertSend: (sended: boolean, typeError?: 'NETWORK' | 'SERVER') => void;
   setReloadCardList: React.Dispatch<React.SetStateAction<boolean>>;
   setIsLoadingResponse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditObservCard = ({ form, alertSend,setReloadCardList,setIsLoadingResponse }: Props) => {




    let defaultOptions = {
      attributeNamePrefix: "@_",
      attrNodeName: "@", //default is false
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataTagName: "__cdata", //default is false
      cdataPositionChar: "\\c",
      format: false,
      indentBy: "  ",
      supressEmptyNode: true,
     
   };

   let parser = new j2xParser(defaultOptions);

     ConvertXML(form); 
   let xml:String = parser.parse(form);
  
     
   let xmlRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m38="http://xmlns.oracle.com/Enterprise/Tools/schemas/M161738.V1">\
    <soapenv:Header/>\
    <soapenv:Body>\
    <m38:Updatedata__CompIntfc__DLHR_TA_OBSERV_CI>\
    ${xml}\
    </m38:Updatedata__CompIntfc__DLHR_TA_OBSERV_CI>\
    </soapenv:Body>\
 </soapenv:Envelope>`; 



   PSDB.post('/CI_DLHR_TA_OBSERV_CI.1.wsdl',
   xmlRequest,
      {
         headers:
         {
            'Content-Type': 'text/xml',
            SOAPAction: 'UPDATEDATA.V1'
         }
      }).then(res => {
         res.status===200?alertSend(true):alertSend(false)
         setReloadCardList(true);

         setIsLoadingResponse(false);      


      }).catch(err => {

         alertSend(false,err.response ? 'SERVER': 'NETWORK');  

         setIsLoadingResponse(false);      
      }) 

}