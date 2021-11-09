import { j2xParser, parse } from 'fast-xml-parser';
import React from 'react'
import { ConvertXML } from '../../helpers/ConvertXML';
import PSDB from '../api/PSDB';
import { objUseForm } from '../interfaces/prompInterfaces'
import { DeleteStorage } from './Storage';

interface Params {
    form: objUseForm;
    index:number
}
export const SendOnservCardStorage = ({ form,index }: Params) => {
    console.log("entre2");
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
        }).then(res => {
            console.log( res.status);
             console.log(JSON.stringify(parse(res.data)));

             if(res.status===200){
                DeleteStorage(index);

             }
      
           
          }).catch(err => { console.log(err)
            console.log(xmls);
            
         });



}
