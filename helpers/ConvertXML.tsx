import { M38GetCompIntfcDLHRTAOBSERVCIResponse } from "../src/interfaces/prompInterfaces";

export const ConvertXML = (form: M38GetCompIntfcDLHRTAOBSERVCIResponse) => {
   
    form['m38:DL_DESCACTO']= form['m38:DL_DESCACTO']?.replace('&','&amp;');
    form['m38:DL_DESCACTO']= form['m38:DL_DESCACTO']?.replace('"','&quot;');
    form['m38:DL_DESCACTO']= form['m38:DL_DESCACTO']?.replace('\'','&apos;');
form['m38:DL_DESCACTO']= form['m38:DL_DESCACTO']?.replace('<','&lt;');
form['m38:DL_DESCACTO']= form['m38:DL_DESCACTO']?.replace('>','&gt;');


form['m38:DL_ACCEVITREIT']= form['m38:DL_ACCEVITREIT']?.replace('&','&amp;');
form['m38:DL_ACCEVITREIT']= form['m38:DL_ACCEVITREIT']?.replace('"','&quot;');
form['m38:DL_ACCEVITREIT']= form['m38:DL_ACCEVITREIT']?.replace('\'','&apos;');
form['m38:DL_ACCEVITREIT']= form['m38:DL_ACCEVITREIT']?.replace('<','&lt;');
form['m38:DL_ACCEVITREIT']= form['m38:DL_ACCEVITREIT']?.replace('>','&gt;');

form['m38:PTLT_DETAILS']= form['m38:PTLT_DETAILS']?.replace('&','&amp;');
form['m38:PTLT_DETAILS']= form['m38:PTLT_DETAILS']?.replace('"','&quot;');
form['m38:PTLT_DETAILS']= form['m38:PTLT_DETAILS']?.replace('\'','&apos;');
form['m38:PTLT_DETAILS']= form['m38:PTLT_DETAILS']?.replace('<','&lt;');
form['m38:PTLT_DETAILS']= form['m38:PTLT_DETAILS']?.replace('>','&gt;');

form['m38:DL_ACCION']= form['m38:DL_ACCION']?.replace('&','&amp;');
form['m38:DL_ACCION']= form['m38:DL_ACCION']?.replace('"','&quot;');
form['m38:DL_ACCION']= form['m38:DL_ACCION']?.replace('\'','&apos;');
form['m38:DL_ACCION']= form['m38:DL_ACCION']?.replace('<','&lt;');
form['m38:DL_ACCION']= form['m38:DL_ACCION']?.replace('>','&gt;');




}
