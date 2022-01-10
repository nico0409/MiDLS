import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { IBouncyCheckboxProps } from "react-native-bouncy-checkbox";
declare type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
export interface ICheckboxButton extends IBouncyCheckboxProps {
    id: number;
}
interface IBouncyCheckboxGroupProps {
    style?: CustomStyleProp;
    initial?: number;
    data: ICheckboxButton[];
    onChange: (selectedItem: ICheckboxButton) => void;
}
declare const BouncyCheckboxGroup: React.FC<IBouncyCheckboxGroupProps>;
export default BouncyCheckboxGroup;
