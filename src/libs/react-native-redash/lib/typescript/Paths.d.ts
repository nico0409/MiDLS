import Animated from "react-native-reanimated";
import type { Vector } from "./Vectors";
interface Curve {
    to: Vector;
    c1: Vector;
    c2: Vector;
}
export declare type Path = {
    move: Vector;
    curves: Curve[];
    close: boolean;
};
/**
 * @summary Serialize a path into an SVG path string
 * @worklet
 */
export declare const serialize: (path: Path) => string;
/**
 * @description ⚠️ this function cannot run on the UI thread. It must be executed on the JS thread
 * @summary Parse an SVG path into a sequence of Bèzier curves.
 * The SVG is normalized to have absolute values and to be approximated to a sequence of Bèzier curves.
 */
export declare const parse: (d: string) => Path;
/**
 * @summary Interpolate between paths.
 * @worklet
 */
export declare const interpolatePath: (value: number, inputRange: number[], outputRange: Path[], extrapolate?: Animated.Extrapolate) => string;
/**
 * @summary Interpolate two paths with an animation value that goes from 0 to 1
 * @worklet
 */
export declare const mixPath: (value: number, p1: Path, p2: Path, extrapolate?: Animated.Extrapolate) => string;
/**
 * @summary Create a new path
 * @worklet
 */
export declare const createPath: (move: Vector) => Path;
/**
 * @summary Add an arc command to a path
 * @worklet
 */
export declare const addArc: (path: Path, corner: Vector, to: Vector) => void;
/**
 * @summary Add a cubic Bèzier curve command to a path.
 * @worklet
 */
export declare const addCurve: (path: Path, c: Curve) => void;
/**
 * @summary Add a line command to a path.
 * @worklet
 */
export declare const addLine: (path: Path, to: Vector) => void;
/**
 * @summary Add a quadratic Bèzier curve command to a path.
 * @worklet
 */
export declare const addQuadraticCurve: (path: Path, cp: Vector, to: Vector) => void;
/**
 * @summary Add a close command to a path.
 * @worklet
 */
export declare const close: (path: Path) => void;
interface SelectedCurve {
    from: Vector;
    curve: Curve;
}
/**
 * @summary Return the curves at x. This function assumes that only one curve is available at x
 * @worklet
 */
export declare const selectCurve: (path: Path, x: number) => SelectedCurve | null;
/**
 * @summary Return the y value of a path given its x coordinate
 * @example
    const p1 = parse(
      "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150"
    );
    // 75
    getYForX(p1, 200))
    // ~151
    getYForX(p1, 50)
 * @worklet
 */
export declare const getYForX: (path: Path, x: number, precision?: number) => number | null;
/**
 * @summary Link points via a smooth cubic Bézier curves
 * from https://github.com/rainbow-me/rainbow
 * @worklet
 */
export declare const curveLines: (points: Vector<number>[], smoothing: number, strategy: "complex" | "bezier" | "simple") => Path;
export {};
