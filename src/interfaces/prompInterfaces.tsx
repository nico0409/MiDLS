// Generated by https://quicktype.io
export type StorageTypes = {

  StorageType: 'allObserve' | 'observeCard' | 'prompt' | 'emplid' | 'offlineObserveCards' | 'offlineObserveCardsDescr' | 'signInStatus' | 'lastDataUpdateDttm' | 'lastTObsUpdateDttm' | 'deviceId' | 'refreshLoadObserveBG';

}

export type MeuItemType = {

  MeuItemType: 'Registro' | 'Comentarios' | 'Preguntas' | 'ReglasOro';

}

export interface InterfGetOnesCard {
  busineesUnit?: string,
  IdentifDt?: string,
  Ntarjeta?: string,
  cardOffline?: string
}
export type Fields = {

  empleado?: 'EMPLID' | 'NOMBRE',
  equipo?: 'DL_EQUIPEMENT_ID' | 'DESCR',
  turno?: 'DL_TURNO' | 'DESCR'
  customer?: 'DL_CUSTOMER_ID' | 'DESCR'
  sector?: 'DL_SECTOR_ID' | 'DESCR'
  observador?: 'EMPLID' | 'NOMBRE'
  APS?: 'DL_ACTION_NBR' | 'EMPLID'
  EncargadoAPS?: 'EMPLID' | 'NOMBRE'

}
export type promptType = {

  type?: 'DLHR_EMPL_BUSSINES_UNIT' | 'DLHR_ORIGEN' | 'DLHR_CUSTOMER' | 'DLHR_EQUIP_TBL' | 'DLHR_OBSERVE_EMPLID' | 'DLHR_PUESTO' | 'DLHR_SECTOR' | 'DLHR_APS' | 'DLHR_TURNO' | 'DLHR_POLITINTERTAREA' | 'DLHR_REQAPSSEG' | 'DLHR_CUASIACC';

}

export type promptField = {

  DLHR_EMPL_BUSSINES_UNIT?: { field1: Fields, field2: Fields }
  DLHR_EQUIP_TBL?: { field1: Fields, field2: Fields }
  DLHR_CUSTOMER?: { field1: Fields, field2: Fields }
  DLHR_SECTOR?: { field1: Fields, field2: Fields }
  DLHR_OBSERVE_EMPLID?: { field1: Fields, field2: Fields }
  DLHR_APS?: { field1: Fields, field2: Fields }
}
export type fieldSearchType = {

  type?: 'DLHR_BUSSINES' | 'DLHR_NTARJETA' | 'DLHR_ORIGEN' | 'DLHR_EQUIPO' | 'DLHR_FECHA' | 'DLHR_PUESTO' | 'DLHR_TURNO'
  label?: 'Unidadad de negocio' | 'Numero de tarjeta' | 'Origen' | 'Equipo' | 'Fecha' | 'Puesto' | 'Turno'

}
export interface PromptObserveType {
  PromptObserve?: PromptObserve;
  type?: 'PromptObserveType' | 'AllObserveType' | 'ObserveType';
}

export interface lastDataUpdateDttm {
  dateUpd: string
}

export interface lastTObsUpdateDttm {
  dateUpd: string
}
export interface refreshLoadObserveBG {
  refreshLoadObserve: boolean
}

export interface statusAuthStorage {
  status: boolean
}
export interface PromptObserve {
  "soapenv:Envelope"?: SoapenvEnvelope;
}

export interface SoapenvEnvelope {
  "soapenv:Body"?: SoapenvBody;
}

export interface SoapenvBody {
  DLHR_OBSERVE_PROMPT?: DlhrObservePrompt;
}

