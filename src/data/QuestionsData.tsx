import { QuestionData } from '../interfaces/QuestionInterfaces';

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
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "No adecuado para la tarea",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Falta de uso de EPP",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No disponible",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
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
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },{
            id: 1,
            text: "No aptos para el uso",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Uso incorrecto",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle:{ textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No sabe utilizar los equipos/herramientas",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
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
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Exposición en línea fuego (entre vehículos, cargas suspendidas, en movimiento)",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Observación inadecuada del entorno de trabajo",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "Postura inadecuada para la tarea",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
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
                fillColor: "#ff7473",
                unfillColor: "#fbbfbb",
                iconStyle: _iconStyle("#fbbfbb"),
                textStyle: { textDecorationLine: "none" },
                style: styles.verticalStyle,
                iconImageStyle: styles.iconImageStyle,
            },
            {
                id: 1,
                text: "Falta de orden en cajones de Herramientas",
                fillColor: "#ff7473",
                unfillColor: "#fbbfbb",
                iconStyle: _iconStyle("#fbbfbb"),
                textStyle: { textDecorationLine: "none" },
                style: styles.verticalStyle,
                iconImageStyle: styles.iconImageStyle,
            },
            {
                id: 2,
                text: "Almacenamiento inadecuado de materiales",
                fillColor: "#ff7473",
                unfillColor: "#fbbfbb",
                iconStyle: _iconStyle("#fbbfbb"),
                textStyle: { textDecorationLine: "none" },
                style: styles.verticalStyle,
                iconImageStyle: styles.iconImageStyle,
            },
            {
                id: 3,
                text: "Falta de orden y limpieza",
                fillColor: "#ff7473",
                unfillColor: "#fbbfbb",
                iconStyle: _iconStyle("#fbbfbb"),
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
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Desactualizados",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "No se conocen o no se entienden",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No existen procedimientos",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
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
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Interrumpen tareas",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Aplican medidas proactivas/preventivas",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "Cambia de herramienta",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
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
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "No se gestionó adecuadamente el ATS'",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Uso insuficiente de bloques o barreras",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "No se involucró a la Supervisión en la gestión del cambio",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
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
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 1,
            text: "Acopio/Identificación de químicos inadecuados",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 2,
            text: "Ausencia de bandejas de contención / Bandejas con fluído",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
            textStyle: { textDecorationLine: "none" },
            style: styles.verticalStyle,
            iconImageStyle: styles.iconImageStyle,
        },
        {
            id: 3,
            text: "Residuos mal clasificados",
            fillColor: "#ff7473",
            unfillColor: "#fbbfbb",
            iconStyle: _iconStyle("#fbbfbb"),
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


export const goldRules = {
    choice1: 'Seguridad Vial',
    choice2: 'Trabajo en Altura',
    choice3: 'Línea de Fuego',
    choice4: 'Espacios Confinados',
    choice5: 'Herramientas y Equipos',
    choice6: 'Aislamiento de Energías',
    choice7: 'Operaciones de Izadoo',
    choice8: 'Permisos de Trabajo',
    choice9: 'Manejo del Cambio',


}