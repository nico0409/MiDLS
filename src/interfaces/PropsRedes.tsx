import { ImageSourcePropType } from "react-native";

export interface PropsRedes {
    type: 'icon' | 'image';
    nameIcon: string;
    owner:'DLS'|'ARCHER';
    requireImage?: ImageSourcePropType;
    color?: string;
    size?: number;
    descr?: string;
    
};

export interface DataRedes {
    id: number;
    url: string;
    props: PropsRedes;
};