export interface DlhrObservePrompt {
  DLHR_EMPL_BUSSINES_UNIT?: DlhrEmplBussinesUnit[] | DlhrEmplBussinesUnit;
  DLHR_ORIGEN?: DlhrOrigen[] | DlhrOrigen;
  DLHR_EQUIP_TBL?: DlhrEquipTbl[] | DlhrEquipTbl;
  DLHR_CUSTOMER?: DlhrCustomer[] | DlhrCustomer;
  DLHR_OBSERVE_EMPLID?: DlhrObserveEmplid[] | DlhrObserveEmplid;
  DLHR_PUESTO?: DlhrPuesto[] | DlhrPuesto;
  DLHR_SECTOR?: DlhrSector[] | DlhrSector;
  DLHR_APS?: DlhrAps[] | DlhrAps;
  DLHR_TURNO?: DlhrTurno[] | DlhrTurno;
}

export interface DlhrAps {
  DL_ACTION_NBR?: string;
  BUSINESSUNIT?: string;
  EMPLID?: string;
  NOMBRE?: string;
}

export interface DlhrCustomer {
  DL_CUSTOMER_ID?: number;
  DESCR?: string;
}

export interface DlhrEmplBussinesUnit {
  DLHR_OBSERVE_EMPLID?: DlhrObserveEmplid;
  DLHR_BUSSINES_UNIT?: DlhrBussinesUnit[] | DlhrBussinesUnit;
}

export interface DlhrBussinesUnit {
  UNIDAD_DE_NEGOCIO: string;
  DESCR: string;
}

export interface DlhrObserveEmplid {
  EMPLID?: string;
  NOMBRE?: string;
}

export interface DlhrEquipTbl {
  DL_EQUIPEMENT_ID?: string;
  DESCR?: string;
}

export interface DlhrOrigen {
  ORIGEN: number;
  DESCR: string;
}

export interface DlhrPuesto {
  DL_PUESTO: string;
  DESCR: string;
}

export interface DlhrSector {
  DL_SECTOR_ID: string;
  DESCR: string;
}

export interface DlhrTurno {
  DL_TURNO: number;
  DESCR: string;
}

export interface DlPoliInterTarea {
  DL_POLITINTERTAREA: string;
  DESCR: string;
}

export interface DlReqAps {
  DL_REQAPSSEG: string;
  DESCR: string;
}

export interface DlCuasiAcc {
  DL_CUASIACC: string;
  DESCR: string;
}

// Generated by https://quicktype.io

export interface AllObserveType {
  AllObserve?: AllObserve;
  type?: 'PromptObserveType' | 'AllObserveType' | 'ObserveType';
}
export interface AllObserve {
  "soapenv:Envelope"?: SoapenvEnvelopeAllObserve;
}

export interface SoapenvEnvelopeAllObserve {
  "soapenv:Body": SoapenvBodyAllObserve;
}

export interface SoapenvBodyAllObserve {
  DLHR_ALL_OBSERVE_COLL: DlhrAllObserveColl;
}

export interface DlhrAllObserveColl {
  DLHR_ALL_OBSERVE: DlhrAllObserve[] | DlhrAllObserve;
}

export interface DlhrAllObserve {
  BUSINESS_UNIT?: string;
  BUSINES_DESCR?: string;
  DL_IDENTIF_DT?: string;
  NroTarjeta?: string;
  IDEquipo?: string;
  ID_EQUIPO_DESCR?: string;
  DL_ORIGEN?: string;
  ORIGEN_DESCR?: string;
  DL_OBSERVADOR?: string;
  OBSERVADOR_DESCR?: string;
  DL_TURNO?: string;
  TURNO_DESCR?: string;
  DL_CUSTOMER_ID?: number;
  CUSTOMER_DESCR?: string;
  DL_SECTOR_ID?: string;
  SECTOR_DESCR?: string;
  DL_PUESTO?: string;
  PUESTO_DESCR?: string;
  DL_ADESTACAR?: string;
  ERR_TYPE?: string;
}

export interface ErrType {
  errorType: 'NETWORK' | 'SERVER'
}

