import { MenuItem } from '../interfaces/appInterfaces';

export const menuItems:MenuItem[]=[{
    name:'Consulta RRHH',
    icon:'chatbubble-ellipses-outline',
    components:'RrhhScreen'
},{
    name:'Mi Recibo',
    icon:'document-text-outline',
    components:'PaycheckScreen'
},
{
    name:'Mi Perfil',
    icon:'person-outline',
    components:'MyProfileScreenDrawer'
},
{
    name:'Noticias',
    icon:'newspaper-outline',
    components:'TopTapNavigator'
}




]
