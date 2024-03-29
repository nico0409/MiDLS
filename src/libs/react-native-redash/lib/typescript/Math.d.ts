import type { Vector } from "./Vectors";
export declare const PI: number;
export declare const TAU: number;
/**
 * @summary Convert a boolean value into a number.
 * This can be useful in reanimated since 0 and 1 are used for conditional statements.
 * @worklet
 */
export declare const bin: (value: boolean) => 0 | 1;
/**
 * Linear interpolation
 * @param value
 * @param x
 * @param y
 * @worklet
 */
export declare const mix: (value: number, x: number, y: number) => number;
/**
 * @summary Check is value is almost equal to the target.
 * @worklet
 */
export declare const approximates: (value: number, target: number, epsilon?: number) => boolean;
/**
 * @summary Normalize any radian value between 0 and 2PI.
 * For example, if the value is -PI/2, it will be comverted to 1.5PI.
 * Or 4PI will be converted to 0.
 * @worklet
 */
export declare const normalizeRad: (value: number) => number;
/**
 * @summary Transforms an angle from radians to degrees.
 * @worklet
 */
export declare const toDeg: (rad: number) => number;
/**
 * @summary Transforms an angle from degrees to radians.
 * @worklet
 */
export declare const toRad: (deg: number) => number;
/**
 *
 * @summary Returns the average value
 * @worklet
 */
export declare const avg: (values: number[]) => number;
/**
 * @summary Returns true if node is within lowerBound and upperBound.
 * @worklet
 */
export declare const between: (value: number, lowerBound: number, upperBound: number, inclusive?: boolean) => boolean;
/**
 *  @summary Clamps a node with a lower and upper bound.
 *  @example
    clamp(-1, 0, 100); // 0
    clamp(1, 0, 100); // 1
    clamp(101, 0, 100); // 100
  * @worklet
  */
export declare const clamp: (value: number, lowerBound: number, upperBound: number) => number;
/**
 * @description Returns the coordinate of a cubic bezier curve. t is the length of the curve from 0 to 1.
 * cubicBezier(0, p0, p1, p2, p3) equals p0 and cubicBezier(1, p0, p1, p2, p3) equals p3.
 * p0 and p3 are respectively the starting and ending point of the curve. p1 and p2 are the control points.
 * @worklet
 */
export declare const cubicBezier: (t: number, from: number, c1: number, c2: number, to: number) => number;
/**
 * @summary Computes animation node rounded to precision.
 * @worklet
 */
export declare const round: (value: number, precision?: number) => number;
/**
 *  @summary Given a cubic Bèzier curve, return the y value for x.
 *  @example
    const x = 116;
    const from = vec.create(59, 218);
    const c1 = vec.create(131, 39);
    const c2 = vec.create(204, 223);
    const to = vec.create(227, 89);
    // y= 139
    const y = cubicBezierYForX(x, from, c1, c2, to)));
  * @worklet
  */
export declare const cubicBezierYForX: (x: number, a: Vector, b: Vector, c: Vector, d: Vector, precision?: number) => number;
export declare const fract: (x: number) => number;