/* export interface TarjetaObserve {
  ['m38:BUSINESS_UNIT']: string;
  ['m38:DL_NTARJETA']: string;
  ['m38:DL_EQUIPMENT_ID']?: number;
  ['m38:DL_IDENTIF_DT']: string;
  ['m38:DL_ORIGEN']?: string;
  ['m38:DL_OBSERVADOR']?: string;
  ['m38:DL_TURNO']?: number;
  ['m38:DL_CUSTOMER_ID']?: number;
  ['m38:DL_SECTOR_ID']?: string;
  ['m38:DL_PUESTO']?: string;
  ['m38:DL_ADESTACAR']?: string;
  ['m38:DL_POLITINTERTAREA']?: string;
  ['m38:DL_REQAPSSEG']?: string;
  ['m38:DL_CUASIACC']?: string;
  ['m38:DL_NUM_APS']?: string;
  ['m38:DL_RESPSEGAPS']?: string;
  ['m38:DL_EQPROTPER']?: string;
  ['m38:DL_PROCTRAB']?: string;
  ['m38:DL_EQYHERR']?: string;
  ['m38:DL_REACCPERS']?: string;
  ['m38:DL_POSIPERS']?: string;
  ['m38:DL_CONTYPER']?: string;
  ['m38:DL_ORDYLIMPIE']?: string;
  ['m38:DL_MEDIOAMB']?: string;
  ['m38:DL_ACCION']?: string;
  ['m38:PTLT_DETAILS']?: string;
  ['DL_DESCACTO']?: string;
  ['DL_ACCEVITREIT']?: string;
  ['m38:DL_SEG_VIAL']?: string;
  ['m38:DL_TRBJ_ALT']?: string;
  ['m38:DL_LN_FUEGO']?: string;
  ['m38:DL_ESPAC_CONFIN']?: string;
  ['m38:DL_HER_EQUIP']?: string;
  ['m38:DL_AIS_ENERG']?: string;
  ['m38:DL_OP_IZADO']?: string;
  ['m38:DL_PERM_TRABAJO']?: string;
  ['m38:DL_MAN_CAMBIO']?: string;
} */

// Generated by https://quicktype.io

export interface OneObservType {
  "soapenv:Envelope"?: SoapenvEnvelope;
}


export interface SoapenvBody {
  "m38:Get__CompIntfc__DLHR_TA_OBSERV_CIResponse": M38GetCompIntfcDLHRTAOBSERVCIResponse;
}

export interface M38GetCompIntfcDLHRTAOBSERVCIResponse {
  "m38:BUSINESS_UNIT"?: string;
  "m38:DL_NTARJETA"?: string;
  "m38:DL_EQUIPMENT_ID"?: string;
  "m38:DL_IDENTIF_DT"?: string;
  "m38:DL_ORIGEN"?: string;
  "m38:DL_OBSERVADOR"?: string;
  "m38:DL_TURNO"?: string;
  "m38:DL_CUSTOMER_ID"?: string;
  "m38:DL_SECTOR_ID"?: string;
  "m38:DL_PUESTO"?: string;
  "m38:DL_ADESTACAR"?: string;
  "m38:DL_POLITINTERTAREA"?: string;
  "m38:DL_REQAPSSEG"?: string;
  "m38:DL_CUASIACC"?: string;
  "m38:DL_NUM_APS"?: string;
  "m38:DL_RESPSEGAPS"?: string;
  "m38:DL_EQPROTPER"?: string;
  "m38:DL_PROCTRAB"?: string;
  "m38:DL_EQYHERR"?: string;
  "m38:DL_REACCPERS"?: string;
  "m38:DL_POSIPERS"?: string;
  "m38:DL_CONTYPER"?: string;
  "m38:DL_ORDYLIMPIE"?: string;
  "m38:DL_MEDIOAMB"?: string;
  "m38:DL_ACCION"?: string;
  "m38:PTLT_DETAILS"?: string;
  "m38:DL_DESCACTO"?: string;
  "m38:DL_ACCEVITREIT"?: string;
  "m38:DL_SEG_VIAL"?: string;
  "m38:DL_TRBJ_ALT"?: string;
  "m38:DL_LN_FUEGO"?: string;
  "m38:DL_ESPAC_CONFIN"?: string;
  "m38:DL_HER_EQUIP"?: string;
  "m38:DL_AIS_ENERG"?: string;
  "m38:DL_OP_IZADO"?: string;
  "m38:DL_PERM_TRABAJO"?: string;
  "m38:DL_MAN_CAMBIO"?: string;
  "m38:CREATEDTTM"?: string;
  "m38:CREATEOPRID"?: string;
  "m38:LASTUPDDTTM"?: string;
  "m38:LASTUPDOPRID"?: string;
  "m38:DL_MIDLS_DTTM"?: string;
  "m38:DL_PREV_COLOR_ST"?: string;
  "m38:DL_DEFERRED_CARD"?: string;
  "m38:DL_DEVICE_ID"?: string;
  "m38:ERROR_MESSAGE_TXT"?: string;
}

