import{useSharedValue}from"react-native-reanimated";export var useVector=function useVector(){var x1=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var y1=arguments.length>1?arguments[1]:undefined;var x=useSharedValue(x1);var y=useSharedValue(y1!=null?y1:x1);return{x:x,y:y};};export var vec2=function vec2(x,y){"worklet";var _ref;return{x:x!=null?x:0,y:(_ref=y!=null?y:x)!=null?_ref:0};};export var vec={create:vec2};
//# sourceMappingURL=Vectors.js.map