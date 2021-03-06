import type Animated from "react-native-reanimated";
/**
 * @summary Type representing a vector
 * @example
   export interface Vector<T = number> {
    x: T;
    y: T;
  }
 */
export interface Vector<T = number> {
    x: T;
    y: T;
}
/**
 * @summary Returns a vector of shared values
 */
export declare const useVector: (x1?: number, y1?: number | undefined) => Vector<Animated.SharedValue<number>>;
declare type Create = {
    (): Vector<0>;
    <T extends Animated.Adaptable<number>>(x: T, y?: T): Vector<T>;
};
/**
 *
 * @param x
 * @param y
 * @worklet
 */
export declare const vec2: Create;
export declare const vec: {
    create: Create;
};
export {};
