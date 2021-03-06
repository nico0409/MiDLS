import type Animated from "react-native-reanimated";
export interface AnimationState {
    current: number;
}
export interface PhysicsAnimationState extends AnimationState {
    velocity: number;
}
export declare type Animation<State extends AnimationState = AnimationState, PrevState = State> = {
    onFrame: (animation: State, now: number) => boolean;
    onStart: (animation: State, value: number, now: number, lastAnimation: PrevState) => void;
    callback?: () => void;
} & State;
export declare type AnimationParameter<State extends AnimationState = AnimationState> = Animation<State> | (() => Animation<State>) | number;
/**
 *  @summary Access animations passed as parameters safely on both the UI and JS thread with the proper static types.
 *  Animations can receive other animations as parameter.
 */
export declare const animationParameter: <State extends AnimationState = AnimationState>(animationParam: AnimationParameter<State>) => Animation<State, State>;
/**
 *  @summary Declare custom animations that can be invoked on both the JS and UI thread.
 *  @example
 *  defineAnimation(() => {
      "worklet";
      // ...animation code
      return {
        animation,
       start
      }
    });
 * @worklet
 */
export declare const defineAnimation: <S extends AnimationState = AnimationState, Prev extends AnimationState = AnimationState>(factory: () => Omit<Animation<S, Prev>, keyof S>) => number;
/**
 *  @summary Make an animation pausable. The state of the animation (paused or not)
 *  is controlled by a boolean shared value.
 *  @example
    const progress = useSharedValue(0);
    const paused = useSharedValue(false);
    useEffect(() => {
      progress.value = withPause(withLoop(withTiming(1)), paused);
    }, []);
  * @worklet
 */
export declare const withPause: (animationParam: AnimationParameter, paused: Animated.SharedValue<boolean>) => number;
/**
 *  @summary Add a bouncing behavior to a physics-based animation.
 *  An animation is defined as being physics-based if it contains a velocity in its state.
 *  @example
    // will bounce if the animations hits the position 0 or 100
    withBouncing(withDecay({ velocity }), 0, 100)
 * @worklet
 */
export declare const withBouncing: (animationParam: AnimationParameter<PhysicsAnimationState>, lowerBound: number, upperBound: number) => number;
