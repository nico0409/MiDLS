import { DataRedes } from '../interfaces/PropsRedes';
import { colors } from '../Themes/DlsTheme';

export const listRedes: DataRedes[] = [
    {
        id: 1,
        url: 'https://dls-archer.com/',
        props: {
            type: 'image',
            nameIcon: '',
            requireImage: require('../assets/logoDlsOfArcher.png'),
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
            nameIcon: 'logo-youtube',
            color: colors.dlsYellowSecondary,
            size: 40,
            descr: 'DLS Latinoamerica'
        }
    },
    {
        id: 3,
        url: 'https://www.youtube.com/channel/UChtJVbF4sSuBMFLzYgyqe7Q',
        props: {
            type: 'icon',
            nameIcon: 'logo-youtube',
            color: colors.dlsWhiteBackGround,
            size: 40,
            descr: 'Archer Well'
        }
    },
    {
        id: 4,
        url: 'https://www.archerwell.com/',
        props: {
            type: 'image',
            nameIcon: '',
            requireImage: require('../assets/archer-grey.png'),
            color: colors.dlsGrayPrimary,
            size: 40,
            descr: 'archerwell.com'
        }
    },
    {
        id: 5,
        url: 'https://www.linkedin.com/company/dls-archer',
        props: {
            type: 'icon',
            nameIcon: 'logo-linkedin',
            color: colors.dlsBluePrimary,
            size: 40,
            descr: 'DLS Archer'
        }
    },
    {
        id: 6,
        url: 'https://www.linkedin.com/company/dls-argentina',
        props: {
            type: 'icon',
            nameIcon: 'logo-linkedin',
            color: colors.dlsBluePrimary,
            size: 40,
            descr: 'DLS Argentina'
        }
    },
]