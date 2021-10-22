export var parseAngle=function parseAngle(angle){"worklet";if(angle.endsWith("deg")){return parseFloat(angle)*(Math.PI/180);}return parseFloat(angle);};export var isTranslateX=function isTranslateX(transform){"worklet";return Object.keys(transform).indexOf("translateX")!==-1;};export var isTranslateY=function isTranslateY(transform){"worklet";return Object.keys(transform).indexOf("translateY")!==-1;};export var isScale=function isScale(transform){"worklet";return Object.keys(transform).indexOf("scale")!==-1;};export var isScaleX=function isScaleX(transform){"worklet";return Object.keys(transform).indexOf("scaleX")!==-1;};export var isScaleY=function isScaleY(transform){"worklet";return Object.keys(transform).indexOf("scaleY")!==-1;};export var isSkewX=function isSkewX(transform){"worklet";return Object.keys(transform).indexOf("skewX")!==-1;};export var isSkewY=function isSkewY(transform){"worklet";return Object.keys(transform).indexOf("skewY")!==-1;};export var isRotate=function isRotate(transform){"worklet";return Object.keys(transform).indexOf("rotate")!==-1;};export var isRotateZ=function isRotateZ(transform){"worklet";return Object.keys(transform).indexOf("rotateZ")!==-1;};var exhaustiveCheck=function exhaustiveCheck(a){"worklet";throw new Error("Unexhaustive handling for "+a);};var identityMatrix=[[1,0,0],[0,1,0],[0,0,1]];var translateXMatrix=function translateXMatrix(x){"worklet";return[[1,0,x],[0,1,0],[0,0,1]];};var translateYMatrix=function translateYMatrix(y){"worklet";return[[1,0,0],[0,1,y],[0,0,1]];};var scaleMatrix=function scaleMatrix(s){"worklet";return[[s,0,0],[0,s,0],[0,0,1]];};var scaleXMatrix=function scaleXMatrix(s){"worklet";return[[s,0,0],[0,1,0],[0,0,1]];};var scaleYMatrix=function scaleYMatrix(s){"worklet";return[[1,0,0],[0,s,0],[0,0,1]];};var skewXMatrix=function skewXMatrix(s){"worklet";return[[1,Math.tan(s),0],[0,1,0],[0,0,1]];};var skewYMatrix=function skewYMatrix(s){"worklet";return[[1,0,0],[Math.tan(s),1,0],[0,0,1]];};var rotateZMatrix=function rotateZMatrix(r){"worklet";return[[Math.cos(r),-1*Math.sin(r),0],[Math.sin(r),Math.cos(r),0],[0,0,1]];};export var dot3=function dot3(row,col){"worklet";return row[0]*col[0]+row[1]*col[1]+row[2]*col[2];};export var matrixVecMul3=function matrixVecMul3(m,v){"worklet";return[dot3(m[0],v),dot3(m[1],v),dot3(m[2],v)];};export var multiply3=function multiply3(m1,m2){"worklet";var col0=[m2[0][0],m2[1][0],m2[2][0]];var col1=[m2[0][1],m2[1][1],m2[2][1]];var col2=[m2[0][2],m2[1][2],m2[2][2]];return[[dot3(m1[0],col0),dot3(m1[0],col1),dot3(m1[0],col2)],[dot3(m1[1],col0),dot3(m1[1],col1),dot3(m1[1],col2)],[dot3(m1[2],col0),dot3(m1[2],col1),dot3(m1[2],col2)]];};var serializeToSVGMatrix=function serializeToSVGMatrix(m){"worklet";return"matrix("+m[0][0]+", "+m[1][0]+", "+m[0][1]+", "+m[1][1]+", "+m[0][2]+", "+m[1][2]+")";};export var svgMatrix=function svgMatrix(transforms){"worklet";return serializeToSVGMatrix(processTransform2d(transforms));};export var processTransform2d=function processTransform2d(transforms){"worklet";return transforms.reduce(function(acc,transform){if(isTranslateX(transform)){return multiply3(acc,translateXMatrix(transform.translateX));}if(isTranslateY(transform)){return multiply3(acc,translateYMatrix(transform.translateY));}if(isScale(transform)){return multiply3(acc,scaleMatrix(transform.scale));}if(isScaleX(transform)){return multiply3(acc,scaleXMatrix(transform.scaleX));}if(isScaleY(transform)){return multiply3(acc,scaleYMatrix(transform.scaleY));}if(isSkewX(transform)){return multiply3(acc,skewXMatrix(parseAngle(transform.skewX)));}if(isSkewY(transform)){return multiply3(acc,skewYMatrix(parseAngle(transform.skewY)));}if(isRotate(transform)){return multiply3(acc,rotateZMatrix(parseAngle(transform.rotate)));}if(isRotateZ(transform)){return multiply3(acc,rotateZMatrix(parseAngle(transform.rotateZ)));}return exhaustiveCheck(transform);},identityMatrix);};var isMatrix3=function isMatrix3(arg){"worklet";return arg.length===3&&arg[0]instanceof Array;};export var decompose2d=function decompose2d(arg){"worklet";var m=isMatrix3(arg)?arg:processTransform2d(arg);var a=m[0][0];var b=m[1][0];var c=m[0][1];var d=m[1][1];var translateX=m[0][2];var translateY=m[1][2];var E=(a+d)/2;var F=(a-d)/2;var G=(c+b)/2;var H=(c-b)/2;var Q=Math.sqrt(Math.pow(E,2)+Math.pow(H,2));var R=Math.sqrt(Math.pow(F,2)+Math.pow(G,2));var scaleX=Q+R;var scaleY=Q-R;var a1=Math.atan2(G,F);var a2=Math.atan2(H,E);var theta=(a2-a1)/2;var phi=(a2+a1)/2;return[{translateX:translateX},{translateY:translateY},{rotateZ:-1*theta},{scaleX:scaleX},{scaleY:scaleY},{rotateZ:-1*phi}];};var adjugate=function adjugate(m){"worklet";return[[m[1][1]*m[2][2]-m[1][2]*[2][1],m[0][2]*[2][1]-m[0][1]*[2][2],m[0][1]*[1][2]-m[0][2]*[1][1]],[m[1][2]*[2][0]-m[1][0]*[2][2],m[0][0]*[2][2]-m[0][2]*[2][0],m[0][2]*[1][0]-m[0][0]*[1][2]],[m[1][0]*[2][1]-m[1][1]*[2][0],m[0][1]*[2][0]-m[0][0]*[2][1],m[0][0]*[1][1]-m[0][1]*[1][0]]];};var basisToPoints=function basisToPoints(_ref){"worklet";var p1=_ref.p1,p2=_ref.p2,p3=_ref.p3,p4=_ref.p4;var m=[[p1.x,p2.x,p3.x],[p1.y,p2.y,p3.y],[1,1,1]];var v=matrixVecMul3(adjugate(m),[p4.x,p4.y,1]);return multiply3(m,[[v[0],0,0],[0,v[1],0],[0,0,v[2]]]);};export var transform2d=function transform2d(params){"worklet";var s=basisToPoints(params.canvas);var d=basisToPoints(params.projected);var t=multiply3(d,adjugate(s));return[[t[0][0]/t[2][2],t[0][1]/t[2][2],t[0][2]/t[2][2]],[t[1][0]/t[2][2],t[1][1]/t[2][2],t[1][2]/t[2][2]],[t[2][0]/t[2][2],t[2][1]/t[2][2],1]];};
//# sourceMappingURL=Matrix3.js.map