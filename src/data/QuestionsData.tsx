import { QuestionData, ruleGold } from '../interfaces/QuestionInterfaces';
import { colors, fillColorBtn, unfillColorBtn } from '../Themes/DlsTheme';

const _iconStyle = (borderColor: string) => ({
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: borderColor,
  });
  
  const styles = {
    container: { marginTop: 24 },
    verticalStyle: { marginTop: 16 },
    textStyle: { textDecorationLine: "none" },
    iconImageStyle: { height: 20, width: 20 },
  };

  
export const QuestionsData: QuestionData =
{
    type: [{
        type: {type:'1'},
        question: 'Equipos de protección Personal',
        choices: 
        [{
            id: 0,
            text: "En condiciones deficientes",
            fillColor: fillColorBtn,
            unfillColor:unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "No adecuado para la tarea",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Falta de uso de EPP",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No disponible",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
    ],field: "m38:DL_EQPROTPER"
                
    },
    {
        type: {type:'2'},
        question: 'Herramientas y Equipos',
        choices: [{
            id: 0,
            text: "En condición insegura",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },{
            id: 1,
            text: "No aptos para el uso",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Uso incorrecto",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No sabe utilizar los equipos/herramientas",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        }],field: "m38:DL_EQYHERR"
           /*  choice1: 'En condición insegura',
            choice2: 'No aptos para el uso',
            choice3: 'Uso incorrecto',
            choice4: 'No sabe utilizar los equipos/herramientas', */

        
    },
    {
        type: {type:'3'},
        question: 'Ubicación y Posturas',
        choices: [{
            id: 0,
            text: "Manos en zona de golpes, pellizco, aprisionamiento",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Exposición en línea fuego (entre vehículos, cargas suspendidas, en movimiento)",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Observación inadecuada del entorno de trabajo",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "Postura inadecuada para la tarea",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        }],field: "m38:DL_POSIPERS"
            /* choice1: 'Manos en zona de golpes, pellizco, aprisionamiento',
            choice2: 'Exposición en línea fuego (entre vehículos, cargas suspendidas, en movimiento)',
            choice3: 'Observación inadecuada del entorno de trabajo',
            choice4: 'Postura inadecuada para la tarea' */
        
    },{
        type: {type:'4'},
        question: 'Orden y Limpieza',
        choices: 
            [{
                id: 0,
                text: "Presencia de obstáculos",
                fillColor: fillColorBtn,
                unfillColor: unfillColorBtn,
                iconStyle: _iconStyle(unfillColorBtn),
                textStyle: { textDecorationLine: "none" },
                style: styles.verticalStyle,
                iconImageStyle: styles.iconImageStyle,
            },
            {
                id: 1,
                text: "Falta de orden en cajones de Herramientas",
                fillColor: fillColorBtn,
                unfillColor: unfillColorBtn,
                iconStyle: _iconStyle(unfillColorBtn),
                textStyle: { textDecorationLine: "none" },
                style: styles.verticalStyle,
                iconImageStyle: styles.iconImageStyle,
            },
            {
                id: 2,
                text: "Almacenamiento inadecuado de materiales",
                fillColor: fillColorBtn,
                unfillColor: unfillColorBtn,
                iconStyle: _iconStyle(unfillColorBtn),
                textStyle: { textDecorationLine: "none" },
                style: styles.verticalStyle,
                iconImageStyle: styles.iconImageStyle,
            },
            {
                id: 3,
                text: "Falta de orden y limpieza",
                fillColor: fillColorBtn,
                unfillColor: unfillColorBtn,
                iconStyle: _iconStyle(unfillColorBtn),
                textStyle: { textDecorationLine: "none" },
                style: styles.verticalStyle,
                iconImageStyle: styles.iconImageStyle,
            }],field: "m38:DL_ORDYLIMPIE"
          
           /*  choice2: 'Falta de orden en cajones de Herramientas',
            choice3: 'Almacenamiento inadecuado de materiales',
            choice4: 'Falta de orden y limpieza', */

        

    },
    {
        type: {type:'5'},
        question: 'Procedimientos de Trabajo',
        choices:  [{
            id: 0,
            text: "No se aplican en forma correcta",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Desactualizados",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "No se conocen o no se entienden",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No existen procedimientos",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        }],field: "m38:DL_PROCTRAB"
        
           /*  choice1: 'No se aplican en forma correcta',
            choice2: 'Desactualizados',
            choice3: 'No se conocen o no se entienden',
            choice4: 'No existen procedimientos',
 */
        
    },
    {
        type: {type:'6'},
        question: 'Reacciones de la Personas',
        choices: 
        [{
            id: 0,
            text: "Reorganiza la tarea",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Interrumpen tareas",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Aplican medidas proactivas/preventivas",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "Cambia de herramienta",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        }],field: "m38:DL_REACCPERS"
           /*  choice1: 'Reorganiza la tarea',
            choice2: 'Interrumpen tareas',
            choice3: 'Aplican medidas proactivas/preventivas',
            choice4: 'Cambia de herramienta', */

        
    },
    {
        type: {type:'7'},
        question: 'Controles y Permisos',
        choices: 
        [{
            id: 0,
            text: "No se gestionó el permiso de trabajo",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "No se gestionó adecuadamente el ATS'",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Uso insuficiente de bloques o barreras",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No se involucró a la Supervisión en la gestión del cambio",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        }
   ],field: "m38:DL_CONTYPER"
           /*  choice1: 'No se gestionó el permiso de trabajo',
            choice2: 'No se gestionó adecuadamente el ATS',
            choice3: 'Uso insuficiente de bloques o barreras',
            choice4: 'No se involucró a la Supervisión en la gestión del cambio', */

        
    },
    {
        type: {type:'8'},
        question: 'Medio Ambiente',
        choices: 
        [{
            id: 0,
            text: "Derrames en el sitio de trabajo",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Acopio/Identificación de químicos inadecuados",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Ausencia de bandejas de contención / Bandejas con fluído",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "Residuos mal clasificados",
            fillColor: fillColorBtn,
            unfillColor: unfillColorBtn,
            iconStyle: _iconStyle(unfillColorBtn),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        }],field: "m38:DL_MEDIOAMB"
           /*  choice1: 'Derrames en el sitio de trabajo',
            choice2: 'Acopio/Identificación de químicos inadecuados',
            choice3: 'Ausencia de bandejas de contención / Bandejas con fluído',
            choice4: 'Residuos mal clasificados', */

        
    },
    ]
}


export const goldRuleData :ruleGold[] = [
 {type:{type:'1'},
text:'Seguridad Vial' ,
field:'m38:DL_SEG_VIAL'   
} ,  
{type:{type:'2'},
 text:'Trabajo en Altura',  
 field:'m38:DL_TRBJ_ALT'  
} ,  
{type:{type:'3'},
 text:'Línea de Fuego',  
 field:'m38:DL_LN_FUEGO'    
} ,  
{type:{type:'4'},
 text:'Espacios Confinados',  
 field:'m38:DL_ESPAC_CONFIN'
} ,  
{type:{type:'5'},
 text:'Herramientas y Equipos'  
 ,  
 field:'m38:DL_HER_EQUIP'  
} ,  
{type:{type:'6'},
 text:'Aislamiento de Energías',  
 field:'m38:DL_AIS_ENERG'    
} ,  
{type:{type:'7'},
 text:'Operaciones de Izadoo',  
 field:'m38:DL_OP_IZADO'    
} ,  {type:{type:'8'},
text:'Permisos de Trabajo'  ,  
 field:'m38:DL_PERM_TRABAJO'  
} ,  
{type:{type:'9'},
 text:'Manejo del Cambiol' ,  
 field:'m38:DL_MAN_CAMBIO'  
} ,  
]


