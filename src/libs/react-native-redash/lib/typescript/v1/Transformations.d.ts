import Animated from "react-native-reanimated";
import type { Vector } from "./Vectors";
import type { Transforms2d } from "./Matrix3";
export declare const translateZ: (perspective: Animated.Adaptable<number>, z: Animated.Adaptable<number>) => {
    scale: Animated.Node<number>;
};
export declare const translate: ({ x: translateX, y: translateY }: Vector) => ({
    translateX: Animated.Adaptable<number>;
    translateY?: undefined;
} | {
    translateY: Animated.Adaptable<number>;
    translateX?: undefined;
})[];
export declare const transformOrigin: ({ x, y }: Vector, ...transformations: Transforms2d) => Transforms2d;
export declare const rotateTranslation: (tr: Vector, rotate: Animated.Adaptable<number>) => {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
};
export declare const scaleTranslation: (tr: Vector, scale: Animated.Adaptable<number>) => {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
};
