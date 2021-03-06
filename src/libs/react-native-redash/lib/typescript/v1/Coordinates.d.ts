import Animated from "react-native-reanimated";
import type { Vector } from "./Vectors";
export interface PolarPoint {
    theta: Animated.Adaptable<number>;
    radius: Animated.Adaptable<number>;
}
export declare const canvas2Cartesian: ({ x, y }: Vector, center: Vector) => {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
};
export declare const cartesian2Canvas: ({ x, y }: Vector, center: Vector) => {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
};
export declare const cartesian2Polar: ({ x, y }: Vector) => {
    theta: Animated.Node<number>;
    radius: Animated.Node<number>;
};
export declare const polar2Cartesian: ({ theta, radius }: PolarPoint) => {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
};
export declare const polar2Canvas: ({ theta, radius }: PolarPoint, center: Vector) => {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
};
export declare const canvas2Polar: ({ x, y }: Vector, center: Vector) => {
    theta: Animated.Node<number>;
    radius: Animated.Node<number>;
};
