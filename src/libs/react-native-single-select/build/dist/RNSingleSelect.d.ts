/// <reference types="react" />
import { ViewStyle, TextStyle, ImageStyle } from "react-native";
export interface ISingleSelectDataType {
    id: number;
    value: string;
    imageSource?: any;
    data?: any;
}
interface IProps {
    width?: number;
    height?: number;
    darkMode?: boolean;
    imageWidth?: number;
    TextComponent?: any;
    imageHeight?: number;
    placeholder?: string;
    ImageComponent?: any;
    spinnerType?: string;
    spinnerSize?: number;
    spinnerColor?: string;
    searchEnabled?: boolean;
    disableAbsolute?: boolean;
    placeholderTextStyle?: any;
    animatedBorderRadius?: number;
    placeholderTextColor?: string;
    menuBarContainerWidth?: number;
    menuBarContainerHeight?: number;
    disableFilterAnimation?: boolean;
    value?: string;
    arrowImageStyle?: ImageStyle;
    menuItemTextStyle?: TextStyle;
    buttonContainerStyle?: ViewStyle;
    menuBarContainerStyle?: ViewStyle;
    data?: Array<ISingleSelectDataType>;
    initialValue?: ISingleSelectDataType;
    onTextChange?: (text: string) => void;
    onSelect: (selectedItem: ISingleSelectDataType) => void;
    scrollViewRef?: React.RefObject<ScrollView>;
}
declare const RNSingleSelect: (props: IProps) => JSX.Element;
export default RNSingleSelect;
