import Animated from "react-native-reanimated";
import type { SpringConfig } from "./Animations";
export interface TimingParams {
    clock?: Animated.Clock;
    from?: Animated.Adaptable<number>;
    to?: Animated.Adaptable<number>;
    duration?: Animated.Adaptable<number>;
    easing?: (v: Animated.Adaptable<number>) => Animated.Node<number>;
}
export declare const timing: (params: TimingParams) => Animated.Node<number>;
export interface DecayParams {
    clock?: Animated.Clock;
    from?: Animated.Adaptable<number>;
    velocity?: Animated.Adaptable<number>;
    deceleration?: Animated.Adaptable<number>;
}
export declare const decay: (params: DecayParams) => Animated.Node<number>;
export interface SpringParams {
    clock?: Animated.Clock;
    from?: Animated.Adaptable<number>;
    to: Animated.Adaptable<number>;
    velocity?: Animated.Adaptable<number>;
    config?: SpringConfig;
}
export declare const spring: (params: SpringParams) => Animated.Node<number>;
export declare const delay: (node: Animated.Node<number>, duration: number) => Animated.Node<number>;
export interface LoopProps {
    clock?: Animated.Clock;
    easing?: (v: Animated.Adaptable<number>) => Animated.Node<number>;
    duration?: number;
    boomerang?: boolean;
    autoStart?: boolean;
}
export declare const loop: (loopConfig: LoopProps) => Animated.Node<number>;
