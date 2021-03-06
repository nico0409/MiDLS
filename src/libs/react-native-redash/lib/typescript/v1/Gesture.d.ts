import Animated from "react-native-reanimated";
import type { FlingGestureHandlerEventExtra, ForceTouchGestureHandlerEventExtra, GestureHandlerStateChangeNativeEvent, LongPressGestureHandlerEventExtra, PanGestureHandlerEventExtra, PinchGestureHandlerEventExtra, RotationGestureHandlerEventExtra, TapGestureHandlerEventExtra } from "react-native-gesture-handler";
import { State } from "react-native-gesture-handler";
export declare const pinchBegan: (state: Animated.Node<State>) => Animated.Node<number>;
export declare const pinchActive: (state: Animated.Node<State>, numberOfPointers: Animated.Node<number>) => Animated.Node<number>;
export declare const pinchEnd: (state: Animated.Node<State>, numberOfPointers: Animated.Node<number>) => Animated.Node<number>;
export declare const withScaleOffset: (value: Animated.Node<number>, state: Animated.Node<State>, offset?: Animated.Value<number>) => Animated.Node<number>;
export declare const withOffset: (value: Animated.Node<number>, state: Animated.Node<State>, offset?: Animated.Value<number>) => Animated.Node<number>;
declare type SpringConfig = Omit<Animated.SpringConfig, "toValue">;
export interface WithSpringParams {
    value: Animated.Adaptable<number>;
    velocity: Animated.Adaptable<number>;
    state: Animated.Node<State>;
    snapPoints: Animated.Adaptable<number>[];
    offset?: Animated.Value<number>;
    config?: SpringConfig;
    onSnap?: (value: readonly number[]) => void;
}
export declare const withSpring: (props: WithSpringParams) => Animated.Node<number>;
interface WithDecayParams {
    value: Animated.Adaptable<number>;
    velocity: Animated.Adaptable<number>;
    state: Animated.Node<State>;
    offset?: Animated.Value<number>;
    deceleration?: number;
}
export declare const withDecay: (config: WithDecayParams) => Animated.Node<number>;
export declare const onScrollEvent: (contentOffset: {
    x?: Animated.Node<number>;
    y?: Animated.Node<number>;
}) => (...args: any[]) => void;
declare type NativeEvent = GestureHandlerStateChangeNativeEvent & (PanGestureHandlerEventExtra | TapGestureHandlerEventExtra | LongPressGestureHandlerEventExtra | RotationGestureHandlerEventExtra | FlingGestureHandlerEventExtra | PinchGestureHandlerEventExtra | ForceTouchGestureHandlerEventExtra);
declare type Adaptable<T> = {
    [P in keyof T]: Animated.Adaptable<T[P]>;
};
export declare const onGestureEvent: (nativeEvent: Partial<Adaptable<NativeEvent>>) => {
    onHandlerStateChange: (...args: any[]) => void;
    onGestureEvent: (...args: any[]) => void;
};
export declare const tapGestureHandler: () => {
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    position: import("./Vectors").Vector<Animated.Value<number>>;
    absolutePosition: import("./Vectors").Vector<Animated.Value<number>>;
    state: Animated.Value<State>;
};
export declare const panGestureHandler: () => {
    position: import("./Vectors").Vector<Animated.Value<number>>;
    translation: import("./Vectors").Vector<Animated.Value<number>>;
    velocity: import("./Vectors").Vector<Animated.Value<number>>;
    state: Animated.Value<State>;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
};
export declare const pinchGestureHandler: () => {
    numberOfPointers: Animated.Value<0>;
    scale: Animated.Value<1>;
    state: Animated.Value<State>;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    focal: import("./Vectors").Vector<Animated.Value<number>>;
};
export declare const rotationGestureHandler: () => {
    rotation: Animated.Value<0>;
    state: Animated.Value<State>;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    anchor: import("./Vectors").Vector<Animated.Value<number>>;
};
export declare const scrollHandler: () => {
    x: Animated.Value<0>;
    y: Animated.Value<0>;
    scrollHandler: {
        onScroll: (...args: any[]) => void;
        scrollEventThrottle: number;
    };
};
export declare const debugGestureState: (label: string, state: Animated.Node<State>) => Animated.Node<number>;
export {};
