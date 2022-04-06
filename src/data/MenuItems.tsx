import { MenuItem } from '../interfaces/appInterfaces';
import { Platform } from 'react-native';

const menuItemsAlt:MenuItem[]=[{
    name:'Consulta RRHH',
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
    name:'NQN - Field Services',
    icon:'location-outline',
    components:'linkExternalApp'
},
{
    name:'Mi Perfil',
    icon:'person-outline',
    components:'MyProfileScreenDrawer'
}
]

Platform.OS==='ios' && menuItemsAlt.splice(4,1);

export const menuItems = menuItemsAlt;