(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[991],{79845:function(B,u,t){"use strict";t.r(u);var L=t(58024),D=t(39144),U=t(9715),M=t(93766),W=t(47673),h=t(4107),S=t(57663),E=t(71577),j=t(63185),C=t(9676),l=t(2824),a=t(67294),y=t(51615),T=t(21010),A=t(67388),f=t(17883),e=t(85893);u.default=(0,f.bE)(function(){var K=(0,a.useState)(),i=(0,l.Z)(K,2),_=i[0],r=i[1],m=(0,a.useState)([]),c=(0,l.Z)(m,2),o=c[0],x=c[1],I=(0,y.TH)(),d=(0,a.useRef)(window.tabsAction.getTabKey(I)),R=(0,a.useState)(d.current===window.tabsAction.getTabKey()),v=(0,l.Z)(R,2),O=v[0],g=v[1];(0,a.useEffect)(function(){var n=window.tabsAction.listenActiveChange(function(s){g(d.current===s)});return function(){return n()}},[]);var P=function(){T.m8.push({pathname:"/switch-tabs-demos/result",state:o.includes("withState")?{state:"yes",text:_}:null,query:o.includes("withQuery")?{query:"yes",text:_||null}:{text:_||null}})};return(0,e.jsx)(A.Oc,{title:"Query [".concat(O?"active":"inactive","]"),content:"Input and press enter to new page",children:(0,e.jsxs)(D.Z,{title:"Query [".concat(O?"active":"inactive","]"),children:[(0,e.jsx)(M.Z.Item,{labelCol:{xs:24},labelAlign:"left",label:"text",extra:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(C.Z.Group,{style:{marginTop:12},value:o,options:[{label:'with state (`{ state: "yes"}`)',value:"withState"},{label:'with query (`{ query: "yes"}`)',value:"withQuery"}],onChange:function(s){x(s)}}),(0,e.jsx)(E.Z,{onClick:function(){r("nice")},children:"setText: nice"})]}),children:(0,e.jsx)(h.Z,{value:_,onChange:function(s){return r(s.target.value)},onPressEnter:function(){P()}})}),(0,e.jsx)(E.Z,{type:"primary",onClick:function(){return P()},children:"\u67E5\u8BE2"})]})})})}}]);
