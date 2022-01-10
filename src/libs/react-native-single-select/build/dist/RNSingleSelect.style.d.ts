import { ViewStyle, ImageStyle, TextStyle } from "react-native";
import { ISingleSelectDataType } from "./RNSingleSelect";
interface Style {
    listStyle: ViewStyle;
    arrowImageStyle: ImageStyle;
    spinnerContainer: ViewStyle;
    buttonContainerGlue: ViewStyle;
    menuBarItemContainerGlue: ViewStyle;
}
export declare const _placeholderTextStyle: (theme: string, selectedItem?: ISingleSelectDataType | null | undefined, placeholderTextColor?: string | undefined) => TextStyle;
export declare const _menuItemContainer: (index: number, data?: ISingleSelectDataType[] | undefined) => ViewStyle;
export declare const _menuBarContainer: (theme: string, menuBarContainerHeight: number, menuBarContainerWidth: number) => ViewStyle;
export declare const _menuButtonContainer: (theme: string, height?: number, width?: number) => ViewStyle;
export declare const _imageStyle: (height?: number, width?: number) => ImageStyle;
export declare const _menuItemTextStyle: (theme: string) => TextStyle;
declare const _default: Style;
export default _default;
