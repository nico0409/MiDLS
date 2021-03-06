/// <reference types="react" />
import type { TextStyle, StyleProp } from "react-native";
import Animated from "react-native-reanimated";
interface TextProps {
    text: Animated.Node<string>;
    style?: StyleProp<Animated.AnimateStyle<TextStyle>>;
}
declare const ReText: (props: TextProps) => JSX.Element;
export default ReText;
