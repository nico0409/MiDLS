import _toConsumableArray from"@babel/runtime/helpers/toConsumableArray";import Animated from"react-native-reanimated";var concat=Animated.concat;export var string=function string(strings){for(var _len=arguments.length,values=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){values[_key-1]=arguments[_key];}if(values.length===0){return concat(strings[0]);}var result=values.reduce(function(acc,v,idx){return[].concat(_toConsumableArray(acc),[strings[idx],v]);},[]);result.push(strings[strings.length-1]);return concat.apply(void 0,_toConsumableArray(result));};
//# sourceMappingURL=String.js.map