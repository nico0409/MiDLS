import { objUseForm, TarjetaObserve } from '../interfaces/prompInterfaces';
import {j2xParser} from 'fast-xml-parser'
import { PostNewObservCard } from './PostNewObservCard';

export const NewObservCard=(newcard:objUseForm)=>{


/*      let newcard: TarjetaObserve={

        ['m38:BUSINESS_UNIT']:'ARBUE',
        ['m38:DL_NTARJETA']:'NEW',
        ['m38:DL_EQUIPMENT_ID']:101,
        ['m38:DL_IDENTIF_DT']:'2020-01-01',
        ['m38:DL_ORIGEN']:'A',
        ['m38:DL_OBSERVADOR']:'B000069',
        ['m38:DL_TURNO']:1,
        ['m38:DL_CUSTOMER_ID']:2,
        ['m38:DL_SECTOR_ID']:'CAPAC',
        ['m38:DL_PUESTO']:'G',
        ['m38:DL_ADESTACAR']:'Y',
        ['m38:DL_POLITINTERTAREA']:'Y',
        ['m38:DL_REQAPSSEG']:'Y',
        ['m38:DL_CUASIACC']:'N',
        ['m38:DL_NUM_APS']:'3445',
        ['m38:DL_RESPSEGAPS']:'B000069',
        ['m38:DL_EQPROTPER']:'D',
        ['m38:DL_PROCTRAB']:'B',
        ['m38:DL_EQYHERR']:'A',
        ['m38:DL_REACCPERS']:'B',
        ['m38:DL_POSIPERS']:'A',
        ['m38:DL_CONTYPER']:'C',
        ['m38:DL_ORDYLIMPIE']:'A',
        ['m38:DL_MEDIOAMB']:'B',
        ['m38:DL_ACCION']:'test',
        ['m38:PTLT_DETAILS']:'test',
        ['DL_DESCACTO']:'test',
        ['DL_ACCEVITREIT']:'test',
        ['m38:DL_SEG_VIAL']:'Y',
        ['m38:DL_TRBJ_ALT']:'Y',
        ['m38:DL_LN_FUEGO']:'Y',
        ['m38:DL_ESPAC_CONFIN']:'Y',
        ['m38:DL_HER_EQUIP']:'Y',
        ['m38:DL_AIS_ENERG']:'Y',
        ['m38:DL_OP_IZADO']:'Y',
        ['m38:DL_PERM_TRABAJO']:'Y',
        ['m38:DL_MAN_CAMBIO']:'Y',
     } */

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
    
     var xml = parser.parse(newcard);
     console.log(xml);
     PostNewObservCard(xml);
     
}