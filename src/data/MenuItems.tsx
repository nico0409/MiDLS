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
    name:'Test Covid',
    icon:'git-commit-outline',
    components:'SwitchScreen'
},

{
    name:'Mi Perfil',
    icon:'person-outline',
    components:'MyProfileScreen'
},
{
    name:'Noticias',
    icon:'newspaper-outline',
    components:'TopTapNavigator'
}




]
