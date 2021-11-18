import Animated from"react-native-reanimated";import{atan2}from"./Math";var add=Animated.add,multiply=Animated.multiply,sqrt=Animated.sqrt,cos=Animated.cos,sin=Animated.sin,sub=Animated.sub,divide=Animated.divide,pow=Animated.pow,tan=Animated.tan;var exhaustiveCheck=function exhaustiveCheck(a){throw new Error("Unexhaustive handling for "+a);};var identityMatrix=[[1,0,0],[0,1,0],[0,0,1]];var translateXMatrix=function translateXMatrix(x){return[[1,0,x],[0,1,0],[0,0,1]];};var translateYMatrix=function translateYMatrix(y){return[[1,0,0],[0,1,y],[0,0,1]];};var scaleMatrix=function scaleMatrix(s){return[[s,0,0],[0,s,0],[0,0,1]];};var scaleXMatrix=function scaleXMatrix(s){return[[s,0,0],[0,1,0],[0,0,1]];};var scaleYMatrix=function scaleYMatrix(s){return[[1,0,0],[0,s,0],[0,0,1]];};var skewXMatrix=function skewXMatrix(s){return[[1,tan(s),0],[0,1,0],[0,0,1]];};var skewYMatrix=function skewYMatrix(s){return[[1,0,0],[tan(s),1,0],[0,0,1]];};var rotateZMatrix=function rotateZMatrix(r){return[[cos(r),multiply(-1,sin(r)),0],[sin(r),cos(r),0],[0,0,1]];};export var dot3=function dot3(row,col){return add(multiply(row[0],col[0]),multiply(row[1],col[1]),multiply(row[2],col[2]));};export var matrixVecMul3=function matrixVecMul3(m,v){return[dot3(m[0],v),dot3(m[1],v),dot3(m[2],v)];};export var multiply3=function multiply3(m1,m2){var col0=[m2[0][0],m2[1][0],m2[2][0]];var col1=[m2[0][1],m2[1][1],m2[2][1]];var col2=[m2[0][2],m2[1][2],m2[2][2]];return[[dot3(m1[0],col0),dot3(m1[0],col1),dot3(m1[0],col2)],[dot3(m1[1],col0),dot3(m1[1],col1),dot3(m1[1],col2)],[dot3(m1[2],col0),dot3(m1[2],col1),dot3(m1[2],col2)]];};export var processTransform2d=function processTransform2d(transforms){return transforms.reduce(function(acc,transform){var key=Object.keys(transform)[0];var value=transform[key];if(key==="translateX"){return multiply3(acc,translateXMatrix(value));}if(key==="translateY"){return multiply3(acc,translateYMatrix(value));}if(key==="scale"){return multiply3(acc,scaleMatrix(value));}if(key==="scaleX"){return multiply3(acc,scaleXMatrix(value));}if(key==="scaleY"){return multiply3(acc,scaleYMatrix(value));}if(key==="skewX"){return multiply3(acc,skewXMatrix(value));}if(key==="skewY"){return multiply3(acc,skewYMatrix(value));}if(key==="rotate"||key==="rotateZ"){return multiply3(acc,rotateZMatrix(value));}return exhaustiveCheck(key);},identityMatrix);};var isMatrix3=function isMatrix3(arg){return arg.length===3&&arg[0]instanceof Array;};export var decompose2d=function decompose2d(arg){var m=isMatrix3(arg)?arg:processTransform2d(arg);var a=m[0][0];var b=m[1][0];var c=m[0][1];var d=m[1][1];var translateX=m[0][2];var translateY=m[1][2];var E=divide(add(a,d),2);var F=divide(sub(a,d),2);var G=divide(add(c,b),2);var H=divide(sub(c,b),2);var Q=sqrt(add(pow(E,2),pow(H,2)));var R=sqrt(add(pow(F,2),pow(G,2)));var scaleX=add(Q,R);var scaleY=sub(Q,R);var a1=atan2(G,F);var a2=atan2(H,E);var theta=divide(sub(a2,a1),2);var phi=divide(add(a2,a1),2);return[{translateX:translateX},{translateY:translateY},{rotateZ:multiply(-1,theta)},{scaleX:scaleX},{scaleY:scaleY},{rotateZ:multiply(-1,phi)}];};var adjugate=function adjugate(m){return[[sub(multiply(m[1][1],m[2][2]),multiply(m[1][2],m[2][1])),sub(multiply(m[0][2],m[2][1]),multiply(m[0][1],m[2][2])),sub(multiply(m[0][1],m[1][2]),multiply(m[0][2],m[1][1]))],[sub(multiply(m[1][2],m[2][0]),multiply(m[1][0],m[2][2])),sub(multiply(m[0][0],m[2][2]),multiply(m[0][2],m[2][0])),sub(multiply(m[0][2],m[1][0]),multiply(m[0][0],m[1][2]))],[sub(multiply(m[1][0],m[2][1]),multiply(m[1][1],m[2][0])),sub(multiply(m[0][1],m[2][0]),multiply(m[0][0],m[2][1])),sub(multiply(m[0][0],m[1][1]),multiply(m[0][1],m[1][0]))]];};var basisToPoints=function basisToPoints(_ref){var p1=_ref.p1,p2=_ref.p2,p3=_ref.p3,p4=_ref.p4;var m=[[p1.x,p2.x,p3.x],[p1.y,p2.y,p3.y],[1,1,1]];var v=matrixVecMul3(adjugate(m),[p4.x,p4.y,1]);return multiply3(m,[[v[0],0,0],[0,v[1],0],[0,0,v[2]]]);};export var transform2d=function transform2d(params){var s=basisToPoints(params.canvas);var d=basisToPoints(params.projected);var t=multiply3(d,adjugate(s));return[[divide(t[0][0],t[2][2]),divide(t[0][1],t[2][2]),divide(t[0][2],t[2][2])],[divide(t[1][0],t[2][2]),divide(t[1][1],t[2][2]),divide(t[1][2],t[2][2])],[divide(t[2][0],t[2][2]),divide(t[2][1],t[2][2]),1]];};
//# sourceMappingURL=Matrix3.js.map