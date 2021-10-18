import type Animated from "react-native-reanimated";
export declare const useSpring: (state: boolean | number, config?: Animated.WithSpringConfig | undefined) => Readonly<Animated.SharedValue<number>>;
export declare const useTiming: (state: boolean | number, config?: Animated.WithTimingConfig | undefined) => Readonly<Animated.SharedValue<number>>;
