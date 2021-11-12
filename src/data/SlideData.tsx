import { Slide } from '../interfaces/appInterfaces';


export const items: Slide[] = [
    {
        title: 'Bienvenido ',
        desc: 'En estas sección podés cargar, visualizar y editar tarjetas observe, de manera sencilla y desde la comodidad de tu teléfono',
        img: require('../assets/slide-2.png')
    },
    {
        title: 'Modo sin conexion',
        desc: `En el lugar que te encontras no hay conexion a internet... no hay problema podes cargar nuevas tarjetas observe.\


Estas se cargaran automaticamente la proxima vez que tengas conexion `,
        img: require('../assets/slide-1.png')
    },
   
    {
        title: 'Modo con conexion',
        desc: 'Podes modificar y/o visualizar las tarjetas que creaste previamente cuando tienes una conexión a internet',
        img: require('../assets/slide-3.png')
    },
]