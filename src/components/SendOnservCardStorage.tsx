import { j2xParser, parse } from 'fast-xml-parser';
import React from 'react'
import { ConvertXML } from '../../helpers/ConvertXML';
import PSDB from '../api/PSDB';
import { objUseForm } from '../interfaces/prompInterfaces'
import { DeleteStorage } from './Storage';

interface Params {
    data: objUseForm[];
    index: number,
}
export const SendOnservCardStorage =  async({ data, index }: Params) => {
    console.log("entre a enviar");
    const form = data[index]
    
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



try {
    const  resp=await  PSDB.post('/CI_DLHR_TA_OBSERV_CI.1.wsdl',
    xmls,
    {
        headers:
        {
            'Content-Type': 'text/xml',
            SOAPAction: 'Create.V1'
        }
    })

    if (resp.status === 200) {
        console.log('se ejecuta delete');
        
       
       await DeleteStorage(index) 

    }
} catch (error) {
    
    console.log(error)
    console.log(xml);
}
 
}
