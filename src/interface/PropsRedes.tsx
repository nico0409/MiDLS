export interface PropsRedes {
    type: 'icon' | 'image';
    nameOrUrl: string;
    color?: string;
    size?: number;
    descr?: string;
};

export interface DataRedes {
    id: number;
    url: string;
    props: PropsRedes;
};