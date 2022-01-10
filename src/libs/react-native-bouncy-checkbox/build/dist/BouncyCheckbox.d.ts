import * as React from "react";
import { Image, Animated, StyleProp, ViewStyle, TextStyle } from "react-native";
declare type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
export interface IBouncyCheckboxProps {
    style?: StyleProp<ViewStyle>;
    size?: number;
    text?: string;
    iconStyle?: any;
    textStyle?: StyleProp<TextStyle>;
    fillColor?: string;
    iconComponent?: React.ReactNode;
    isChecked?: boolean;
    unfillColor?: string;
    disableText?: boolean;
    ImageComponent?: any;
    iconImageStyle?: StyleProp<ViewStyle>;
    bounceEffect?: number;
    bounceFriction?: number;
    useNativeDriver?: boolean;
    disableBuiltInState?: boolean;
    checkIconImageSource?: Image;
    textContainerStyle?: CustomStyleProp;
    TouchableComponent?: any;
    onPress?: (checked: boolean) => void;
}
interface IState {
    checked: boolean;
    springValue: Animated.Value;
}
declare class BouncyCheckbox extends React.Component<IBouncyCheckboxProps, IState> {
    constructor(props: IBouncyCheckboxProps);
    componentDidMount(): void;
    onPress: () => void;
    renderCheckIcon: () => JSX.Element;
    renderCheckboxText: () => false | JSX.Element;
    render(): JSX.Element;
}
export default BouncyCheckbox;
