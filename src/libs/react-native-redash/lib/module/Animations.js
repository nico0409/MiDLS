export var animationParameter=function animationParameter(animationParam){"worklet";if(typeof animationParam==="number"){throw new Error("Expected Animation as parameter");}return typeof animationParam==="function"?animationParam():animationParam;};export var defineAnimation=function defineAnimation(factory){"worklet";if(_WORKLET){return factory();}return factory;};export var withPause=function withPause(animationParam,paused){"worklet";return defineAnimation(function(){"worklet";var nextAnimation=animationParameter(animationParam);var onFrame=function onFrame(state,now){var lastTimestamp=state.lastTimestamp,elapsed=state.elapsed;if(paused.value){state.elapsed=now-lastTimestamp;return false;}var dt=now-elapsed;var finished=nextAnimation.onFrame(nextAnimation,dt);state.current=nextAnimation.current;state.lastTimestamp=dt;return finished;};var onStart=function onStart(state,value,now,previousState){state.lastTimestamp=now;state.elapsed=0;nextAnimation.onStart(nextAnimation,value,now,previousState);};return{onFrame:onFrame,onStart:onStart,callback:nextAnimation.callback};});};export var withBouncing=function withBouncing(animationParam,lowerBound,upperBound){"worklet";return defineAnimation(function(){"worklet";var nextAnimation=animationParameter(animationParam);var onFrame=function onFrame(state,now){var finished=nextAnimation.onFrame(nextAnimation,now);var velocity=nextAnimation.velocity,current=nextAnimation.current;state.current=current;if(velocity<0&&state.current<=lowerBound||velocity>0&&state.current>=upperBound){state.current=velocity<0?lowerBound:upperBound;nextAnimation.velocity*=-0.5;}return finished;};var onStart=function onStart(_state,value,now,previousState){nextAnimation.onStart(nextAnimation,value,now,previousState);};return{onFrame:onFrame,onStart:onStart,callback:nextAnimation.callback};});};
//# sourceMappingURL=Animations.js.map