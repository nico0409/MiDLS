import { ImageSourcePropType } from "react-native";

export interface MenuItem{
        
    name:string
    icon:string
    components:string
}
export interface Slide {
    title: string;
    desc: string;
    img: ImageSourcePropType
}