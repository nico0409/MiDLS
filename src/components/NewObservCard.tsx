import { Dimensions } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { j2xParser, parse } from 'fast-xml-parser';

import PSDB from '../api/PSDB';
import { objUseForm } from '../interfaces/prompInterfaces';

const { height } = Dimensions.get('window');

interface Params{
   form: objUseForm;
   setReqSended: React.Dispatch<React.SetStateAction<"pending" | "sended" | "error">>;
   setBgCircleColor: React.Dispatch<React.SetStateAction<string>>;
   loadingValue: SharedValue<number>;
}

export const NewObservCard = ({form,setReqSended,setBgCircleColor,loadingValue}:Params) => {

   const runAnimation = () => {
      loadingValue.value = height;
   }

   const PostNewObservCard = (bodyRequest: string) => {

      let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m38="http://xmlns.oracle.com/Enterprise/Tools/schemas/M558814.V1">\
        <soapenv:Header/>\
        <soapenv:Body>\
        <m38:Create__CompIntfc__DLHR_TA_OBSERV_CI>\
        ${bodyRequest}\
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
            console.log(JSON.stringify(parse(res.data)));

            setReqSended('sended')
            setBgCircleColor('#4ad66d');
            runAnimation();

         }).catch(err => {
            console.log("mensaje de catch:");
            console.log(JSON.stringify(err));

            setBgCircleColor('orange');
            setReqSended('error');
            runAnimation();
         });

   }

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

   var parser = new j2xParser(defaultOptions);

   var xml = parser.parse(form);
   console.log(xml);
   PostNewObservCard(xml);

}