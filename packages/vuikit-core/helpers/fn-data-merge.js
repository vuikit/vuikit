function mergeData(){
var arguments$1 = arguments;
for(var e,a,s={},t=arguments.length;t--;){ for(var r=0,c=Object.keys(arguments[t]);r<c.length;r++){ switch(e=c[r]){case"class":case"style":case"directives":Array.isArray(s[e])||(s[e]=[]), s[e]=s[e].concat(arguments$1[t][e]);break;case"staticClass":if(!arguments$1[t][e]){ break; }void 0===s[e]&&(s[e]=""), s[e]&&(s[e]+=" "), s[e]+=arguments$1[t][e].trim();break;case"on":case"nativeOn":s[e]||(s[e]={});for(var o=0,n=Object.keys(arguments[t][e]);o<n.length;o++){ a=n[o], s[e][a]?s[e][a]=[].concat(s[e][a],arguments$1[t][e][a]):s[e][a]=arguments$1[t][e][a]; }break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":s[e]||(s[e]={}), s[e]=__assign({},arguments$1[t][e],s[e]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:s[e]||(s[e]=arguments$1[t][e]);} } }return s}var __assign=Object.assign||function(e){
var arguments$1 = arguments;
for(var a,s=1,t=arguments.length;s<t;s++){a=arguments$1[s];for(var r in a){ Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]); }}return e};

// a map to vue-functional-data-merge
// from Alex Regan - https://github.com/alexsasharegan/vue-functional-data-merge

export { mergeData as default };
