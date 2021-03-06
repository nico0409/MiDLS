import Animated from "react-native-reanimated";
import type { Matrix3, Transforms2d } from "./Matrix3";
export declare type SpringConfig = Partial<Omit<Animated.SpringConfig, "toValue">>;
export declare type TimingConfig = Partial<Omit<Animated.TimingConfig, "toValue">>;
export declare const mix: (value: Animated.Adaptable<number>, x: Animated.Adaptable<number>, y: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const step: (value: Animated.Adaptable<number>, edge: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const smoothstep: (value: Animated.Adaptable<number>, edge0: Animated.Adaptable<number>, edge1: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const tween2d: (value: Animated.Node<number>, t1: Matrix3 | Transforms2d, t2: Matrix3 | Transforms2d) => readonly [{
    readonly translateX: Animated.Node<number>;
}, {
    readonly translateY: Animated.Node<number>;
}, {
    readonly rotateZ: Animated.Node<number>;
}, {
    readonly scaleX: Animated.Node<number>;
}, {
    readonly scaleY: Animated.Node<number>;
}, {
    readonly rotateZ: Animated.Node<number>;
}];
export declare const diff: (v: Animated.Node<number>) => Animated.Node<number>;
export declare const diffClamp: (a: Animated.Node<number>, minVal: Animated.Adaptable<number>, maxVal: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const moving: (position: Animated.Node<number>, minPositionDelta?: number, emptyFrameThreshold?: number) => Animated.Node<number>;
export declare const snapPoint: (value: Animated.Adaptable<number>, velocity: Animated.Adaptable<number>, points: Animated.Adaptable<number>[]) => Animated.Node<number>;
export declare const addTo: (value: Animated.Value<number>, node: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const subTo: (value: Animated.Value<number>, node: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const multiplyTo: (value: Animated.Value<number>, node: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const divideTo: (value: Animated.Value<number>, node: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const moduloTo: (value: Animated.Value<number>, node: Animated.Adaptable<number>) => Animated.Node<number>;