export interface objUseForm {
  "m38:BUSINESS_UNIT"?: string;
  "m38:DL_NTARJETA"?: string;
  "m38:DL_EQUIPMENT_ID"?: string;
  "m38:DL_IDENTIF_DT"?: string;
  "m38:DL_ORIGEN"?: string;
  "m38:DL_OBSERVADOR"?: string;
  "m38:DL_TURNO"?: string;
  "m38:DL_CUSTOMER_ID"?: string;
  "m38:DL_SECTOR_ID"?: string;
  "m38:DL_PUESTO"?: string;
  "m38:DL_ADESTACAR"?: string;
  "m38:DL_POLITINTERTAREA"?: string;
  "m38:DL_REQAPSSEG"?: string;
  "m38:DL_CUASIACC"?: string;
  "m38:DL_NUM_APS"?: string;
  "m38:DL_RESPSEGAPS"?: string;
  "m38:DL_EQPROTPER"?: string;
  "m38:DL_PROCTRAB"?: string;
  "m38:DL_EQYHERR"?: string;
  "m38:DL_REACCPERS"?: string;
  "m38:DL_POSIPERS"?: string;
  "m38:DL_CONTYPER"?: string;
  "m38:DL_ORDYLIMPIE"?: string;
  "m38:DL_MEDIOAMB"?: string;
  "m38:DL_ACCION"?: string;
  "m38:PTLT_DETAILS"?: string;
  "m38:DL_DESCACTO"?: string;
  "m38:DL_ACCEVITREIT"?: string;
  "m38:DL_SEG_VIAL"?: string;
  "m38:DL_TRBJ_ALT"?: string;
  "m38:DL_LN_FUEGO"?: string;
  "m38:DL_ESPAC_CONFIN"?: string;
  "m38:DL_HER_EQUIP"?: string;
  "m38:DL_AIS_ENERG"?: string;
  "m38:DL_OP_IZADO"?: string;
  "m38:DL_PERM_TRABAJO"?: string;
  "m38:DL_MAN_CAMBIO"?: string;
  "m38:CREATEDTTM"?: string;
  "m38:CREATEOPRID"?: string;
  "m38:LASTUPDDTTM"?: string;
  "m38:LASTUPDOPRID"?: string;
  "m38:DL_MIDLS_DTTM"?: string;
  "m38:DL_PREV_COLOR_ST"?: string;
  "m38:DL_DEFERRED_CARD"?: string;
  "m38:DL_DEVICE_ID"?: string;
  "m38:ERROR_MESSAGE_TXT"?: string;
}


export interface IosVersion {
  "soapenv:Envelope"?: SoapenvEnvelopeIosVersion;
}

export interface SoapenvEnvelopeIosVersion {
  "soapenv:Body": SoapenvBodyIosVersion;
}

export interface SoapenvBodyIosVersion {
  DOC_TEST2?: DlhrIosVersion;
}

export interface DlhrIosVersion {
  "request"?: string;
}


export interface IosVersionLink {
  "soapenv:Envelope"?: SoapenvEnvelopeIosVersionLink;
}

export interface SoapenvEnvelopeIosVersionLink {
  "soapenv:Body": SoapenvBodyIosVersionLink;
}

export interface SoapenvBodyIosVersionLink {
  DLHR_RESPONSE_IOS_LINK?: DlhrIosVersionLink;
}

export interface DlhrIosVersionLink {
  "LINK_IOS"?: string;
}