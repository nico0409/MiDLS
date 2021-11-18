export interface RespNewCard {
    "soapenv:Envelope": SoapenvEnvelope;
}

export interface SoapenvEnvelope {
    "soapenv:Body": SoapenvBody;
}

export interface SoapenvBody {
    "m38:Create__CompIntfc__DLHR_TA_OBSERV_CIResponse": M38CreateCompIntfcDLHRTAOBSERVCIResponse;
}

export interface M38CreateCompIntfcDLHRTAOBSERVCIResponse {
    "m38:notification": number;
    "m38:detail":       M38Detail;
}

export interface M38Detail {
    "m38:DLHR_TA_OBSERV_CI": M38DLHRTAOBSERVCI;
}

export interface M38DLHRTAOBSERVCI {
    "m38:BUSINESS_UNIT": string;
    "m38:DL_NTARJETA":   string;
}
