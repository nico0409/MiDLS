import Animated from "react-native-reanimated";
import type { Vector } from "./Vectors";
export declare type Vec3 = readonly [
    Animated.Adaptable<number>,
    Animated.Adaptable<number>,
    Animated.Adaptable<number>
];
export declare type Matrix3 = readonly [Vec3, Vec3, Vec3];
declare type Transform2dName = "translateX" | "translateY" | "scale" | "skewX" | "skewY" | "scaleX" | "scaleY" | "rotateZ" | "rotate";
declare type Transformations = {
    [Name in Transform2dName]: Animated.Adaptable<number>;
};
export declare type Transforms2d = (Pick<Transformations, "translateX"> | Pick<Transformations, "translateY"> | Pick<Transformations, "scale"> | Pick<Transformations, "scaleX"> | Pick<Transformations, "scaleY"> | Pick<Transformations, "skewX"> | Pick<Transformations, "skewY"> | Pick<Transformations, "rotateZ"> | Pick<Transformations, "rotate">)[];
export declare const dot3: (row: Vec3, col: Vec3) => Animated.Node<number>;
export declare const matrixVecMul3: (m: Matrix3, v: Vec3) => readonly [Animated.Node<number>, Animated.Node<number>, Animated.Node<number>];
export declare const multiply3: (m1: Matrix3, m2: Matrix3) => readonly [readonly [Animated.Node<number>, Animated.Node<number>, Animated.Node<number>], readonly [Animated.Node<number>, Animated.Node<number>, Animated.Node<number>], readonly [Animated.Node<number>, Animated.Node<number>, Animated.Node<number>]];
export declare const processTransform2d: (transforms: Transforms2d) => Matrix3;
export declare const decompose2d: (arg: Matrix3 | Transforms2d) => readonly [{
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
interface Quadrilateral {
    p1: Vector;
    p2: Vector;
    p3: Vector;
    p4: Vector;
}
interface Parameters {
    canvas: Quadrilateral;
    projected: Quadrilateral;
}
export declare const transform2d: (params: Parameters) => readonly [readonly [Animated.Node<number>, Animated.Node<number>, Animated.Node<number>], readonly [Animated.Node<number>, Animated.Node<number>, Animated.Node<number>], readonly [Animated.Node<number>, Animated.Node<number>, 1]];
export {};
