(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{135:function(e){e.exports=JSON.parse('{"splash":{"blob":null,"info":null,"custom":false},"extra":{"gradient":{"enabled":false,"type":"LR","accent":"Primary"},"random":{"enabled":false,"type":3}},"gradient":{"accColor2":{"type":"color","name":"Secondary Accent Color","input":"#FFFFFF","menu":false}},"random":{"dIcoColor2":{"type":"color","name":"#2 Dashboard Icon Color","input":"#FFFFFF","menu":false},"dIcoColor3":{"type":"color","name":"#3 Dashboard Icon Color","input":"#FFFFFF","menu":false},"dIcoColor4":{"type":"color","name":"#4 Dashboard Icon Color","input":"#FFFFFF","menu":false},"dIcoColor5":{"type":"color","name":"#5 Dashboard Icon Color","input":"#FFFFFF","menu":false},"dIcoColor6":{"type":"color","name":"#6 Dashboard Icon Color","input":"#FFFFFF","menu":false}},"icons":{"dIco":1,"dBgType":1,"nIco":1,"batteryIco":1},"dnIcoColors":{"dIcoColor":{"type":"color","name":"Dashboard Icon Color","input":"#FF8100","menu":false,"notAProp":true},"nIcoColor":{"type":"color","name":"Navbar Icon Color","input":"#FF00AC","menu":false,"notAProp":true}},"normal":{"themeName":{"type":"text","name":"Theme Name","input":"My Theme"},"bgColor":{"type":"color","name":"Background Color","input":"#22004B","menu":false},"accColor":{"type":"color","name":"Accent Color","input":"#00FF70","menu":false},"textColor":{"type":"color","name":"Text Color","input":"#FFFFFF","menu":false},"sTextColor":{"type":"color","name":"Secondary Text Color","input":"#FFEC00","menu":false}},"dashboardText":{"type":"color","name":"Dashboard Text Color","input":"#FFFA00","menu":false},"dashboardIcoBg":{"type":"color","name":"Dashboard Icon Background Color","input":"#FFFFFF","menu":false},"settings":{"batteryBarEnabled":false,"statusBarEnabled":false,"batteryIconEnabled":false,"batteryPercentageEnabled":false,"clockEnabled":false,"centeredClockEnabled":false,"cpuTempEnabled":false,"roundedCornerEnabled":false,"navbarBackgroundEnabled":false,"dashboardSubTintEnabled":false,"dashboardTextColorEnabled":false}}')},214:function(e,t,n){},235:function(e,t,n){},244:function(e,t,n){"use strict";var o={data:function(){return{title:"SHRP Theme Builder",people:[{name:"GeopJr",link:"https://geopjr.dev/"},{name:"epicX",link:"https://epicx67.github.io/"}],buttons:[{title:"SHRP",url:"https://github.com/SHRP"},{title:"Guide",url:"https://shrp.github.io/"}]}}},r=(n(299),n(82)),l=n(108),c=n.n(l),d=n(331),f=n(334),F=n(316),m=n(337),v=n(336),y=n(332),h=n(168),C=n(333),_=n(330),x=n(242),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:""}},[n("v-app-bar",{staticClass:"rounded-b-xl",attrs:{fixed:"",app:""}},[n("v-toolbar-title",{domProps:{textContent:e._s(e.title)}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn-toggle",{attrs:{rounded:""}},e._l(e.buttons,(function(button){return n("v-btn",{key:button.url,attrs:{href:button.url}},[e._v("\n        "+e._s(button.title)+"\n      ")])})),1)],1),e._v(" "),n("v-main",[n("v-container",[n("nuxt")],1)],1),e._v(" "),n("v-footer",{staticClass:"rounded-t-xl",attrs:{absolute:"",app:""}},[n("span",[e._v("© "+e._s((new Date).getFullYear())+" "),e._l(e.people,(function(t,o){return n("span",{key:t.name},[n("a",{staticStyle:{"text-decoration":"none"},attrs:{href:t.link,color:"#21CEF5"}},[e._v(e._s(t.name))]),o+1<e.people.length?n("span",[e._v(e._s(o===e.people.length-2?" & ":", "))]):e._e()])})),e._v(" with "),n("v-icon",{attrs:{color:"#21CEF5",medium:""}},[e._v("mdi-heart")])],2)])],1)}),[],!1,null,null,null);t.a=component.exports;c()(component,{VApp:d.a,VAppBar:f.a,VBtn:F.a,VBtnToggle:m.a,VContainer:v.a,VFooter:y.a,VIcon:h.a,VMain:C.a,VSpacer:_.a,VToolbarTitle:x.a})},252:function(e,t,n){n(253),e.exports=n(254)},279:function(e,t,n){"use strict";n(214)},299:function(e,t,n){"use strict";n(235)},314:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return d})),n.d(t,"getters",(function(){return f})),n.d(t,"mutations",(function(){return F}));n(8),n(7),n(11),n(16),n(10),n(17);var o=n(1),r=(n(24),n(56),n(135));function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d=function(){return c({},r)},f={get:function(e){return function(t,n){return t.split(".").reduce((function(p,e){return p&&p[e]||null}),e)[n]}}},F={updateState:function(e,content){content.parent.split(".").reduce((function(p,e){return p&&p[e]||null}),e)[content.child]=content.value},clear:function(e){c({},r)}}},73:function(e,t,n){"use strict";var o={layout:"empty",props:{error:{type:Object,default:null}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},r=(n(279),n(82)),l=n(108),c=n.n(l),d=n(335),f=n(327),F=n(336),m=n(328),v=n(329),y=n(330),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",[n("v-spacer"),e._v(" "),n("v-col",{attrs:{cols:"12",md:"6",sm:"8",justify:"center",align:"center"}},[n("v-banner",{staticClass:"text-center",attrs:{"single-line":"",elevation:"2"}},[e._v("\n        "+e._s(404===e.error.statusCode?"Page Not Found":"An error occurred")+"\n      ")]),e._v(" "),n("div",{staticClass:"my-4"},[n("NuxtLink",{attrs:{to:"/"}},[e._v("\n          Home Page\n        ")])],1),e._v(" "),n("v-skeleton-loader",{attrs:{type:"card-avatar, article, actions",elevation:"4","aria-busy":"false"}})],1),e._v(" "),n("v-spacer")],1)],1)}),[],!1,null,"48a043ff",null);t.a=component.exports;c()(component,{VBanner:d.a,VCol:f.a,VContainer:F.a,VRow:m.a,VSkeletonLoader:v.a,VSpacer:y.a})}},[[252,31,5,32]]]);