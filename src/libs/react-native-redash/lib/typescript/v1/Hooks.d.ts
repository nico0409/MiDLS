/// <reference types="react-native-gesture-handler" />
import Animated from "react-native-reanimated";
import { onGestureEvent } from "./Gesture";
import type { Vector } from "./Vectors";
import { vec } from "./Vectors";
export declare function useConst<T>(initialValue: T | (() => T)): T;
export declare const useGestureHandler: (nativeEvent: Parameters<typeof onGestureEvent>[0]) => {
    onHandlerStateChange: (...args: any[]) => void;
    onGestureEvent: (...args: any[]) => void;
};
export declare const usePanGestureHandler: () => {
    position: Vector<Animated.Value<number>>;
    translation: Vector<Animated.Value<number>>;
    velocity: Vector<Animated.Value<number>>;
    state: Animated.Value<import("react-native-gesture-handler").State>;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
};
export declare const useRotationGestureHandler: () => {
    rotation: Animated.Value<0>;
    state: Animated.Value<import("react-native-gesture-handler").State>;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    anchor: Vector<Animated.Value<number>>;
};
export declare const usePinchGestureHandler: () => {
    numberOfPointers: Animated.Value<0>;
    scale: Animated.Value<1>;
    state: Animated.Value<import("react-native-gesture-handler").State>;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    focal: Vector<Animated.Value<number>>;
};
export declare const useTapGestureHandler: () => {
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    position: Vector<Animated.Value<number>>;
    absolutePosition: Vector<Animated.Value<number>>;
    state: Animated.Value<import("react-native-gesture-handler").State>;
};
export declare const useScrollHandler: () => {
    x: Animated.Value<0>;
    y: Animated.Value<0>;
    scrollHandler: {
        onScroll: (...args: any[]) => void;
        scrollEventThrottle: number;
    };
};
declare type Atomic = string | number | boolean;
export declare const useVector: (x?: number | undefined, y?: number | undefined) => Vector<Animated.Value<number>>;
declare type P = Parameters<typeof vec.createValue>;
declare type R = Vector<Animated.Value<number>>;
declare type UseVectors = {
    (...v: [P]): [R];
    (...v: [P, P]): [R, R];
    (...v: [P, P, P]): [R, R, R];
    (...v: [P, P, P, P]): [R, R, R, R];
    (...v: [P, P, P, P, P]): [R, R, R, R, R];
    (...v: [P, P, P, P, P, P]): [R, R, R, R, R, R];
    (...v: P[]): R[];
};
export declare const useVectors: UseVectors;
export declare const useClock: () => Animated.Clock;
export declare const useValue: <V extends Atomic>(value: V) => Animated.Value<V>;
export declare const usePhysicsState: () => {
    time: Animated.Value<0>;
    position: Animated.Value<0>;
    velocity: Animated.Value<0>;
    finished: Animated.Value<0>;
};
export declare const useSpringConfig: (config: Partial<Omit<Animated.SpringConfig, "toValue">>) => {
    damping: Animated.Adaptable<number>;
    mass: Animated.Adaptable<number>;
    stiffness: Animated.Adaptable<number>;
    overshootClamping: boolean | Animated.Adaptable<number>;
    restSpeedThreshold: Animated.Adaptable<number>;
    restDisplacementThreshold: Animated.Adaptable<number>;
    toValue: Animated.Value<0>;
};
export declare const useLoop: (duration?: number, boomerang?: boolean) => Animated.Value<0>;
declare type UseValues = {
    <V extends Atomic>(v: V): [Animated.Value<V>];
    <V1 extends Atomic, V2 extends Atomic>(v1: V1, v2: V2): [
        Animated.Value<V1>,
        Animated.Value<V2>
    ];
    <V1 extends Atomic, V2 extends Atomic, V3 extends Atomic>(v1: V1, v2: V2, v3: V3): [Animated.Value<V1>, Animated.Value<V2>, Animated.Value<V3>];
    <V1 extends Atomic, V2 extends Atomic, V3 extends Atomic, V4 extends Atomic>(v1: V1, v2: V2, v3: V3, v4: V4): [
        Animated.Value<V1>,
        Animated.Value<V2>,
        Animated.Value<V3>,
        Animated.Value<V4>
    ];
    <V1 extends Atomic, V2 extends Atomic, V3 extends Atomic, V4 extends Atomic, V5 extends Atomic>(v1: V1, v2: V2, v3: V3, v4: V4, v5: V5): [
        Animated.Value<V1>,
        Animated.Value<V2>,
        Animated.Value<V3>,
        Animated.Value<V4>,
        Animated.Value<V5>
    ];
    <V extends Atomic>(...values: V[]): Animated.Value<V>[];
};
export declare const useValues: UseValues;
export declare const useClocks: (numberOfClocks: number) => Animated.Clock[];
export declare const useDiff: (node: Animated.Node<number>) => Animated.Value<0>;
export declare const useDebug: (values: {
    [key: string]: Animated.Node<number>;
}) => void;
export {};
