import Animated from "react-native-reanimated";
import type { SpringConfig, TimingConfig } from "./Animations";
export declare const withTransition: (value: Animated.Node<number>, timingConfig?: TimingConfig) => Animated.Node<number>;
export declare const withSpringTransition: (value: Animated.Node<number>, springConfig?: SpringConfig, velocity?: Animated.Adaptable<number>) => Animated.Node<number>;
export declare const withTimingTransition: (value: Animated.Node<number>, timingConfig?: TimingConfig) => Animated.Node<number>;
export declare const useTransition: (state: boolean | number, config?: TimingConfig) => Animated.Node<number>;
export declare const useSpringTransition: (state: boolean | number, config?: SpringConfig) => Animated.Node<number>;
export declare const useTimingTransition: (state: boolean | number, config?: TimingConfig) => Animated.Node<number>;
