var PI=Math.PI;export{PI};export var TAU=PI*2;export var bin=function bin(value){"worklet";return value?1:0;};export var mix=function mix(value,x,y){"worklet";return x*(1-value)+y*value;};export var approximates=function approximates(value,target){"worklet";var epsilon=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0.001;return Math.abs(value-target)<epsilon;};export var normalizeRad=function normalizeRad(value){"worklet";var rest=value%TAU;return rest>0?rest:TAU+rest;};export var toDeg=function toDeg(rad){"worklet";return rad*180/Math.PI;};export var toRad=function toRad(deg){"worklet";return deg*Math.PI/180;};export var avg=function avg(values){"worklet";return values.reduce(function(a,v){return a+v;},0)/values.length;};export var between=function between(value,lowerBound,upperBound){"worklet";var inclusive=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;if(inclusive){return value>=lowerBound&&value<=upperBound;}return value>lowerBound&&value<upperBound;};export var clamp=function clamp(value,lowerBound,upperBound){"worklet";return Math.min(Math.max(lowerBound,value),upperBound);};export var cubicBezier=function cubicBezier(t,from,c1,c2,to){"worklet";var term=1-t;var a=1*Math.pow(term,3)*Math.pow(t,0)*from;var b=3*Math.pow(term,2)*Math.pow(t,1)*c1;var c=3*Math.pow(term,1)*Math.pow(t,2)*c2;var d=1*Math.pow(term,0)*Math.pow(t,3)*to;return a+b+c+d;};export var round=function round(value){"worklet";var precision=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var p=Math.pow(10,precision);return Math.round(value*p)/p;};var cuberoot=function cuberoot(x){"worklet";var y=Math.pow(Math.abs(x),1/3);return x<0?-y:y;};var solveCubic=function solveCubic(a,b,c,d){"worklet";if(Math.abs(a)<1e-8){a=b;b=c;c=d;if(Math.abs(a)<1e-8){a=b;b=c;if(Math.abs(a)<1e-8){return[];}return[-b/a];}var D=b*b-4*a*c;if(Math.abs(D)<1e-8){return[-b/(2*a)];}else if(D>0){return[(-b+Math.sqrt(D))/(2*a),(-b-Math.sqrt(D))/(2*a)];}return[];}var p=(3*a*c-b*b)/(3*a*a);var q=(2*b*b*b-9*a*b*c+27*a*a*d)/(27*a*a*a);var roots;if(Math.abs(p)<1e-8){roots=[cuberoot(-q)];}else if(Math.abs(q)<1e-8){roots=[0].concat(p<0?[Math.sqrt(-p),-Math.sqrt(-p)]:[]);}else{var _D=q*q/4+p*p*p/27;if(Math.abs(_D)<1e-8){roots=[-1.5*q/p,3*q/p];}else if(_D>0){var u=cuberoot(-q/2-Math.sqrt(_D));roots=[u-p/(3*u)];}else{var _u=2*Math.sqrt(-p/3);var t=Math.acos(3*q/p/_u)/3;var k=2*Math.PI/3;roots=[_u*Math.cos(t),_u*Math.cos(t-k),_u*Math.cos(t-2*k)];}}for(var i=0;i<roots.length;i++){roots[i]-=b/(3*a);}return roots;};export var cubicBezierYForX=function cubicBezierYForX(x,a,b,c,d){"worklet";var precision=arguments.length>5&&arguments[5]!==undefined?arguments[5]:2;var pa=-a.x+3*b.x-3*c.x+d.x;var pb=3*a.x-6*b.x+3*c.x;var pc=-3*a.x+3*b.x;var pd=a.x-x;var t=solveCubic(pa,pb,pc,pd).map(function(root){return round(root,precision);}).filter(function(root){return root>=0&&root<=1;})[0];return cubicBezier(t,a.y,b.y,c.y,d.y);};export var fract=function fract(x){"worklet";return x-Math.floor(x);};
//# sourceMappingURL=Math.js.map