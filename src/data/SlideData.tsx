import { Slide } from '../interfaces/appInterfaces';


export const items: Slide[] = [
    {
        title: 'Bienvenido/a',
        desc: 'En esta sección puedes cargar, visualizar y editar tarjetas observe, de manera sencilla y desde la comodidad de tu teléfono.',
        img: require('../assets/slide-2.png')
    },
    {
        title: 'Modo sin conexión',
        desc: 'Si en el lugar que te encuentras no tienes una conexión a internet... no hay problema, puedes cargar tarjetas observe y estas se enviarán automáticamente la próxima vez que tengas conexión.',
        img: require('../assets/slide-1.png')
    },

    {
        title: 'Modo con conexión',
        desc: 'Puedes crear, modificar y/o visualizar las tarjetas que creaste previamente cuando tengas una conexión a internet.',
        img: require('../assets/slide-3.png')
    },
]