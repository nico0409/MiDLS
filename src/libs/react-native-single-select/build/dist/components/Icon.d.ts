import * as React from "react";
import { Animated, ImageStyle } from "react-native";
export declare type Source = {
    uri?: string;
};
interface IProps {
    theme: string;
    style?: ImageStyle | ImageStyle[];
    iconImageSource?: Source | number;
}
interface IState {
    toggled: boolean;
    rotation: Animated.Value;
}
declare class Icon extends React.Component<IProps, IState> {
    constructor(props: IProps);
    onPressAnimation: () => void;
    render(): JSX.Element;
}
export default Icon;
