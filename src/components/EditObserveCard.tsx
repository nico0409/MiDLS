import {  M38GetCompIntfcDLHRTAOBSERVCIResponse } from '../interfaces/prompInterfaces';
import {j2xParser} from 'fast-xml-parser'
import { PostEditObservCard } from './PostEditObservCard';

export const EditObservCard=(form:M38GetCompIntfcDLHRTAOBSERVCIResponse)=>{

    
     var defaultOptions = {
        attributeNamePrefix : "@_",
        attrNodeName: "@", //default is false
        textNodeName : "#text",
        ignoreAttributes : true,
        cdataTagName: "__cdata", //default is false
        cdataPositionChar: "\\c",
        format: false,
        indentBy: "  ",
        supressEmptyNode: true,
     //   tagValueProcessor: a=> he.encode(a, { useNamedReferences: true}),// default is a=>a
       // attrValueProcessor: a=> he.encode(a, {isAttributeValue: isAttribute, useNamedReferences: true})// default is a=>a
    };

     var parser = new j2xParser (defaultOptions);
    
     var xml = parser.parse(form);
     /* console.log(xml); */
     PostEditObservCard(xml);
     
}