(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"+KLJ":function(A,P,e){"use strict";var s=e("wx14"),m=e("rePB"),a=e("ODXe"),y=e("q1tI"),I=e("4i/N"),B=e("Ue1A"),x=e("RCxd"),f=e("+YFz"),G=e("2BaD"),k=e("jO45"),ne=e("IMoZ"),q=e("zueq"),D=e("jN4g"),F=e("8XRh"),ee=e("TSYQ"),T=e.n(ee),ge=e("H84U");function Qe(L){return Object.keys(L).reduce(function(g,E){return(E.substr(0,5)==="data-"||E.substr(0,5)==="aria-"||E==="role")&&E.substr(0,7)!=="data-__"&&(g[E]=L[E]),g},{})}var Ve=e("1OyB"),Ie=e("vuIU"),Me=e("Ji7U"),C=e("LK+K"),d=function(L){Object(Me.a)(E,L);var g=Object(C.a)(E);function E(){var M;return Object(Ve.a)(this,E),M=g.apply(this,arguments),M.state={error:void 0,info:{componentStack:""}},M}return Object(Ie.a)(E,[{key:"componentDidCatch",value:function(K,Y){this.setState({error:K,info:Y})}},{key:"render",value:function(){var K=this.props,Y=K.message,re=K.description,ue=K.children,ye=this.state,ve=ye.error,Ee=ye.info,De=Ee&&Ee.componentStack?Ee.componentStack:null,Le=typeof Y=="undefined"?(ve||"").toString():Y,Re=typeof re=="undefined"?De:re;return ve?y.createElement(me,{type:"error",message:Le,description:y.createElement("pre",null,Re)}):ue}}]),E}(y.Component),S=e("0n0R"),c=function(L,g){var E={};for(var M in L)Object.prototype.hasOwnProperty.call(L,M)&&g.indexOf(M)<0&&(E[M]=L[M]);if(L!=null&&typeof Object.getOwnPropertySymbols=="function")for(var K=0,M=Object.getOwnPropertySymbols(L);K<M.length;K++)g.indexOf(M[K])<0&&Object.prototype.propertyIsEnumerable.call(L,M[K])&&(E[M[K]]=L[M[K]]);return E},b={success:k.a,info:q.a,error:D.a,warning:ne.a},Oe={success:B.a,info:f.a,error:G.a,warning:x.a},de=function(g){var E,M=g.description,K=g.prefixCls,Y=g.message,re=g.banner,ue=g.className,ye=ue===void 0?"":ue,ve=g.style,Ee=g.onMouseEnter,De=g.onMouseLeave,Le=g.onClick,Re=g.afterClose,Ce=g.showIcon,Ue=g.closable,be=g.closeText,he=g.action,O=c(g,["description","prefixCls","message","banner","className","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText","action"]),Se=y.useState(!1),Ne=Object(a.a)(Se,2),We=Ne[0],ke=Ne[1],ze=y.useRef(),we=y.useContext(ge.b),Ye=we.getPrefixCls,R=we.direction,z=Ye("alert",K),X=function(H){var pe;ke(!0),(pe=O.onClose)===null||pe===void 0||pe.call(O,H)},Ae=function(){var H=O.type;return H!==void 0?H:re?"warning":"info"},xe=be?!0:Ue,He=Ae(),$e=function(){var H=O.icon,pe=(M?Oe:b)[He]||null;return H?Object(S.c)(H,y.createElement("span",{className:"".concat(z,"-icon")},H),function(){return{className:T()("".concat(z,"-icon"),Object(m.a)({},H.props.className,H.props.className))}}):y.createElement(pe,{className:"".concat(z,"-icon")})},Fe=function(){return xe?y.createElement("button",{type:"button",onClick:X,className:"".concat(z,"-close-icon"),tabIndex:0},be?y.createElement("span",{className:"".concat(z,"-close-text")},be):y.createElement(I.a,null)):null},_e=re&&Ce===void 0?!0:Ce,Xe=T()(z,"".concat(z,"-").concat(He),(E={},Object(m.a)(E,"".concat(z,"-with-description"),!!M),Object(m.a)(E,"".concat(z,"-no-icon"),!_e),Object(m.a)(E,"".concat(z,"-banner"),!!re),Object(m.a)(E,"".concat(z,"-rtl"),R==="rtl"),E),ye),Ze=Qe(O);return y.createElement(F.b,{visible:!We,motionName:"".concat(z,"-motion"),motionAppear:!1,motionEnter:!1,onLeaveStart:function(H){return{maxHeight:H.offsetHeight}},onLeaveEnd:Re},function(fe){var H=fe.className,pe=fe.style;return y.createElement("div",Object(s.a)({ref:ze,"data-show":!We,className:T()(Xe,H),style:Object(s.a)(Object(s.a)({},ve),pe),onMouseEnter:Ee,onMouseLeave:De,onClick:Le,role:"alert"},Ze),_e?$e():null,y.createElement("div",{className:"".concat(z,"-content")},y.createElement("div",{className:"".concat(z,"-message")},Y),y.createElement("div",{className:"".concat(z,"-description")},M)),he?y.createElement("div",{className:"".concat(z,"-action")},he):null,Fe())})};de.ErrorBoundary=d;var me=P.a=de},"+QRC":function(A,P,e){"use strict";var s=e("E9nw"),m={"text/plain":"Text","text/html":"Url",default:"Text"},a="Copy to clipboard: #{key}, Enter";function y(B){var x=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return B.replace(/#{\s*key\s*}/g,x)}function I(B,x){var f,G,k,ne,q,D,F=!1;x||(x={}),f=x.debug||!1;try{k=s(),ne=document.createRange(),q=document.getSelection(),D=document.createElement("span"),D.textContent=B,D.style.all="unset",D.style.position="fixed",D.style.top=0,D.style.clip="rect(0, 0, 0, 0)",D.style.whiteSpace="pre",D.style.webkitUserSelect="text",D.style.MozUserSelect="text",D.style.msUserSelect="text",D.style.userSelect="text",D.addEventListener("copy",function(T){if(T.stopPropagation(),x.format)if(T.preventDefault(),typeof T.clipboardData=="undefined"){f&&console.warn("unable to use e.clipboardData"),f&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var ge=m[x.format]||m.default;window.clipboardData.setData(ge,B)}else T.clipboardData.clearData(),T.clipboardData.setData(x.format,B);x.onCopy&&(T.preventDefault(),x.onCopy(T.clipboardData))}),document.body.appendChild(D),ne.selectNodeContents(D),q.addRange(ne);var ee=document.execCommand("copy");if(!ee)throw new Error("copy command was unsuccessful");F=!0}catch(T){f&&console.error("unable to copy using execCommand: ",T),f&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(x.format||"text",B),x.onCopy&&x.onCopy(window.clipboardData),F=!0}catch(ge){f&&console.error("unable to copy using clipboardData: ",ge),f&&console.error("falling back to prompt"),G=y("message"in x?x.message:a),window.prompt(G,B)}}finally{q&&(typeof q.removeRange=="function"?q.removeRange(ne):q.removeAllRanges()),D&&document.body.removeChild(D),k()}return F}A.exports=I},"/qDX":function(A,P,e){},"14J3":function(A,P,e){"use strict";var s=e("cIOH"),m=e.n(s),a=e("1GLa")},BMrR:function(A,P,e){"use strict";var s=e("qrJ5");P.a=s.a},E9nw:function(A,P){A.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var s=document.activeElement,m=[],a=0;a<e.rangeCount;a++)m.push(e.getRangeAt(a));switch(s.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":s.blur();break;default:s=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||m.forEach(function(y){e.addRange(y)}),s&&s.focus()}}},G3dp:function(A,P,e){"use strict";var s=e("q1tI"),m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},a=m,y=e("6VBw"),I=function(f,G){return s.createElement(y.a,Object.assign({},f,{ref:G,icon:a}))};I.displayName="EditOutlined";var B=P.a=s.forwardRef(I)},IzEo:function(A,P,e){"use strict";var s=e("cIOH"),m=e.n(s),a=e("lnY3"),y=e.n(a),I=e("Znn+"),B=e("14J3"),x=e("jCWc")},RyC9:function(A,P,e){"use strict";e.r(P);var s=e("IzEo"),m=e("bx4M"),a=e("fOrg"),y=e("+KLJ"),I=e("tU7J"),B=e("wFql"),x=e("q1tI"),f=e.n(x),G=e("tMyG"),k=e("9kvl"),ne=e("Ur6u"),q=e.n(ne),D=function(ee){var T=ee.children;return f.a.createElement("pre",{className:q.a.pre},f.a.createElement("code",null,f.a.createElement(B.a.Text,{copyable:!0},T)))};P.default=function(){var F=Object(k.f)();return f.a.createElement(G.a,null,f.a.createElement(m.a,null,f.a.createElement(y.a,{message:F.formatMessage({id:"pages.welcome.alertMessage",defaultMessage:"\u66F4\u5FEB\u66F4\u5F3A\u7684\u91CD\u578B\u7EC4\u4EF6\uFF0C\u5DF2\u7ECF\u53D1\u5E03\u3002"}),type:"success",showIcon:!0,banner:!0,style:{margin:-12,marginBottom:24}}),f.a.createElement(B.a.Text,{strong:!0},f.a.createElement(k.a,{id:"pages.welcome.advancedComponent",defaultMessage:"\u9AD8\u7EA7\u8868\u683C"})," ",f.a.createElement("a",{href:"https://procomponents.ant.design/components/table",rel:"noopener noreferrer",target:"__blank"},f.a.createElement(k.a,{id:"pages.welcome.link",defaultMessage:"\u6B22\u8FCE\u4F7F\u7528"}))),f.a.createElement(D,null,"yarn add @ant-design/pro-table"),f.a.createElement(B.a.Text,{strong:!0,style:{marginBottom:12}},f.a.createElement(k.a,{id:"pages.welcome.advancedLayout",defaultMessage:"\u9AD8\u7EA7\u5E03\u5C40"})," ",f.a.createElement("a",{href:"https://procomponents.ant.design/components/layout",rel:"noopener noreferrer",target:"__blank"},f.a.createElement(k.a,{id:"pages.welcome.link",defaultMessage:"\u6B22\u8FCE\u4F7F\u7528"}))),f.a.createElement(D,null,"yarn add @ant-design/pro-layout")))}},Ur6u:function(A,P,e){A.exports={pre:"pre___3fTUI"}},YkAm:function(A,P,e){},bRQS:function(A,P,e){"use strict";var s=e("q1tI"),m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"}}]},name:"check",theme:"outlined"},a=m,y=e("6VBw"),I=function(f,G){return s.createElement(y.a,Object.assign({},f,{ref:G,icon:a}))};I.displayName="CheckOutlined";var B=P.a=s.forwardRef(I)},bx4M:function(A,P,e){"use strict";var s=e("rePB"),m=e("wx14"),a=e("q1tI"),y=e("TSYQ"),I=e.n(y),B=e("bT9E"),x=e("H84U"),f=function(C,d){var S={};for(var c in C)Object.prototype.hasOwnProperty.call(C,c)&&d.indexOf(c)<0&&(S[c]=C[c]);if(C!=null&&typeof Object.getOwnPropertySymbols=="function")for(var b=0,c=Object.getOwnPropertySymbols(C);b<c.length;b++)d.indexOf(c[b])<0&&Object.prototype.propertyIsEnumerable.call(C,c[b])&&(S[c[b]]=C[c[b]]);return S},G=function(d){var S=d.prefixCls,c=d.className,b=d.hoverable,Oe=b===void 0?!0:b,de=f(d,["prefixCls","className","hoverable"]);return a.createElement(x.a,null,function(me){var L=me.getPrefixCls,g=L("card",S),E=I()("".concat(g,"-grid"),c,Object(s.a)({},"".concat(g,"-grid-hoverable"),Oe));return a.createElement("div",Object(m.a)({},de,{className:E}))})},k=G,ne=function(C,d){var S={};for(var c in C)Object.prototype.hasOwnProperty.call(C,c)&&d.indexOf(c)<0&&(S[c]=C[c]);if(C!=null&&typeof Object.getOwnPropertySymbols=="function")for(var b=0,c=Object.getOwnPropertySymbols(C);b<c.length;b++)d.indexOf(c[b])<0&&Object.prototype.propertyIsEnumerable.call(C,c[b])&&(S[c[b]]=C[c[b]]);return S},q=function(d){return a.createElement(x.a,null,function(S){var c=S.getPrefixCls,b=d.prefixCls,Oe=d.className,de=d.avatar,me=d.title,L=d.description,g=ne(d,["prefixCls","className","avatar","title","description"]),E=c("card",b),M=I()("".concat(E,"-meta"),Oe),K=de?a.createElement("div",{className:"".concat(E,"-meta-avatar")},de):null,Y=me?a.createElement("div",{className:"".concat(E,"-meta-title")},me):null,re=L?a.createElement("div",{className:"".concat(E,"-meta-description")},L):null,ue=Y||re?a.createElement("div",{className:"".concat(E,"-meta-detail")},Y,re):null;return a.createElement("div",Object(m.a)({},g,{className:M}),K,ue)})},D=q,F=e("ZTPi"),ee=e("BMrR"),T=e("kPKH"),ge=e("3Nzz"),Qe=function(C,d){var S={};for(var c in C)Object.prototype.hasOwnProperty.call(C,c)&&d.indexOf(c)<0&&(S[c]=C[c]);if(C!=null&&typeof Object.getOwnPropertySymbols=="function")for(var b=0,c=Object.getOwnPropertySymbols(C);b<c.length;b++)d.indexOf(c[b])<0&&Object.prototype.propertyIsEnumerable.call(C,c[b])&&(S[c[b]]=C[c[b]]);return S};function Ve(C){var d=C.map(function(S,c){return a.createElement("li",{style:{width:"".concat(100/C.length,"%")},key:"action-".concat(c)},a.createElement("span",null,S))});return d}var Ie=function(d){var S,c,b=a.useContext(x.b),Oe=b.getPrefixCls,de=b.direction,me=a.useContext(ge.b),L=function(Ge){var Pe;(Pe=d.onTabChange)===null||Pe===void 0||Pe.call(d,Ge)},g=function(){var Ge;return a.Children.forEach(d.children,function(Pe){Pe&&Pe.type&&Pe.type===k&&(Ge=!0)}),Ge},E=d.prefixCls,M=d.className,K=d.extra,Y=d.headStyle,re=Y===void 0?{}:Y,ue=d.bodyStyle,ye=ue===void 0?{}:ue,ve=d.title,Ee=d.loading,De=d.bordered,Le=De===void 0?!0:De,Re=d.size,Ce=d.type,Ue=d.cover,be=d.actions,he=d.tabList,O=d.children,Se=d.activeTabKey,Ne=d.defaultActiveTabKey,We=d.tabBarExtraContent,ke=d.hoverable,ze=d.tabProps,we=ze===void 0?{}:ze,Ye=Qe(d,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),R=Oe("card",E),z=ye.padding===0||ye.padding==="0px"?{padding:24}:void 0,X=a.createElement("div",{className:"".concat(R,"-loading-block")}),Ae=a.createElement("div",{className:"".concat(R,"-loading-content"),style:z},a.createElement(ee.a,{gutter:8},a.createElement(T.a,{span:22},X)),a.createElement(ee.a,{gutter:8},a.createElement(T.a,{span:8},X),a.createElement(T.a,{span:15},X)),a.createElement(ee.a,{gutter:8},a.createElement(T.a,{span:6},X),a.createElement(T.a,{span:18},X)),a.createElement(ee.a,{gutter:8},a.createElement(T.a,{span:13},X),a.createElement(T.a,{span:9},X)),a.createElement(ee.a,{gutter:8},a.createElement(T.a,{span:4},X),a.createElement(T.a,{span:3},X),a.createElement(T.a,{span:16},X))),xe=Se!==void 0,He=Object(m.a)(Object(m.a)({},we),(S={},Object(s.a)(S,xe?"activeKey":"defaultActiveKey",xe?Se:Ne),Object(s.a)(S,"tabBarExtraContent",We),S)),$e,Fe=he&&he.length?a.createElement(F.a,Object(m.a)({size:"large"},He,{className:"".concat(R,"-head-tabs"),onChange:L}),he.map(function(Be){return a.createElement(F.a.TabPane,{tab:Be.tab,disabled:Be.disabled,key:Be.key})})):null;(ve||K||Fe)&&($e=a.createElement("div",{className:"".concat(R,"-head"),style:re},a.createElement("div",{className:"".concat(R,"-head-wrapper")},ve&&a.createElement("div",{className:"".concat(R,"-head-title")},ve),K&&a.createElement("div",{className:"".concat(R,"-extra")},K)),Fe));var _e=Ue?a.createElement("div",{className:"".concat(R,"-cover")},Ue):null,Xe=a.createElement("div",{className:"".concat(R,"-body"),style:ye},Ee?Ae:O),Ze=be&&be.length?a.createElement("ul",{className:"".concat(R,"-actions")},Ve(be)):null,fe=Object(B.a)(Ye,["onTabChange"]),H=Re||me,pe=I()(R,(c={},Object(s.a)(c,"".concat(R,"-loading"),Ee),Object(s.a)(c,"".concat(R,"-bordered"),Le),Object(s.a)(c,"".concat(R,"-hoverable"),ke),Object(s.a)(c,"".concat(R,"-contain-grid"),g()),Object(s.a)(c,"".concat(R,"-contain-tabs"),he&&he.length),Object(s.a)(c,"".concat(R,"-").concat(H),H),Object(s.a)(c,"".concat(R,"-type-").concat(Ce),!!Ce),Object(s.a)(c,"".concat(R,"-rtl"),de==="rtl"),c),M);return a.createElement("div",Object(m.a)({},fe,{className:pe}),$e,_e,Xe,Ze)};Ie.Grid=k,Ie.Meta=D;var Me=P.a=Ie},fOrg:function(A,P,e){"use strict";var s=e("cIOH"),m=e.n(s),a=e("YkAm"),y=e.n(a)},jCWc:function(A,P,e){"use strict";var s=e("cIOH"),m=e.n(s),a=e("1GLa")},kPKH:function(A,P,e){"use strict";var s=e("/kpp");P.a=s.a},lfch:function(A,P,e){"use strict";var s=e("q1tI"),m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"},a=m,y=e("6VBw"),I=function(f,G){return s.createElement(y.a,Object.assign({},f,{ref:G,icon:a}))};I.displayName="CopyOutlined";var B=P.a=s.forwardRef(I)},lnY3:function(A,P,e){},tU7J:function(A,P,e){"use strict";var s=e("cIOH"),m=e.n(s),a=e("/qDX"),y=e.n(a),I=e("5Dmo"),B=e("5NDa")},wFql:function(A,P,e){"use strict";var s=e("wx14"),m=e("rePB"),a=e("q1tI"),y=e("TSYQ"),I=e.n(y),B=e("c+Xe"),x=e("H84U"),f=e("uaoM"),G=function(l,r){var i={};for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&r.indexOf(t)<0&&(i[t]=l[t]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(l);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(l,t[n])&&(i[t[n]]=l[t[n]]);return i},k=function(r,i){var t=r.prefixCls,n=r.component,o=n===void 0?"article":n,u=r.className,p=r["aria-label"],v=r.setContentRef,h=r.children,U=G(r,["prefixCls","component","className","aria-label","setContentRef","children"]),j=i;return v&&(Object(f.a)(!1,"Typography","`setContentRef` is deprecated. Please use `ref` instead."),j=Object(B.a)(i,v)),a.createElement(x.a,null,function(J){var $=J.getPrefixCls,ie=J.direction,le=o,Q=$("typography",t),se=I()(Q,Object(m.a)({},"".concat(Q,"-rtl"),ie==="rtl"),u);return a.createElement(le,Object(s.a)({className:se,"aria-label":p,ref:j},U),h)})},ne=a.forwardRef(k);ne.displayName="Typography";var q=ne,D=q,F=e("U8pU"),ee=e("bT9E"),T=e("KQm4"),ge=e("1OyB"),Qe=e("vuIU"),Ve=e("Ji7U"),Ie=e("LK+K"),Me=e("Zm9Q"),C=e("+QRC"),d=e.n(C),S=e("G3dp"),c=e("bRQS"),b=e("lfch"),Oe=e("6ner"),de=e("wEI+"),me=e("YMnH"),L=e("gDlH"),g=e("oHiP"),E=e("R3zJ"),M=e("3S7+"),K=e("ODXe"),Y=e("4IlW"),re={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"},ue=re,ye=e("6VBw"),ve=function(r,i){return a.createElement(ye.a,Object.assign({},r,{ref:i,icon:ue}))};ve.displayName="EnterOutlined";var Ee=a.forwardRef(ve),De=e("whJP"),Le=function(r){var i=r.prefixCls,t=r["aria-label"],n=r.className,o=r.style,u=r.direction,p=r.maxLength,v=r.autoSize,h=v===void 0?!0:v,U=r.value,j=r.onSave,J=r.onCancel,$=r.onEnd,ie=a.useRef(),le=a.useRef(!1),Q=a.useRef(),se=a.useState(U),je=Object(K.a)(se,2),oe=je[0],Te=je[1];a.useEffect(function(){Te(U)},[U]),a.useEffect(function(){if(ie.current&&ie.current.resizableTextArea){var w=ie.current.resizableTextArea.textArea;w.focus();var W=w.value.length;w.setSelectionRange(W,W)}},[]);var Ke=function(W){var Z=W.target;Te(Z.value.replace(/[\n\r]/g,""))},N=function(){le.current=!0},_=function(){le.current=!1},V=function(W){var Z=W.keyCode;le.current||(Q.current=Z)},te=function(){j(oe.trim())},ce=function(W){var Z=W.keyCode,et=W.ctrlKey,tt=W.altKey,at=W.metaKey,nt=W.shiftKey;Q.current===Z&&!le.current&&!et&&!tt&&!at&&!nt&&(Z===Y.a.ENTER?(te(),$==null||$()):Z===Y.a.ESC&&J())},ae=function(){te()},Je=I()(i,"".concat(i,"-edit-content"),Object(m.a)({},"".concat(i,"-rtl"),u==="rtl"),n);return a.createElement("div",{className:Je,style:o},a.createElement(De.a,{ref:ie,maxLength:p,value:oe,onChange:Ke,onKeyDown:V,onKeyUp:ce,onCompositionStart:N,onCompositionEnd:_,onBlur:ae,"aria-label":t,autoSize:h}),a.createElement(Ee,{className:"".concat(i,"-edit-content-confirm")}))},Re=Le,Ce=e("i8i4"),Ue=1,be=3,he=8,O,Se={padding:0,margin:0,display:"inline",lineHeight:"inherit"};function Ne(l){if(!l)return 0;var r=l.match(/^\d*(\.\d*)?/);return r?Number(r[0]):0}function We(l){var r=Array.prototype.slice.apply(l);return r.map(function(i){return"".concat(i,": ").concat(l.getPropertyValue(i),";")}).join("")}function ke(l){var r=[];return l.forEach(function(i){var t=r[r.length-1];typeof i=="string"&&typeof t=="string"?r[r.length-1]+=i:r.push(i)}),r}var ze=function(l,r,i,t,n){O||(O=document.createElement("div"),O.setAttribute("aria-hidden","true"),document.body.appendChild(O));var o=r.rows,u=r.suffix,p=u===void 0?"":u,v=window.getComputedStyle(l),h=We(v),U=Ne(v.lineHeight),j=Math.round(U*(o+1)+Ne(v.paddingTop)+Ne(v.paddingBottom));O.setAttribute("style",h),O.style.position="fixed",O.style.left="0",O.style.height="auto",O.style.minHeight="auto",O.style.maxHeight="auto",O.style.top="-999999px",O.style.zIndex="-1000",O.style.textOverflow="clip",O.style.whiteSpace="normal",O.style.webkitLineClamp="none";var J=ke(Object(Me.a)(i));Object(Ce.render)(a.createElement("div",{style:Se},a.createElement("span",{style:Se},J,p),a.createElement("span",{style:Se},t)),O);function $(){return O.offsetHeight<j}if($())return Object(Ce.unmountComponentAtNode)(O),{content:i,text:O.innerHTML,ellipsis:!1};var ie=Array.prototype.slice.apply(O.childNodes[0].childNodes[0].cloneNode(!0).childNodes).filter(function(N){var _=N.nodeType;return _!==he}),le=Array.prototype.slice.apply(O.childNodes[0].childNodes[1].cloneNode(!0).childNodes);Object(Ce.unmountComponentAtNode)(O);var Q=[];O.innerHTML="";var se=document.createElement("span");O.appendChild(se);var je=document.createTextNode(n+p);se.appendChild(je),le.forEach(function(N){O.appendChild(N)});function oe(N){se.insertBefore(N,je)}function Te(N,_){var V=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,te=arguments.length>3&&arguments[3]!==void 0?arguments[3]:_.length,ce=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0,ae=Math.floor((V+te)/2),Je=_.slice(0,ae);if(N.textContent=Je,V>=te-1)for(var w=te;w>=V;w-=1){var W=_.slice(0,w);if(N.textContent=W,$()||!W)return w===_.length?{finished:!1,reactNode:_}:{finished:!0,reactNode:W}}return $()?Te(N,_,ae,te,ae):Te(N,_,V,ae,ce)}function Ke(N,_){var V=N.nodeType;if(V===Ue)return oe(N),$()?{finished:!1,reactNode:J[_]}:(se.removeChild(N),{finished:!0,reactNode:null});if(V===be){var te=N.textContent||"",ce=document.createTextNode(te);return oe(ce),Te(ce,te)}return{finished:!1,reactNode:null}}return ie.some(function(N,_){var V=Ke(N,_),te=V.finished,ce=V.reactNode;return ce&&Q.push(ce),te}),{content:Q,text:O.innerHTML,ellipsis:!0}},we=function(l,r){var i={};for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&r.indexOf(t)<0&&(i[t]=l[t]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(l);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(l,t[n])&&(i[t[n]]=l[t[n]]);return i},Ye=Object(E.c)("webkitLineClamp"),R=Object(E.c)("textOverflow");function z(l,r){var i=l.mark,t=l.code,n=l.underline,o=l.delete,u=l.strong,p=l.keyboard,v=r;function h(U,j){!U||(v=a.createElement(j,{},v))}return h(u,"strong"),h(n,"u"),h(o,"del"),h(t,"code"),h(i,"mark"),h(p,"kbd"),v}var X="...",Ae=function(l){Object(Ve.a)(i,l);var r=Object(Ie.a)(i);function i(){var t;return Object(ge.a)(this,i),t=r.apply(this,arguments),t.contentRef=a.createRef(),t.state={edit:!1,copied:!1,ellipsisText:"",ellipsisContent:null,isEllipsis:!1,expanded:!1,clientRendered:!1},t.getPrefixCls=function(){var n=t.props.prefixCls,o=t.context.getPrefixCls;return o("typography",n)},t.onExpandClick=function(n){var o,u=t.getEllipsis(),p=u.onExpand;t.setState({expanded:!0}),(o=p)===null||o===void 0||o(n)},t.onEditClick=function(n){n.preventDefault(),t.triggerEdit(!0)},t.onEditChange=function(n){var o=t.getEditable(),u=o.onChange;u==null||u(n),t.triggerEdit(!1)},t.onEditCancel=function(){var n,o;(o=(n=t.getEditable()).onCancel)===null||o===void 0||o.call(n),t.triggerEdit(!1)},t.onCopyClick=function(n){n.preventDefault();var o=t.props,u=o.children,p=o.copyable,v=Object(s.a)({},Object(F.a)(p)==="object"?p:null);v.text===void 0&&(v.text=String(u)),d()(v.text||""),t.setState({copied:!0},function(){v.onCopy&&v.onCopy(),t.copyId=window.setTimeout(function(){t.setState({copied:!1})},3e3)})},t.setEditRef=function(n){t.editIcon=n},t.triggerEdit=function(n){var o=t.getEditable(),u=o.onStart;n&&u&&u(),t.setState({edit:n},function(){!n&&t.editIcon&&t.editIcon.focus()})},t.resizeOnNextFrame=function(){g.a.cancel(t.rafId),t.rafId=Object(g.a)(function(){t.syncEllipsis()})},t}return Object(Qe.a)(i,[{key:"componentDidMount",value:function(){this.setState({clientRendered:!0}),this.resizeOnNextFrame()}},{key:"componentDidUpdate",value:function(n){var o=this.props.children,u=this.getEllipsis(),p=this.getEllipsis(n);(o!==n.children||u.rows!==p.rows)&&this.resizeOnNextFrame()}},{key:"componentWillUnmount",value:function(){window.clearTimeout(this.copyId),g.a.cancel(this.rafId)}},{key:"getEditable",value:function(n){var o=this.state.edit,u=n||this.props,p=u.editable;return p?Object(s.a)({editing:o},Object(F.a)(p)==="object"?p:null):{editing:o}}},{key:"getEllipsis",value:function(n){var o=n||this.props,u=o.ellipsis;return u?Object(s.a)({rows:1,expandable:!1},Object(F.a)(u)==="object"?u:null):{}}},{key:"canUseCSSEllipsis",value:function(){var n=this.state.clientRendered,o=this.props,u=o.editable,p=o.copyable,v=this.getEllipsis(),h=v.rows,U=v.expandable,j=v.suffix,J=v.onEllipsis,$=v.tooltip;return j||$||u||p||U||!n||J?!1:h===1?R:Ye}},{key:"syncEllipsis",value:function(){var n=this.state,o=n.ellipsisText,u=n.isEllipsis,p=n.expanded,v=this.getEllipsis(),h=v.rows,U=v.suffix,j=v.onEllipsis,J=this.props.children;if(!(!h||h<0||!this.contentRef.current||p)&&!this.canUseCSSEllipsis()){Object(f.a)(Object(Me.a)(J).every(function(se){return typeof se=="string"}),"Typography","`ellipsis` should use string as children only.");var $=ze(this.contentRef.current,{rows:h,suffix:U},J,this.renderOperations(!0),X),ie=$.content,le=$.text,Q=$.ellipsis;(o!==le||u!==Q)&&(this.setState({ellipsisText:le,ellipsisContent:ie,isEllipsis:Q}),u!==Q&&j&&j(Q))}}},{key:"renderExpand",value:function(n){var o=this.getEllipsis(),u=o.expandable,p=o.symbol,v=this.state,h=v.expanded,U=v.isEllipsis;if(!u||!n&&(h||!U))return null;var j;return p?j=p:j=this.expandStr,a.createElement("a",{key:"expand",className:"".concat(this.getPrefixCls(),"-expand"),onClick:this.onExpandClick,"aria-label":this.expandStr},j)}},{key:"renderEdit",value:function(){var n=this.props.editable;if(!!n){var o=n.icon,u=n.tooltip,p=Object(Me.a)(u)[0]||this.editStr,v=typeof p=="string"?p:"";return a.createElement(M.a,{key:"edit",title:u===!1?"":p},a.createElement(L.a,{ref:this.setEditRef,className:"".concat(this.getPrefixCls(),"-edit"),onClick:this.onEditClick,"aria-label":v},o||a.createElement(S.a,{role:"button"})))}}},{key:"renderCopy",value:function(){var n=this.state.copied,o=this.props.copyable;if(!!o){var u=this.getPrefixCls(),p=o.tooltips,v=Object(Me.a)(p);v.length===0&&(v=[this.copyStr,this.copiedStr]);var h=n?v[1]:v[0],U=typeof h=="string"?h:"",j=Object(Me.a)(o.icon);return a.createElement(M.a,{key:"copy",title:p===!1?"":h},a.createElement(L.a,{className:I()("".concat(u,"-copy"),n&&"".concat(u,"-copy-success")),onClick:this.onCopyClick,"aria-label":U},n?j[1]||a.createElement(c.a,null):j[0]||a.createElement(b.a,null)))}}},{key:"renderEditInput",value:function(){var n=this.props,o=n.children,u=n.className,p=n.style,v=this.context.direction,h=this.getEditable(),U=h.maxLength,j=h.autoSize,J=h.onEnd;return a.createElement(Re,{value:typeof o=="string"?o:"",onSave:this.onEditChange,onCancel:this.onEditCancel,onEnd:J,prefixCls:this.getPrefixCls(),className:u,style:p,direction:v,maxLength:U,autoSize:j})}},{key:"renderOperations",value:function(n){return[this.renderExpand(n),this.renderEdit(),this.renderCopy()].filter(function(o){return o})}},{key:"renderContent",value:function(){var n=this,o=this.state,u=o.ellipsisContent,p=o.isEllipsis,v=o.expanded,h=this.props,U=h.component,j=h.children,J=h.className,$=h.type,ie=h.disabled,le=h.style,Q=we(h,["component","children","className","type","disabled","style"]),se=this.context.direction,je=this.getEllipsis(),oe=je.rows,Te=je.suffix,Ke=je.tooltip,N=this.getPrefixCls(),_=Object(ee.a)(Q,["prefixCls","editable","copyable","ellipsis","mark","code","delete","underline","strong","keyboard"].concat(Object(T.a)(de.a))),V=this.canUseCSSEllipsis(),te=oe===1&&V,ce=oe&&oe>1&&V,ae=j;if(oe&&p&&!v&&!V){var Je=Q.title,w=Je||"";!Je&&(typeof j=="string"||typeof j=="number")&&(w=String(j)),w=w.slice(String(u||"").length),ae=a.createElement(a.Fragment,null,u,a.createElement("span",{title:w,"aria-hidden":"true"},X),Te),Ke&&(ae=a.createElement(M.a,{title:Ke===!0?j:Ke},a.createElement("span",null,ae)))}else ae=a.createElement(a.Fragment,null,j,Te);return ae=z(this.props,ae),a.createElement(me.a,{componentName:"Text"},function(W){var Z,et=W.edit,tt=W.copy,at=W.copied,nt=W.expand;return n.editStr=et,n.copyStr=tt,n.copiedStr=at,n.expandStr=nt,a.createElement(Oe.a,{onResize:n.resizeOnNextFrame,disabled:!oe},a.createElement(D,Object(s.a)({className:I()((Z={},Object(m.a)(Z,"".concat(N,"-").concat($),$),Object(m.a)(Z,"".concat(N,"-disabled"),ie),Object(m.a)(Z,"".concat(N,"-ellipsis"),oe),Object(m.a)(Z,"".concat(N,"-ellipsis-single-line"),te),Object(m.a)(Z,"".concat(N,"-ellipsis-multiple-line"),ce),Z),J),style:Object(s.a)(Object(s.a)({},le),{WebkitLineClamp:ce?oe:void 0}),component:U,ref:n.contentRef,direction:se},_),ae,n.renderOperations()))})}},{key:"render",value:function(){var n=this.getEditable(),o=n.editing;return o?this.renderEditInput():this.renderContent()}}],[{key:"getDerivedStateFromProps",value:function(n){var o=n.children,u=n.editable;return Object(f.a)(!u||typeof o=="string","Typography","When `editable` is enabled, the `children` should use string."),{}}}]),i}(a.Component);Ae.contextType=x.b,Ae.defaultProps={children:""};var xe=Ae,He=function(l,r){var i={};for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&r.indexOf(t)<0&&(i[t]=l[t]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(l);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(l,t[n])&&(i[t[n]]=l[t[n]]);return i},$e=function(r){var i=r.ellipsis,t=He(r,["ellipsis"]),n=a.useMemo(function(){return i&&Object(F.a)(i)==="object"?Object(ee.a)(i,["expandable","rows"]):i},[i]);return Object(f.a)(Object(F.a)(i)!=="object"||!i||!("expandable"in i)&&!("rows"in i),"Typography.Text","`ellipsis` do not support `expandable` or `rows` props."),a.createElement(xe,Object(s.a)({},t,{ellipsis:n,component:"span"}))},Fe=$e,_e=function(l,r){var i={};for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&r.indexOf(t)<0&&(i[t]=l[t]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(l);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(l,t[n])&&(i[t[n]]=l[t[n]]);return i},Xe=function(r,i){var t=r.ellipsis,n=r.rel,o=_e(r,["ellipsis","rel"]);Object(f.a)(Object(F.a)(t)!=="object","Typography.Link","`ellipsis` only supports boolean value.");var u=a.useRef(null);a.useImperativeHandle(i,function(){var v;return(v=u.current)===null||v===void 0?void 0:v.contentRef.current});var p=Object(s.a)(Object(s.a)({},o),{rel:n===void 0&&o.target==="_blank"?"noopener noreferrer":n});return delete p.navigate,a.createElement(xe,Object(s.a)({},p,{ref:u,ellipsis:!!t,component:"a"}))},Ze=a.forwardRef(Xe),fe=e("CWQg"),H=function(l,r){var i={};for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&r.indexOf(t)<0&&(i[t]=l[t]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(l);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(l,t[n])&&(i[t[n]]=l[t[n]]);return i},pe=Object(fe.b)(1,2,3,4,5),Be=function(r){var i=r.level,t=i===void 0?1:i,n=H(r,["level"]),o;return pe.indexOf(t)!==-1?o="h".concat(t):(Object(f.a)(!1,"Typography.Title","Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version."),o="h1"),a.createElement(xe,Object(s.a)({},n,{component:o}))},Ge=Be,Pe=function(r){return a.createElement(xe,Object(s.a)({},r,{component:"div"}))},rt=Pe,qe=D;qe.Text=Fe,qe.Link=Ze,qe.Title=Ge,qe.Paragraph=rt;var lt=P.a=qe}}]);