export declare type AnimatedColor = string | number;
/**
 * @summary Returns black or white depending on the value of the background color.
 * @worklet
 */
export declare const isLight: (r: number, g: number, b: number) => boolean;
/**
 * Interpolate color from 0 to 1
 * @param value
 * @param color1
 * @param color2
 * @param colorSpace
 * @worklet
 */
export declare const mixColor: (value: number, color1: AnimatedColor, color2: AnimatedColor, colorSpace?: "RGB" | "HSV") => string | number;
export declare const hsv2rgb: (h: number, s: number, v: number) => {
    r: number;
    g: number;
    b: number;
};
export declare const opacity: (c: number) => number;
export declare const red: (c: number) => number;
export declare const green: (c: number) => number;
export declare const blue: (c: number) => number;
