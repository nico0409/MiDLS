import { Dimensions } from 'react-native';
import { SharedValue, log } from 'react-native-reanimated';
import { j2xParser, parse } from 'fast-xml-parser';

import PSDB from '../api/PSDB';
import { DlhrAllObserve, objUseForm } from '../interfaces/prompInterfaces';
import { RespNewCard } from '../interfaces/respNewCardObs';
import { Asingstorage, GetStorage } from './Storage';
import { nroTarjetaEmpty } from '../data/nroTarjetaEmpty';
import { ConvertXML } from '../../helpers/ConvertXML';

const { height } = Dimensions.get('window');

interface Params {
   form: objUseForm;
   setReqSended: React.Dispatch<React.SetStateAction<"pending" | "sended" | "error">>;
   setBgCircleColor: React.Dispatch<React.SetStateAction<string>>;
   loadingValue: SharedValue<number>;
   cardDescr: DlhrAllObserve;
   setCardDescr: React.Dispatch<React.SetStateAction<DlhrAllObserve>>;
   setReloadCardList: React.Dispatch<React.SetStateAction<boolean>>;
   setErrorType: React.Dispatch<React.SetStateAction<'SERVER' | 'NETWORK' | undefined>>;
   setStartBackScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewObservCard = ({ form, setReqSended, setBgCircleColor, loadingValue, cardDescr, setCardDescr, setReloadCardList, setErrorType, setStartBackScreen}: Params) => {

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

   const runAnimation = async(sended: boolean, errorType?: 'NETWORK' | 'SERVER') => {
      
         if(sended){
            setBgCircleColor('#4ad66d');
            setReqSended('sended');
            console.log("SE HIZO SET SENDED TRUE");
         }else{
            setBgCircleColor(errorType === "NETWORK" ? 'orange': '#E2302D');
            setReqSended('error');
            console.log("SE HIZO SET SENDED ERROR");
         }

      loadingValue.value = height;

      setStartBackScreen(true);
   }

 
   setReloadCardList(true);

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
         
         setCardDescr({
            ...cardDescr,
            ...{ NroTarjeta: resp['soapenv:Envelope']['soapenv:Body']['m38:Create__CompIntfc__DLHR_TA_OBSERV_CIResponse']['m38:detail']['m38:DLHR_TA_OBSERV_CI']['m38:DL_NTARJETA'] }
         })
         
         await runAnimation(true);

      }).catch(async (err) => {

         const arrayFormsOffline: any = await GetStorage({ StorageType: 'offlineObserveCards' });
         const arrayCardsDescrOffline: any = await GetStorage({ StorageType: 'offlineObserveCardsDescr' });


         const newCardDescr = {
            ...cardDescr,
            ...{
               NroTarjeta: nroTarjetaEmpty + ((arrayCardsDescrOffline ? (arrayCardsDescrOffline.length + 1) : 1).toString()),
               ERR_TYPE: err.response ? 'SERVER' : 'NETWORK'
            }
         }

         const newForm = {
            ...form,
            ...{ "m38:DL_NTARJETA": nroTarjetaEmpty + ((arrayCardsDescrOffline ? (arrayCardsDescrOffline.length + 1) : 1).toString()),
                 "m38:DL_PREV_COLOR_ST": err.response ? 'R' : 'O',
                 "m38:DL_DEFERRED_CARD": "Y"},
         }


         setCardDescr(newCardDescr);

         if (arrayFormsOffline === null) {
            await Asingstorage({ StorageType: 'offlineObserveCards' }, [newForm]);
            await Asingstorage({ StorageType: 'offlineObserveCardsDescr' }, [newCardDescr]);
         } else {
            let arrayFormOffline: Object[] = arrayFormsOffline;
            arrayFormOffline.unshift(newForm);
            await Asingstorage({ StorageType: 'offlineObserveCards' }, arrayFormOffline);

            let arrayCardDescrOffline: Object[] = arrayCardsDescrOffline;
            arrayCardDescrOffline.unshift(newCardDescr);
            await Asingstorage({ StorageType: 'offlineObserveCardsDescr' }, arrayCardDescrOffline);
         }

         setErrorType(err.response ? 'SERVER' : 'NETWORK');
         await runAnimation(false,err.response ? 'SERVER' : 'NETWORK');
      });
}