(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"336r":function(e,t,a){e.exports={login:"antd-pro-pages-user-login-components-login-index-login",getCaptcha:"antd-pro-pages-user-login-components-login-index-getCaptcha",icon:"antd-pro-pages-user-login-components-login-index-icon",other:"antd-pro-pages-user-login-components-login-index-other",register:"antd-pro-pages-user-login-components-login-index-register",prefixIcon:"antd-pro-pages-user-login-components-login-index-prefixIcon",submit:"antd-pro-pages-user-login-components-login-index-submit"}},"3T1H":function(e,t,a){"use strict";var n=a("fbTi"),l=a("mZ4U");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("6PlN");var r=l(a("DZXk")),u=l(a("mK77")),o=l(a("cO38"));a("ToHO");var c=l(a("9tOW")),i=a("lD+o"),s=n(a("ZZRV")),d=a("+UYe"),f=a("XLjY"),m=l(a("d40l")),p=l(a("U2lG")),g=p.default.Tab,v=p.default.UserName,b=p.default.Password,h=p.default.Mobile,E=p.default.Captcha,y=p.default.Submit,C=function(e){var t=e.content;return s.default.createElement(c.default,{style:{marginBottom:24},message:t,type:"error",showIcon:!0})},T=function(e){var t=e.userLogin,a=void 0===t?{}:t,n=e.submitting,l=a.status,c=a.type,f=(0,s.useState)(!0),T=(0,o.default)(f,2),x=T[0],w=T[1],N=(0,s.useState)("account"),O=(0,o.default)(N,2),P=O[0],U=O[1],Z=function(t){var a=e.dispatch;a({type:"login/login",payload:(0,u.default)({},t,{type:P})})};return s.default.createElement("div",{className:m.default.main},s.default.createElement(p.default,{activeKey:P,onTabChange:U,onSubmit:Z},s.default.createElement(g,{key:"account",tab:"\u8d26\u6237\u5bc6\u7801\u767b\u5f55"},"error"===l&&"account"===c&&!n&&s.default.createElement(C,{content:"\u8d26\u6237\u6216\u5bc6\u7801\u9519\u8bef\uff08admin/ant.design\uff09"}),s.default.createElement(v,{name:"userName",placeholder:"\u7528\u6237\u540d: admin or user",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d!"}]}),s.default.createElement(b,{name:"password",placeholder:"\u5bc6\u7801: ant.design",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"}]})),s.default.createElement(g,{key:"mobile",tab:"\u624b\u673a\u53f7\u767b\u5f55"},"error"===l&&"mobile"===c&&!n&&s.default.createElement(C,{content:"\u9a8c\u8bc1\u7801\u9519\u8bef"}),s.default.createElement(h,{name:"mobile",placeholder:"\u624b\u673a\u53f7",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7\uff01"},{pattern:/^1\d{10}$/,message:"\u624b\u673a\u53f7\u683c\u5f0f\u9519\u8bef\uff01"}]}),s.default.createElement(E,{name:"captcha",placeholder:"\u9a8c\u8bc1\u7801",countDown:120,getCaptchaButtonText:"",getCaptchaSecondText:"\u79d2",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\uff01"}]})),s.default.createElement("div",null,s.default.createElement(r.default,{checked:x,onChange:function(e){return w(e.target.checked)}},"\u81ea\u52a8\u767b\u5f55"),s.default.createElement("a",{style:{float:"right"}},"\u5fd8\u8bb0\u5bc6\u7801")),s.default.createElement(y,{loading:n},"\u767b\u5f55"),s.default.createElement("div",{className:m.default.other},"\u5176\u4ed6\u767b\u5f55\u65b9\u5f0f",s.default.createElement(i.AlipayCircleOutlined,{className:m.default.icon}),s.default.createElement(i.TaobaoCircleOutlined,{className:m.default.icon}),s.default.createElement(i.WeiboCircleOutlined,{className:m.default.icon}),s.default.createElement(d.Link,{className:m.default.register,to:"/user/register"},"\u6ce8\u518c\u8d26\u6237"))))},x=(0,f.connect)(function(e){var t=e.login,a=e.loading;return{userLogin:t,submitting:a.effects["login/login"]}})(T);t.default=x},D4xa:function(e,t,a){"use strict";var n=a("mZ4U");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=a("lD+o"),r=n(a("ZZRV")),u=n(a("336r")),o={UserName:{props:{size:"large",id:"userName",prefix:r.default.createElement(l.UserOutlined,{style:{color:"#1890ff"},className:u.default.prefixIcon}),placeholder:"admin"},rules:[{required:!0,message:"Please enter username!"}]},Password:{props:{size:"large",prefix:r.default.createElement(l.LockTwoTone,{className:u.default.prefixIcon}),type:"password",id:"password",placeholder:"888888"},rules:[{required:!0,message:"Please enter password!"}]},Mobile:{props:{size:"large",prefix:r.default.createElement(l.MobileTwoTone,{className:u.default.prefixIcon}),placeholder:"mobile number"},rules:[{required:!0,message:"Please enter mobile number!"},{pattern:/^1\d{10}$/,message:"Wrong mobile number format!"}]},Captcha:{props:{size:"large",prefix:r.default.createElement(l.MailTwoTone,{className:u.default.prefixIcon}),placeholder:"captcha"},rules:[{required:!0,message:"Please enter Captcha!"}]}};t.default=o},KTBR:function(e,t,a){"use strict";var n=a("mZ4U");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("jlqO");var l=n(a("Hbi4")),r=n(a("BG4o"));a("FJBW");var u=n(a("q/L9")),o=n(a("ZZRV")),c=n(a("iczh")),i=n(a("336r")),s=u.default.Item,d=function(e){var t=e.className,a=(0,r.default)(e,["className"]),n=(0,c.default)(i.default.submit,t);return o.default.createElement(s,null,o.default.createElement(l.default,Object.assign({size:"large",className:n,type:"primary",htmlType:"submit"},a)))},f=d;t.default=f},U2lG:function(e,t,a){"use strict";var n=a("fbTi"),l=a("mZ4U");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("LviI");var r=l(a("5Cft"));a("FJBW");var u=l(a("q/L9")),o=l(a("rXjv")),c=l(a("cO38")),i=n(a("ZZRV")),s=l(a("RYWf")),d=l(a("iczh")),f=l(a("booR")),m=l(a("ana9")),p=l(a("KTBR")),g=l(a("aGQT")),v=l(a("336r")),b=function(e){var t=e.className,a=(0,i.useState)([]),n=(0,c.default)(a,2),l=n[0],m=n[1],p=(0,i.useState)(),g=(0,c.default)(p,2),b=g[0],h=g[1],E=(0,s.default)("",{value:e.activeKey,onChange:e.onTabChange}),y=(0,c.default)(E,2),C=y[0],T=y[1],x=[],w=[];return i.default.Children.forEach(e.children,function(e){e&&("LoginTab"===e.type.typeName?x.push(e):w.push(e))}),i.default.createElement(f.default.Provider,{value:{tabUtil:{addTab:function(e){m([].concat((0,o.default)(l),[e]))},removeTab:function(e){m(l.filter(function(t){return t!==e}))}},updateActive:function(e){b[C]?b[C].push(e):b[C]=[e],h(b)}}},i.default.createElement("div",{className:(0,d.default)(t,v.default.login)},i.default.createElement(u.default,{form:e.from,onFinish:function(t){e.onSubmit&&e.onSubmit(t)}},l.length?i.default.createElement(i.default.Fragment,null,i.default.createElement(r.default,{animated:!1,className:v.default.tabs,activeKey:C,onChange:function(e){T(e)}},x),w):e.children)))};b.Tab=g.default,b.Submit=p.default,b.UserName=m.default.UserName,b.Password=m.default.Password,b.Mobile=m.default.Mobile,b.Captcha=m.default.Captcha;var h=b;t.default=h},aGQT:function(e,t,a){"use strict";var n=a("fbTi"),l=a("mZ4U");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("LviI");var r=l(a("5Cft")),u=n(a("ZZRV")),o=l(a("booR")),c=r.default.TabPane,i=function(){var e=0;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e+=1,"".concat(t).concat(e)}}(),s=function(e){(0,u.useEffect)(function(){var t=i("login-tab-"),a=e.tabUtil;a&&a.addTab(t)},[]);var t=e.children;return u.default.createElement(c,Object.assign({},e),t)},d=function(e){return u.default.createElement(o.default.Consumer,null,function(t){return u.default.createElement(s,Object.assign({tabUtil:t.tabUtil},e))})};d.typeName="LoginTab";var f=d;t.default=f},ana9:function(e,t,a){"use strict";var n=a("fbTi"),l=a("mZ4U");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("jlqO");var r=l(a("Hbi4"));a("QbtF");var u=l(a("5Ekc"));a("WIuS");var o=l(a("EdvG"));a("l4mJ");var c=l(a("ET+S")),i=l(a("Ico4"));a("cctN");var s=l(a("4Aw8")),d=l(a("UWy3")),f=l(a("BG4o")),m=l(a("cO38"));a("FJBW");var p=l(a("q/L9")),g=n(a("ZZRV")),v=l(a("B1rl")),b=l(a("D4xa")),h=l(a("booR")),E=l(a("336r")),y=a("63rs"),C=p.default.Item,T=function(e){var t=e.onChange,a=e.defaultValue,n=e.customProps,l=void 0===n?{}:n,r=e.rules,u={rules:r||l.rules};return t&&(u.onChange=t),a&&(u.initialValue=a),u},x=function(e){var t=(0,g.useState)(e.countDown||0),a=(0,m.default)(t,2),n=a[0],l=a[1],p=(0,g.useState)(!1),b=(0,m.default)(p,2),h=b[0],x=b[1],w=(e.onChange,e.customProps),N=(e.defaultValue,e.rules,e.name),O=(e.getCaptchaButtonText,e.getCaptchaSecondText,e.updateActive,e.type),P=(e.tabUtil,(0,f.default)(e,["onChange","customProps","defaultValue","rules","name","getCaptchaButtonText","getCaptchaSecondText","updateActive","type","tabUtil"])),U=(0,g.useCallback)(function(){var e=(0,d.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,y.getFakeCaptcha)(t);case 2:if(a=e.sent,!1!==a){e.next=5;break}return e.abrupt("return");case 5:s.default.success("\u83b7\u53d6\u9a8c\u8bc1\u7801\u6210\u529f\uff01\u9a8c\u8bc1\u7801\u4e3a\uff1a1234"),x(!0);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),[]);if((0,g.useEffect)(function(){var t=0,a=e.countDown;return h&&(t=window.setInterval(function(){l(function(e){return e<=1?(x(!1),clearInterval(t),a||60):e-1})},1e3)),function(){return clearInterval(t)}},[h]),!N)return null;var Z=T(e),j=P||{};if("Captcha"===O){var k=(0,v.default)(j,["onGetCaptcha","countDown"]);return g.default.createElement(C,{shouldUpdate:!0},function(e){var t=e.getFieldValue;return g.default.createElement(c.default,{gutter:8},g.default.createElement(o.default,{span:16},g.default.createElement(C,Object.assign({name:N},Z),g.default.createElement(u.default,Object.assign({},w,k)))),g.default.createElement(o.default,{span:8},g.default.createElement(r.default,{disabled:h,className:E.default.getCaptcha,size:"large",onClick:function(){var e=t("mobile");U(e)}},h?"".concat(n," \u79d2"):"\u83b7\u53d6\u9a8c\u8bc1\u7801")))})}return g.default.createElement(C,Object.assign({name:N},Z),g.default.createElement(u.default,Object.assign({},w,j)))},w={};Object.keys(b.default).forEach(function(e){var t=b.default[e];w[e]=function(a){return g.default.createElement(h.default.Consumer,null,function(n){return g.default.createElement(x,Object.assign({customProps:t.props,rules:t.rules},a,{type:e},n,{updateActive:n.updateActive}))})}});var N=w;t.default=N},booR:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("ZZRV"),l=(0,n.createContext)({}),r=l;t.default=r},d40l:function(e,t,a){e.exports={main:"antd-pro-pages-user-login-style-main",icon:"antd-pro-pages-user-login-style-icon",other:"antd-pro-pages-user-login-style-other",register:"antd-pro-pages-user-login-style-register"}}}]);