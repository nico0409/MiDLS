import { DataRedes } from '../interfaces/PropsRedes';
import { colors } from '../Themes/DlsTheme';

export const listRedesDLS: DataRedes[] = [
    {
        id: 1,
        url: 'https://dls-archer.com/',
        props: {
            type: 'image',
            owner:'DLS',
            nameIcon: '',
            requireImage: require('../assets/Logo_DLSNegativo.png'),
            color: colors.dlsYellowSecondary,
            size: 40,
            descr: 'dls-archer.com'
        }
    },
    {
        id: 2,
        url: 'https://www.youtube.com/channel/UCJO6TVfaFrVdADVbzaK7iaA',
        props: {
            type: 'icon',
            owner:'DLS',
            nameIcon: 'youtube',
            color: colors.dlsWhiteBackGround,
            size: 40,
            descr: 'DLS Latinoamerica'
        }
    },
    {
        id: 3,
        url: 'https://www.linkedin.com/company/dls-archer',
        props: {
            type: 'icon',
            owner:'DLS',
            nameIcon: 'linkedin',
            color: colors.dlsWhiteBackGround,
            size: 40,
            descr: 'DLS Archer'
        }
    },
    {
        id: 4,
        url: 'https://www.linkedin.com/company/dls-argentina',
        props: {
            type: 'icon',
            owner:'DLS',
            nameIcon: 'linkedin',
            color: colors.dlsWhiteBackGround,
            size: 40,
            descr: 'DLS Archer'
        }
    },{
        id: 5,
        url: 'https://www.archerwell.com/',
        props: {
            type: 'image',
            owner:'ARCHER',
            nameIcon: '',
            requireImage: require('../assets/archer-grey.png'),
            color: colors.dlsWhiteBackGround,
            size: 40,
            descr: 'archerwell.com'
        }
    }, {
        id: 6,
        url: 'https://www.youtube.com/channel/UChtJVbF4sSuBMFLzYgyqe7Q',
        props: {
            type: 'icon',
            owner:'ARCHER',
            nameIcon: 'youtube',
            color: colors.dlsWhiteBackGround,
            size: 40,
            descr: 'DLS Latinoamerica'
        }
    },
    
    {
        id: 7,
        url: 'https://www.linkedin.com/company/archer---the-well-company',
        props: {
            type: 'icon',
            owner:'ARCHER',
            nameIcon: 'linkedin',
            color: colors.dlsWhiteBackGround,
            size: 40,
            descr: 'DLS Archer'
        }
    },
      
]
