"use strict";(self.webpackChunk_libsx_cola=self.webpackChunk_libsx_cola||[]).push([[433],{50626:function(j,h,a){a.r(h),a.d(h,{default:function(){return b}});var f=a(1502),o=a(25726),d=a(15033),v=a.n(d),k=a(96345),D=a.n(k),F=a(21320),g=a.n(F),y=function(){function r(){v()(this,r),g()(this,"debug",void 0),g()(this,"channel",void 0),this.debug=!1,this.channel=new Map}return D()(r,[{key:"getUnid",value:function(){return Math.random().toString(36).slice(2)}},{key:"setChannel",value:function(n,u){var t={};t[this.getUnid()]={tag:!0,cb:u},this.channel.has(n)?this.channel.set(n,Object.assign(this.channel.get(n),t)):this.channel.set(n,t)}},{key:"getChannel",value:function(n){return this.channel.get(n)}},{key:"getAllChannels",value:function(){return this.channel}},{key:"trigger",value:function(n,u){var t=this.getChannel(n);if(t)for(var e in t){var c=t[e].cb;typeof c=="function"&&c(u,e)}else this.log("channel ".concat(n," is not be listened!"))}},{key:"listen",value:function(n,u){this.setChannel(n,u),this.log("listen channel",this.channel)}},{key:"cancel",value:function(n){this.channel.forEach(function(u){delete u[n]}),this.log("channel id: ".concat(n," is canceled. channel"),this.channel)}},{key:"remove",value:function(n){this.channel.delete(n),this.log("channel name: ".concat(String(n)," is remove. channel:"),this.channel)}},{key:"setDebug",value:function(n){this.debug=n}},{key:"log",value:function(){if(this.debug===!0){for(var n=arguments.length,u=new Array(n),t=0;t<n;t++)u[t]=arguments[t];console.log("@broadcast::",u)}}}]),r}(),C=window;C.broadcast=new y;var s=C.broadcast,i=a(11527),B=function(){s.listen("BtnClick",function(e){console.log(e),alert("\u89E6\u53D1\u7B2C1\u4E2A\u76D1\u542C\u5668\uFF0C\u503C\uFF1A".concat(e))}),s.listen("BtnClick",function(e,c){console.log(e),alert("\u89E6\u53D1\u7B2C2\u4E2A\u76D1\u542C\u5668\uFF0C\u503C\uFF1A".concat(e,", \u672C\u6B21\u76D1\u542C\u540E\uFF0C\u5220\u9664\u672C\u76D1\u542C\u5668: ").concat(c)),s.cancel(c)});var l=function(c){s.trigger("BtnClick",c)},n=function(c){s.trigger("BtnClick2",c)},u=function(){console.log(s.getAllChannels())},t=function(){s.setDebug(!0)};return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(f.Z,{children:[(0,i.jsx)(o.ZP,{onClick:function(){return l("Trigger 1")},children:"Trigger 1"}),(0,i.jsx)(o.ZP,{onClick:function(){return l("Trigger 2")},type:"primary",children:"Trigger 2"}),(0,i.jsx)(o.ZP,{onClick:function(){return n("Trigger 3")},type:"primary",children:"\u65E0\u76D1\u542C"}),(0,i.jsx)(o.ZP,{onClick:u,children:"\u83B7\u53D6\u6240\u6709\u76D1\u542C\u9891\u9053"}),(0,i.jsx)(o.ZP,{onClick:t,children:"\u6253\u5F00\u8C03\u8BD5\u65E5\u5FD7\uFF0C\u8BF7\u67E5\u770Blog\u65E5\u5FD7"})]})})},b=B}}]);
