(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0XgM":function(X,F,g){},"9W6o":function(X,F,g){"use strict";var j=g("B9cy"),W=g("Ol7k"),S=g("oN5p"),d=g("q1tI"),l=g.n(d),I={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"}}]},name:"copyright",theme:"outlined"},O=I,N=g("6VBw"),$=function(v,s){return d.createElement(N.a,Object.assign({},v,{ref:s,icon:O}))};$.displayName="CopyrightOutlined";var H=d.forwardRef($),K=g("DPCm"),A=g("TSYQ"),c=g.n(A),n=function(h){var v=h.className,s=h.prefixCls,x=s===void 0?"ant-pro":s,_=h.links,R=h.copyright,U=h.style;if((_==null||_===!1||Array.isArray(_)&&_.length===0)&&(R==null||R===!1))return null;var w="".concat(x,"-global-footer"),V=c()(w,v);return l.a.createElement("div",{className:V,style:U},_&&l.a.createElement("div",{className:"".concat(w,"-links")},_.map(function(G){return l.a.createElement("a",{key:G.key,title:G.key,target:G.blankTarget?"_blank":"_self",href:G.href},G.title)})),R&&l.a.createElement("div",{className:"".concat(w,"-copyright")},R))};function i(h,v){var s=Object.keys(h);if(Object.getOwnPropertySymbols){var x=Object.getOwnPropertySymbols(h);v&&(x=x.filter(function(_){return Object.getOwnPropertyDescriptor(h,_).enumerable})),s.push.apply(s,x)}return s}function u(h){for(var v=1;v<arguments.length;v++){var s=arguments[v]!=null?arguments[v]:{};v%2?i(Object(s),!0).forEach(function(x){y(h,x,s[x])}):Object.getOwnPropertyDescriptors?Object.defineProperties(h,Object.getOwnPropertyDescriptors(s)):i(Object(s)).forEach(function(x){Object.defineProperty(h,x,Object.getOwnPropertyDescriptor(s,x))})}return h}function y(h,v,s){return v in h?Object.defineProperty(h,v,{value:s,enumerable:!0,configurable:!0,writable:!0}):h[v]=s,h}var M=W.a.Footer,p=[{key:"Ant Design Pro",title:"Ant Design Pro",href:"https://pro.ant.design",blankTarget:!0},{key:"github",title:l.a.createElement(S.a,null),href:"https://github.com/ant-design/ant-design-pro",blankTarget:!0},{key:"Ant Design",title:"Ant Design",href:"https://ant.design",blankTarget:!0}],b="2019 \u8682\u8681\u91D1\u670D\u4F53\u9A8C\u6280\u672F\u90E8\u51FA\u54C1",C=function(v){var s=v.links,x=v.copyright,_=v.style,R=v.className,U=v.prefixCls;return l.a.createElement(M,{className:R,style:u({padding:0},_)},l.a.createElement(n,{links:s!==void 0?s:p,prefixCls:U,copyright:x===!1?null:l.a.createElement(d.Fragment,null,"Copyright ",l.a.createElement(H,null)," ",x||b)}))},T=F.a=C},B9cy:function(X,F,g){"use strict";var j=g("cIOH"),W=g.n(j),S=g("0XgM"),d=g.n(S)},DPCm:function(X,F,g){},GOef:function(X,F,g){"use strict";g.d(F,"c",function(){return Ue}),g.d(F,"a",function(){return Ae}),g.d(F,"b",function(){return Qe});var j=g("n2rz"),W=g.n(j),S=g("Wwog"),d=g("uPlM");function l(e,r){return r>>>e|r<<32-e}function I(e,r,t){return e&r^~e&t}function O(e,r,t){return e&r^e&t^r&t}function N(e){return l(2,e)^l(13,e)^l(22,e)}function $(e){return l(6,e)^l(11,e)^l(25,e)}function H(e){return l(7,e)^l(18,e)^e>>>3}function K(e){return l(17,e)^l(19,e)^e>>>10}function A(e,r){return e[r&15]+=K(e[r+14&15])+e[r+9&15]+H(e[r+1&15])}var c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],n,i,u,y="0123456789abcdef";function M(e,r){var t=(e&65535)+(r&65535),a=(e>>16)+(r>>16)+(t>>16);return a<<16|t&65535}function p(){n=new Array(8),i=new Array(2),u=new Array(64),i[0]=i[1]=0,n[0]=1779033703,n[1]=3144134277,n[2]=1013904242,n[3]=2773480762,n[4]=1359893119,n[5]=2600822924,n[6]=528734635,n[7]=1541459225}function b(){var e,r,t,a,o,m,f,E,P,D,J=new Array(16);e=n[0],r=n[1],t=n[2],a=n[3],o=n[4],m=n[5],f=n[6],E=n[7];for(var B=0;B<16;B++)J[B]=u[(B<<2)+3]|u[(B<<2)+2]<<8|u[(B<<2)+1]<<16|u[B<<2]<<24;for(var Q=0;Q<64;Q++)P=E+$(o)+I(o,m,f)+c[Q],Q<16?P+=J[Q]:P+=A(J,Q),D=N(e)+O(e,r,t),E=f,f=m,m=o,o=M(a,P),a=t,t=r,r=e,e=M(P,D);n[0]+=e,n[1]+=r,n[2]+=t,n[3]+=a,n[4]+=o,n[5]+=m,n[6]+=f,n[7]+=E}function C(e,r){var t,a,o=0;a=i[0]>>3&63;var m=r&63;for((i[0]+=r<<3)<r<<3&&i[1]++,i[1]+=r>>29,t=0;t+63<r;t+=64){for(var f=a;f<64;f++)u[f]=e.charCodeAt(o++);b(),a=0}for(var f=0;f<m;f++)u[f]=e.charCodeAt(o++)}function T(){var e=i[0]>>3&63;if(u[e++]=128,e<=56)for(var r=e;r<56;r++)u[r]=0;else{for(var r=e;r<64;r++)u[r]=0;b();for(var r=0;r<56;r++)u[r]=0}u[56]=i[1]>>>24&255,u[57]=i[1]>>>16&255,u[58]=i[1]>>>8&255,u[59]=i[1]&255,u[60]=i[0]>>>24&255,u[61]=i[0]>>>16&255,u[62]=i[0]>>>8&255,u[63]=i[0]&255,b()}function h(){for(var e=0,r=new Array(32),t=0;t<8;t++)r[e++]=n[t]>>>24&255,r[e++]=n[t]>>>16&255,r[e++]=n[t]>>>8&255,r[e++]=n[t]&255;return r}function v(){for(var e=new String,r=0;r<8;r++)for(var t=28;t>=0;t-=4)e+=y.charAt(n[r]>>>t&15);return e}function s(e){return p(),C(e,e.length),T(),v()}var x=s;function _(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_=function(t){return typeof t}:_=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(e)}function R(e,r){return V(e)||w(e,r)||se(e,r)||U()}function U(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function w(e,r){if(!(typeof Symbol=="undefined"||!(Symbol.iterator in Object(e)))){var t=[],a=!0,o=!1,m=void 0;try{for(var f=e[Symbol.iterator](),E;!(a=(E=f.next()).done)&&(t.push(E.value),!(r&&t.length===r));a=!0);}catch(P){o=!0,m=P}finally{try{!a&&f.return!=null&&f.return()}finally{if(o)throw m}}return t}}function V(e){if(Array.isArray(e))return e}function G(e,r){var t;if(typeof Symbol=="undefined"||e[Symbol.iterator]==null){if(Array.isArray(e)||(t=se(e))||r&&e&&typeof e.length=="number"){t&&(e=t);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(D){throw D},f:o}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var m=!0,f=!1,E;return{s:function(){t=e[Symbol.iterator]()},n:function(){var D=t.next();return m=D.done,D},e:function(D){f=!0,E=D},f:function(){try{!m&&t.return!=null&&t.return()}finally{if(f)throw E}}}}function k(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function Y(e,r){for(var t=0;t<r.length;t++){var a=r[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function ne(e,r,t){return r&&Y(e.prototype,r),t&&Y(e,t),e}function ee(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&ue(e,r)}function Z(e){var r=me();return function(){var a=ie(e),o;if(r){var m=ie(this).constructor;o=Reflect.construct(a,arguments,m)}else o=a.apply(this,arguments);return q(this,o)}}function q(e,r){return r&&(_(r)==="object"||typeof r=="function")?r:ce(e)}function ce(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ae(e){var r=typeof Map=="function"?new Map:void 0;return ae=function(a){if(a===null||!Me(a))return a;if(typeof a!="function")throw new TypeError("Super expression must either be null or a function");if(typeof r!="undefined"){if(r.has(a))return r.get(a);r.set(a,o)}function o(){return re(a,arguments,ie(this).constructor)}return o.prototype=Object.create(a.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),ue(o,a)},ae(e)}function re(e,r,t){return me()?re=Reflect.construct:re=function(o,m,f){var E=[null];E.push.apply(E,m);var P=Function.bind.apply(o,E),D=new P;return f&&ue(D,f.prototype),D},re.apply(null,arguments)}function me(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function Me(e){return Function.toString.call(e).indexOf("[native code]")!==-1}function ue(e,r){return ue=Object.setPrototypeOf||function(a,o){return a.__proto__=o,a},ue(e,r)}function ie(e){return ie=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},ie(e)}function ge(e){return Te(e)||Se(e)||se(e)||Pe()}function Pe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function se(e,r){if(!!e){if(typeof e=="string")return de(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return de(e,r)}}function Se(e){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(e))return Array.from(e)}function Te(e){if(Array.isArray(e))return de(e)}function de(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,a=new Array(r);t<r;t++)a[t]=e[t];return a}function Re(e,r){if(e==null)return{};var t=De(e,r),a,o;if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(e);for(o=0;o<m.length;o++)a=m[o],!(r.indexOf(a)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,a)||(t[a]=e[a]))}return t}function De(e,r){if(e==null)return{};var t={},a=Object.keys(e),o,m;for(m=0;m<a.length;m++)o=a[m],!(r.indexOf(o)>=0)&&(t[o]=e[o]);return t}function be(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),t.push.apply(t,a)}return t}function L(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?be(Object(t),!0).forEach(function(a){je(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):be(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function je(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function fe(e){return e.split("?")[0].split("#")[0]}var ve=function(r){if(!r.startsWith("http"))return!1;try{var t=new URL(r);return!!t}catch(a){return!1}},Ce=function(r){var t=r.path;if(!t||t==="/")try{return"/".concat(x(JSON.stringify(r)))}catch(a){}return t&&fe(t)},Ie=function(r,t){var a=r.name,o=r.locale;return"locale"in r&&o===!1||!a?!1:r.locale||"".concat(t,".").concat(a)},Oe=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"/";return(r||t).startsWith("/")||ve(r)?r:"/".concat(t,"/").concat(r).replace(/\/\//g,"/").replace(/\/\//g,"/")},Ne=function(r,t){var a=r.menu,o=a===void 0?{}:a,m=r.indexRoute,f=r.path,E=f===void 0?"":f,P=r.children,D=o.name,J=D===void 0?r.name:D,B=o.icon,Q=B===void 0?r.icon:B,pe=o.hideChildren,_e=pe===void 0?r.hideChildren:pe,he=o.flatMenu,we=he===void 0?r.flatMenu:he,oe=m&&Object.keys(m).join(",")!=="redirect"?[L({path:E,menu:o},m)].concat(P||[]):P,z=L({},r);if(J&&(z.name=J),Q&&(z.icon=Q),oe&&oe.length){if(_e)return delete z.children,z;var te=ye(L(L({},t),{},{data:oe}),r);if(we)return te;z.children=te}return z};function ye(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{path:"/"},t=e.data,a=e.formatMessage,o=e.parentName,m=e.locale;return!t||!Array.isArray(t)?[]:t.filter(function(f){return f?f.routes||f.children||f.path||f.layout?!0:(f.redirect,!1):!1}).filter(function(f){var E,P;return f.unaccessible&&delete f.name,(f==null||(E=f.menu)===null||E===void 0?void 0:E.name)||(f==null?void 0:f.flatMenu)||(f==null||(P=f.menu)===null||P===void 0?void 0:P.flatMenu)?!0:f.menu!==!1}).map(function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{path:"/"},E=Oe(f.path,r?r.path:"/"),P=f.name,D=Ie(f,o||"menu"),J=D!==!1&&m!==!1&&a&&D?a({id:D,defaultMessage:P}):P,B=r.pro_layout_parentKeys,Q=B===void 0?[]:B,pe=r.children,_e=r.icon,he=r.flatMenu,we=r.indexRoute,oe=Re(r,["pro_layout_parentKeys","children","icon","flatMenu","indexRoute"]),z=L(L(L({},oe),{},{menu:void 0},f),{},{path:E,locale:D,key:f.key||Ce(L(L({},f),{},{path:E})),routes:null,pro_layout_parentKeys:Array.from(new Set([].concat(ge(f.parentKeys||[]),ge(Q),["/".concat(r.key||"").replace(/\/\//g,"/").replace(/\/\//g,"/")]))).filter(function(Ee){return Ee&&Ee!=="/"})});if(J?z.name=J:delete z.name,z.menu===void 0&&delete z.menu,f.routes||f.children){var te=ye(L(L({},e),{},{data:f.routes||f.children,parentName:D||""}),z);z.children=te&&te.length>0?te:void 0,z.children||delete z.children}return Ne(z,e)}).flat(1)}var Fe=Object(S.a)(ye,W.a),Be=function e(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];return r.filter(function(t){return t&&(t.name||t.children)&&!t.hideInMenu&&!t.redirect}).map(function(t){if(t.children&&Array.isArray(t.children)&&!t.hideChildrenInMenu&&t.children.some(function(o){return o&&!!o.name})){var a=e(t.children);if(a.length)return L(L({},t),{},{children:a})}return L(L({},t),{},{children:void 0})}).filter(function(t){return t})},We=function(e){ee(t,e);var r=Z(t);function t(){return k(this,t),r.apply(this,arguments)}return ne(t,[{key:"get",value:function(o){var m;try{var f=G(this.entries()),E;try{for(f.s();!(E=f.n()).done;){var P=R(E.value,2),D=P[0],J=P[1],B=fe(D);if(!ve(D)&&Object(d.b)(B,[]).test(o)){m=J;break}}}catch(Q){f.e(Q)}finally{f.f()}}catch(Q){m=void 0}return m}}]),t}(ae(Map)),Ke=function(r){var t=new We,a=function o(m,f){m.forEach(function(E){E&&E.children&&o(E.children,E);var P=Oe(E.path,f?f.path:"/");t.set(fe(P),E)})};return a(r),t},$e=Object(S.a)(Ke,W.a),He=function e(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];return r.map(function(t){if(t.children&&Array.isArray(t.children)&&t.children.length>0){var a=e(t.children);if(a.length)return L(L({},t),{},{children:a})}var o=L({},t);return delete o.children,o}).filter(function(t){return t})},Le=function(r,t,a,o){var m=Fe({data:r,formatMessage:a,locale:t}),f=o?He(m):Be(m),E=$e(m);return{breadcrumb:E,menuData:f}},Ue=Le;function xe(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),t.push.apply(t,a)}return t}function le(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?xe(Object(t),!0).forEach(function(a){ze(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):xe(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function ze(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var Ge=function e(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t={};return r.forEach(function(a){!a||!a.key||(t[fe(a.path||a.key||"/")]=le({},a),t[a.key||a.path||"/"]=le({},a),a.children&&(t=le(le({},t),e(a.children))))}),t},Ae=Ge,Ve=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return r.filter(function(a){if(a==="/"&&t==="/")return!0;if(a!=="/"&&a!=="/*"&&a&&!ve(a)){var o=fe(a);try{if(Object(d.b)("".concat(o),[]).test(t)||Object(d.b)("".concat(o,"/(.*)")).test(t))return!0}catch(m){}}return!1}).sort(function(a,o){return a===t?10:o===t?-10:a.substr(1).split("/").length-o.substr(1).split("/").length})},Je=function(r,t,a){var o=Ae(t),m=Object.keys(o),f=Ve(m,r||"/");return!f||f.length<1?[]:(a||(f=[f[f.length-1]]),f.map(function(E){var P=o[E]||{pro_layout_parentKeys:"",key:""},D=new Map,J=(P.pro_layout_parentKeys||[]).map(function(B){return D.has(B)?null:(D.set(B,!0),o[B])}).filter(function(B){return B});return P.key&&J.push(P),J}).flat(1))},Qe=Je},Ol7k:function(X,F,g){"use strict";var j=g("PKem"),W=g("ZX9x"),S=j.e;S.Header=j.c,S.Footer=j.b,S.Content=j.a,S.Sider=W.b,F.a=S},Qv07:function(X,F,g){"use strict";var j=g("GOef");function W(c,n){return l(c)||d(c,n)||N(c,n)||S()}function S(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function d(c,n){if(!(typeof Symbol=="undefined"||!(Symbol.iterator in Object(c)))){var i=[],u=!0,y=!1,M=void 0;try{for(var p=c[Symbol.iterator](),b;!(u=(b=p.next()).done)&&(i.push(b.value),!(n&&i.length===n));u=!0);}catch(C){y=!0,M=C}finally{try{!u&&p.return!=null&&p.return()}finally{if(y)throw M}}return i}}function l(c){if(Array.isArray(c))return c}function I(c){return H(c)||$(c)||N(c)||O()}function O(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function N(c,n){if(!!c){if(typeof c=="string")return K(c,n);var i=Object.prototype.toString.call(c).slice(8,-1);if(i==="Object"&&c.constructor&&(i=c.constructor.name),i==="Map"||i==="Set")return Array.from(c);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return K(c,n)}}function $(c){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(c))return Array.from(c)}function H(c){if(Array.isArray(c))return K(c)}function K(c,n){(n==null||n>c.length)&&(n=c.length);for(var i=0,u=new Array(n);i<n;i++)u[i]=c[i];return u}function A(c){return I(c).reduce(function(n,i){var u=W(i,2),y=u[0],M=u[1];return n[y]=M,n},{})}F.a=function(c,n,i,u){var y=Object(j.c)(c,(n==null?void 0:n.locale)||!1,i,!0),M=y.menuData,p=y.breadcrumb;if(!u)return{breadcrumb:A(p),breadcrumbMap:p,menuData:M};var b=Object(j.c)(u(M),(n==null?void 0:n.locale)||!1,i,!0);return{breadcrumb:A(b.breadcrumb),breadcrumbMap:b.breadcrumb,menuData:b.menuData}}},Wwog:function(X,F,g){"use strict";function j(S,d){if(S.length!==d.length)return!1;for(var l=0;l<S.length;l++)if(S[l]!==d[l])return!1;return!0}function W(S,d){d===void 0&&(d=j);var l,I=[],O,N=!1;function $(){for(var H=[],K=0;K<arguments.length;K++)H[K]=arguments[K];return N&&l===this&&d(H,I)||(O=S.apply(this,H),N=!0,l=this,I=H),O}return $}F.a=W},n2rz:function(X,F,g){"use strict";var j=g("bfL6"),W=typeof BigInt64Array!="undefined";X.exports=function S(d,l){if(d===l)return!0;if(d&&l&&typeof d=="object"&&typeof l=="object"){if(d.constructor!==l.constructor)return!1;var I,O,N;if(Array.isArray(d)){if(I=d.length,I!=l.length)return!1;for(O=I;O--!=0;)if(!S(d[O],l[O]))return!1;return!0}if(d instanceof Map&&l instanceof Map){if(d.size!==l.size)return!1;var $=j(d.entries()),H;try{for($.s();!(H=$.n()).done;)if(O=H.value,!l.has(O[0]))return!1}catch(u){$.e(u)}finally{$.f()}var K=j(d.entries()),A;try{for(K.s();!(A=K.n()).done;)if(O=A.value,!S(O[1],l.get(O[0])))return!1}catch(u){K.e(u)}finally{K.f()}return!0}if(d instanceof Set&&l instanceof Set){if(d.size!==l.size)return!1;var c=j(d.entries()),n;try{for(c.s();!(n=c.n()).done;)if(O=n.value,!l.has(O[0]))return!1}catch(u){c.e(u)}finally{c.f()}return!0}if(ArrayBuffer.isView(d)&&ArrayBuffer.isView(l)){if(I=d.length,I!=l.length)return!1;for(O=I;O--!=0;)if(d[O]!==l[O])return!1;return!0}if(d.constructor===RegExp)return d.source===l.source&&d.flags===l.flags;if(d.valueOf!==Object.prototype.valueOf)return d.valueOf()===l.valueOf();if(d.toString!==Object.prototype.toString)return d.toString()===l.toString();if(N=Object.keys(d),I=N.length,I!==Object.keys(l).length)return!1;for(O=I;O--!=0;)if(!Object.prototype.hasOwnProperty.call(l,N[O]))return!1;for(O=I;O--!=0;){var i=N[O];if(!S(d[i],l[i]))return!1}return!0}return d!==d&&l!==l}},oN5p:function(X,F,g){"use strict";var j=g("q1tI"),W={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"}}]},name:"github",theme:"outlined"},S=W,d=g("6VBw"),l=function(N,$){return j.createElement(d.a,Object.assign({},N,{ref:$,icon:S}))};l.displayName="GithubOutlined";var I=F.a=j.forwardRef(l)},su3W:function(X,F,g){"use strict";g.d(F,"b",function(){return H});var j=g("vRGJ"),W=g.n(j);function S(A){return O(A)||I(A)||l(A)||d()}function d(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function l(A,c){if(!!A){if(typeof A=="string")return N(A,c);var n=Object.prototype.toString.call(A).slice(8,-1);if(n==="Object"&&A.constructor&&(n=A.constructor.name),n==="Map"||n==="Set")return Array.from(A);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(A,c)}}function I(A){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(A))return Array.from(A)}function O(A){if(Array.isArray(A))return N(A)}function N(A,c){(c==null||c>A.length)&&(c=A.length);for(var n=0,i=new Array(c);n<c;n++)i[n]=A[n];return i}var $=function(c,n,i){if(i){var u=S(i.keys()).find(function(M){return W()(M).test(c)});if(u)return i.get(u)}if(n){var y=Object.keys(n).find(function(M){return W()(M).test(c)});if(y)return n[y]}return{path:""}},H=function(c,n){var i=c.pathname,u=i===void 0?"/":i,y=c.breadcrumb,M=c.breadcrumbMap,p=c.formatMessage,b=c.title,C=b===void 0?"Ant Design Pro":b,T=c.menu,h=T===void 0?{locale:!1}:T,v=n?"":C||"",s=$(u,y,M);if(!s)return{title:v,id:"",pageName:v};var x=s.name;return h.locale!==!1&&s.locale&&p&&(x=p({id:s.locale||"",defaultMessage:s.name})),x?n||!C?{title:x,id:s.locale||"",pageName:x}:{title:"".concat(x," - ").concat(C),id:s.locale||"",pageName:x}:{title:v,id:s.locale||"",pageName:v}},K=function(c,n){return H(c,n).title};F.a=K},uPlM:function(X,F,g){"use strict";g.d(F,"a",function(){return l}),g.d(F,"b",function(){return c});function j(n){for(var i=[],u=0;u<n.length;){var y=n[u];if(y==="*"||y==="+"||y==="?"){i.push({type:"MODIFIER",index:u,value:n[u++]});continue}if(y==="\\"){i.push({type:"ESCAPED_CHAR",index:u++,value:n[u++]});continue}if(y==="{"){i.push({type:"OPEN",index:u,value:n[u++]});continue}if(y==="}"){i.push({type:"CLOSE",index:u,value:n[u++]});continue}if(y===":"){for(var M="",p=u+1;p<n.length;){var b=n.charCodeAt(p);if(b>=48&&b<=57||b>=65&&b<=90||b>=97&&b<=122||b===95){M+=n[p++];continue}break}if(!M)throw new TypeError("Missing parameter name at "+u);i.push({type:"NAME",index:u,value:M}),u=p;continue}if(y==="("){var C=1,T="",p=u+1;if(n[p]==="?")throw new TypeError('Pattern cannot start with "?" at '+p);for(;p<n.length;){if(n[p]==="\\"){T+=n[p++]+n[p++];continue}if(n[p]===")"){if(C--,C===0){p++;break}}else if(n[p]==="("&&(C++,n[p+1]!=="?"))throw new TypeError("Capturing groups are not allowed at "+p);T+=n[p++]}if(C)throw new TypeError("Unbalanced pattern at "+u);if(!T)throw new TypeError("Missing pattern at "+u);i.push({type:"PATTERN",index:u,value:T}),u=p;continue}i.push({type:"CHAR",index:u,value:n[u++]})}return i.push({type:"END",index:u,value:""}),i}function W(n,i){i===void 0&&(i={});for(var u=j(n),y=i.prefixes,M=y===void 0?"./":y,p="[^"+O(i.delimiter||"/#?")+"]+?",b=[],C=0,T=0,h="",v=function(Z){if(T<u.length&&u[T].type===Z)return u[T++].value},s=function(Z){var q=v(Z);if(q!==void 0)return q;var ce=u[T],ae=ce.type,re=ce.index;throw new TypeError("Unexpected "+ae+" at "+re+", expected "+Z)},x=function(){for(var Z="",q;q=v("CHAR")||v("ESCAPED_CHAR");)Z+=q;return Z};T<u.length;){var _=v("CHAR"),R=v("NAME"),U=v("PATTERN");if(R||U){var w=_||"";M.indexOf(w)===-1&&(h+=w,w=""),h&&(b.push(h),h=""),b.push({name:R||C++,prefix:w,suffix:"",pattern:U||p,modifier:v("MODIFIER")||""});continue}var V=_||v("ESCAPED_CHAR");if(V){h+=V;continue}h&&(b.push(h),h="");var G=v("OPEN");if(G){var w=x(),k=v("NAME")||"",Y=v("PATTERN")||"",ne=x();s("CLOSE"),b.push({name:k||(Y?C++:""),pattern:k&&!Y?p:Y,prefix:w,suffix:ne,modifier:v("MODIFIER")||""});continue}s("END")}return b}function S(n,i){return d(W(n,i),i)}function d(n,i){i===void 0&&(i={});var u=N(i),y=i.encode,M=y===void 0?function(T){return T}:y,p=i.validate,b=p===void 0?!0:p,C=n.map(function(T){if(typeof T=="object")return new RegExp("^(?:"+T.pattern+")$",u)});return function(T){for(var h="",v=0;v<n.length;v++){var s=n[v];if(typeof s=="string"){h+=s;continue}var x=T?T[s.name]:void 0,_=s.modifier==="?"||s.modifier==="*",R=s.modifier==="*"||s.modifier==="+";if(Array.isArray(x)){if(!R)throw new TypeError('Expected "'+s.name+'" to not repeat, but got an array');if(x.length===0){if(_)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var U=0;U<x.length;U++){var w=M(x[U],s);if(b&&!C[v].test(w))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but got "'+w+'"');h+=s.prefix+w+s.suffix}continue}if(typeof x=="string"||typeof x=="number"){var w=M(String(x),s);if(b&&!C[v].test(w))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but got "'+w+'"');h+=s.prefix+w+s.suffix;continue}if(!_){var V=R?"an array":"a string";throw new TypeError('Expected "'+s.name+'" to be '+V)}}return h}}function l(n,i){var u=[],y=c(n,u,i);return I(y,u,i)}function I(n,i,u){u===void 0&&(u={});var y=u.decode,M=y===void 0?function(p){return p}:y;return function(p){var b=n.exec(p);if(!b)return!1;for(var C=b[0],T=b.index,h=Object.create(null),v=function(_){if(b[_]===void 0)return"continue";var R=i[_-1];R.modifier==="*"||R.modifier==="+"?h[R.name]=b[_].split(R.prefix+R.suffix).map(function(U){return M(U,R)}):h[R.name]=M(b[_],R)},s=1;s<b.length;s++)v(s);return{path:C,index:T,params:h}}}function O(n){return n.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function N(n){return n&&n.sensitive?"":"i"}function $(n,i){if(!i)return n;var u=n.source.match(/\((?!\?)/g);if(u)for(var y=0;y<u.length;y++)i.push({name:y,prefix:"",suffix:"",modifier:"",pattern:""});return n}function H(n,i,u){var y=n.map(function(M){return c(M,i,u).source});return new RegExp("(?:"+y.join("|")+")",N(u))}function K(n,i,u){return A(W(n,u),i,u)}function A(n,i,u){u===void 0&&(u={});for(var y=u.strict,M=y===void 0?!1:y,p=u.start,b=p===void 0?!0:p,C=u.end,T=C===void 0?!0:C,h=u.encode,v=h===void 0?function(ee){return ee}:h,s="["+O(u.endsWith||"")+"]|$",x="["+O(u.delimiter||"/#?")+"]",_=b?"^":"",R=0,U=n;R<U.length;R++){var w=U[R];if(typeof w=="string")_+=O(v(w));else{var V=O(v(w.prefix)),G=O(v(w.suffix));if(w.pattern)if(i&&i.push(w),V||G)if(w.modifier==="+"||w.modifier==="*"){var k=w.modifier==="*"?"?":"";_+="(?:"+V+"((?:"+w.pattern+")(?:"+G+V+"(?:"+w.pattern+"))*)"+G+")"+k}else _+="(?:"+V+"("+w.pattern+")"+G+")"+w.modifier;else _+="("+w.pattern+")"+w.modifier;else _+="(?:"+V+G+")"+w.modifier}}if(T)M||(_+=x+"?"),_+=u.endsWith?"(?="+s+")":"$";else{var Y=n[n.length-1],ne=typeof Y=="string"?x.indexOf(Y[Y.length-1])>-1:Y===void 0;M||(_+="(?:"+x+"(?="+s+"))?"),ne||(_+="(?="+x+"|"+s+")")}return new RegExp(_,N(u))}function c(n,i,u){return n instanceof RegExp?$(n,i):Array.isArray(n)?H(n,i,u):K(n,i,u)}}}]);