import Animated from"react-native-reanimated";var Value=Animated.Value,cond=Animated.cond,eq=Animated.eq,or=Animated.or;export var get=function get(array,index){var notFound=arguments.length>2&&arguments[2]!==undefined?arguments[2]:new Value();return array.reduce(function(acc,v,i){return cond(eq(i,index),v,acc);},notFound);};export var contains=function contains(values,value){return values.reduce(function(acc,v){return or(acc,eq(value,v));},new Value(0));};export var find=function find(values,fn){var notFound=arguments.length>2&&arguments[2]!==undefined?arguments[2]:new Value();return values.reduce(function(acc,v){return cond(fn(v),v,acc);},notFound);};
//# sourceMappingURL=Array.js.map