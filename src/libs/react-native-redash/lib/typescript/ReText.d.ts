/// <reference types="react" />
import type { TextProps as RNTextProps } from "react-native";
import Animated from "react-native-reanimated";
interface TextProps {
    text: Animated.SharedValue<string>;
    style?: Animated.AnimateProps<RNTextProps>["style"];
}
declare const ReText: (props: TextProps) => JSX.Element;
export default ReText;
