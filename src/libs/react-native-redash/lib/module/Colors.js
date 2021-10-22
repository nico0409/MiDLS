import{interpolateColor}from"react-native-reanimated";import{clamp,fract,mix}from"./Math";export var isLight=function isLight(r,g,b){"worklet";var L=0.299*r+0.587*g+0.114*b;return L>186;};export var mixColor=function mixColor(value,color1,color2){"worklet";var colorSpace=arguments.length>3&&arguments[3]!==undefined?arguments[3]:"RGB";return interpolateColor(value,[0,1],[color1,color2],colorSpace);};export var hsv2rgb=function hsv2rgb(h,s,v){"worklet";var K={x:1,y:2/3,z:1/3,w:3};var p={x:Math.abs(fract(h+K.x)*6-K.w),y:Math.abs(fract(h+K.y)*6-K.w),z:Math.abs(fract(h+K.z)*6-K.w)};var rgb={x:v*mix(s,K.x,clamp(p.x-K.x,0,1)),y:v*mix(s,K.x,clamp(p.y-K.x,0,1)),z:v*mix(s,K.x,clamp(p.z-K.x,0,1))};var r=Math.round(rgb.x*255);var g=Math.round(rgb.y*255);var b=Math.round(rgb.z*255);return{r:r,g:g,b:b};};export var opacity=function opacity(c){"worklet";return(c>>24&255)/255;};export var red=function red(c){"worklet";return c>>16&255;};export var green=function green(c){"worklet";return c>>8&255;};export var blue=function blue(c){"worklet";return c&255;};
//# sourceMappingURL=Colors.js.map