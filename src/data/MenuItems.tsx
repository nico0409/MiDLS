import { MenuItem } from '../interfaces/appInterfaces';
import { Platform } from 'react-native';

export const menuItems:MenuItem[]=[{
    name:'Recepción Consultas de Empleados',
    icon:'chatbubble-ellipses-outline',
    components:'RrhhScreen'
},{
    name:'Mi Recibo',
    icon:'document-text-outline',
    components:'PaycheckScreen'
},
{
    name:'Noticias',
    icon:'newspaper-outline',
    components:'TopTapNavigator'
},
{
    name:'Tarjeta Observe',
    icon:'card-outline',
    components:'StackNavigatorObserve'
},
{
    name:'NQN - UrbeTrack',
    icon:'location-outline',
    components:'linkExternalApp'
},
{
    name:'Mi Perfil',
    icon:'person-outline',
    components:'MyProfileScreenDrawer'
}
];