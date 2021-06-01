(window.webpackJsonp=window.webpackJsonp||[]).push([[12,27],{330:function(t,e,n){"use strict";n.r(e);var r={name:"FormColorPicker",props:{parent:{type:String,default:null},child:{type:String,required:!0},textChild:{type:String,required:!0},category:{type:String,required:!0},classes:{type:String,default:""},shouldHideDetails:{type:Boolean,default:!1},pseudo:{type:Boolean,default:!1}},data:function(){return{tempMenu:!1,fullPath:this.category+(this.parent?"."+this.parent:""),colorRules:[function(t){return!!t||"Color is required"},function(t){return 8!==t.length||"Color must be 7 or 9 characters"},function(t){return/^#[0-9a-fA-F]{6,8}$/.test(t)||"Color must be in a hex format"}]}},computed:{textModel:{get:function(){return this.$store.getters.get(this.category+(this.parent?"."+this.parent:""),this.textChild)},set:function(t){this.$store.commit("updateState",{parent:this.category+(this.parent?"."+this.parent:""),child:this.textChild,value:t})}},inputModel:{get:function(){return this.$store.getters.get(this.category+(this.parent?"."+this.parent:""),this.child)},set:function(t){this.$store.commit("updateState",{parent:this.category+(this.parent?"."+this.parent:""),child:this.child,value:t})}}}},o=n(81),l=n(106),c=n.n(l),h=n(307),d=n(397),f=n(336),m=n(434),v=n(164),y=n(435),S=n(375),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-text-field",{attrs:{value:t.$store.getters.get(t.fullPath,"input"),label:t.$store.getters.get(t.fullPath,"name"),rules:t.colorRules,outlined:"",required:"",readonly:"","hide-details":t.shouldHideDetails,classes:t.classes},scopedSlots:t._u([{key:"append",fn:function(){return[n("v-menu",{attrs:{"v-model":t.pseudo?t.tempMenu:t.textModel,top:"","nudge-bottom":"100","nudge-left":"16","close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"mt-0",attrs:{small:"",icon:""}},r),[n("v-icon",{attrs:{dark:""}},[t._v("\n            mdi-format-color-fill\n          ")])],1)]}}])},[t._v(" "),n("v-card",[n("v-card-text",{staticClass:"pa-0"},[n("v-color-picker",{attrs:{"dot-size":"20","hide-mode-switch":"",mode:"hexa",value:"#FFFFFF"},model:{value:t.inputModel,callback:function(e){t.inputModel=e},expression:"inputModel"}})],1)],1)],1)]},proxy:!0}]),model:{value:t.inputModel,callback:function(e){t.inputModel=e},expression:"inputModel"}})}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:h.a,VCard:d.a,VCardText:f.a,VColorPicker:m.a,VIcon:v.a,VMenu:y.a,VTextField:S.a})},332:function(t){t.exports=JSON.parse('{"dIco":["Default","Material","Plain","Plain Large"],"dBgType":["Circle","Square","Rounded Square","Type 4"],"nIco":["Pie","Nxt-Bit","Samsung","Custom"],"batteryIco":["default","circle"],"gradientType":{"LR":"Left to Right","TB":"Top to Bottom","TRBL":"Top-Right to Bottom-Left","TLBR":"Top-Left to Bottom-Right"},"randomType":[3,6],"gradientAccent":["Primary","Secondary"]}')},342:function(t,e,n){"use strict";n.r(e);var r={name:"FormSwitch",props:{parent:{type:String,default:null},child:{type:String,required:!0},category:{type:String,required:!0},classes:{type:String,default:""},customLabel:{type:String,default:null},shouldHideDetails:{type:Boolean,default:!1}},computed:{switchModel:{get:function(){return this.$store.getters.get(this.category+(this.parent?"."+this.parent:""),this.child)},set:function(t){this.$store.commit("updateState",{parent:this.category+(this.parent?"."+this.parent:""),child:this.child,value:t})}}}},o=n(81),l=n(106),c=n.n(l),h=n(389),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-switch",{class:t.classes,attrs:{inset:"","hide-details":t.shouldHideDetails,label:t.customLabel?t.customLabel:t.parent.charAt(0).toUpperCase()+t.parent.slice(1)},model:{value:t.switchModel,callback:function(e){t.switchModel=e},expression:"switchModel"}})}),[],!1,null,null,null);e.default=component.exports;c()(component,{VSwitch:h.a})},348:function(t,e,n){"use strict";n.r(e);var r={name:"FormTextField",props:{parent:{type:String,default:null},child:{type:String,required:!0},category:{type:String,required:!0},classes:{type:String,default:""}},data:function(){return{nameRules:[function(t){return!!t||"Name is required"}],fullPath:this.category+(this.parent?"."+this.parent:"")}},computed:{inputModel:{get:function(){return this.$store.getters.get(this.category+(this.parent?"."+this.parent:""),this.child)},set:function(t){this.$store.commit("updateState",{parent:this.category+(this.parent?"."+this.parent:""),child:this.child,value:t})}}}},o=n(81),l=n(106),c=n.n(l),h=n(375),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-text-field",{attrs:{rules:t.nameRules,label:t.$store.getters.get(t.fullPath,"name"),value:t.$store.getters.get(t.fullPath,"input"),classes:t.classes,outlined:"",required:""},model:{value:t.inputModel,callback:function(e){t.inputModel=e},expression:"inputModel"}})}),[],!1,null,null,null);e.default=component.exports;c()(component,{VTextField:h.a})},357:function(t,e,n){},365:function(t,e,n){"use strict";n.r(e);var r=n(332),o=n(132),l=n(342),c=n(330),h=n(348),d={name:"Step1p1",components:{FormSwitch:l.default,FormColorPicker:c.default,FormTextField:h.default},data:function(){return{formInfo:r,defaultState:o}}},f=n(81),m=n(106),v=n.n(m),y=n(318),S=n(319),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{staticClass:"px-3 pt-0"},t._l(t.defaultState.extra,(function(t,e){return n("v-col",{key:e,attrs:{cols:"6"}},[n("FormSwitch",{attrs:{category:"extra",parent:e,child:"enabled",classes:"mt-0 pt-0"}})],1)})),1),t._v(" "),n("v-row",t._l(t.defaultState.normal,(function(t,e){return n("v-col",{key:e,attrs:{cols:"12",md:"4"}},["color"===t.type?n("div",[n("FormColorPicker",{attrs:{category:"normal",parent:e,child:"input","text-child":"menu"}})],1):n("div",[n("FormTextField",{attrs:{category:"normal",parent:e,child:"input"}})],1)])})),1)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{FormSwitch:n(342).default,FormColorPicker:n(330).default,FormTextField:n(348).default}),v()(component,{VCol:y.a,VRow:S.a})},389:function(t,e,n){"use strict";n(6),n(7),n(10),n(14),n(9),n(15);var r=n(1),o=(n(239),n(335),n(357),n(337)),l=n(331),c=n(2);function h(t,e){var n=t.changedTouches[0];e.touchendX=n.clientX,e.touchendY=n.clientY,e.end&&e.end(Object.assign(t,e)),function(t){var e=t.touchstartX,n=t.touchendX,r=t.touchstartY,o=t.touchendY;t.offsetX=n-e,t.offsetY=o-r,Math.abs(t.offsetY)<.5*Math.abs(t.offsetX)&&(t.left&&n<e-16&&t.left(t),t.right&&n>e+16&&t.right(t)),Math.abs(t.offsetX)<.5*Math.abs(t.offsetY)&&(t.up&&o<r-16&&t.up(t),t.down&&o>r+16&&t.down(t))}(e)}function d(t){var e={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:function(t){return function(t,e){var n=t.changedTouches[0];e.touchstartX=n.clientX,e.touchstartY=n.clientY,e.start&&e.start(Object.assign(t,e))}(t,e)},touchend:function(t){return h(t,e)},touchmove:function(t){return function(t,e){var n=t.changedTouches[0];e.touchmoveX=n.clientX,e.touchmoveY=n.clientY,e.move&&e.move(Object.assign(t,e))}(t,e)}}}var f={inserted:function(t,e,n){var r=e.value,o=r.parent?t.parentElement:t,l=r.options||{passive:!0};if(o){var h=d(e.value);o._touchHandlers=Object(o._touchHandlers),o._touchHandlers[n.context._uid]=h,Object(c.r)(h).forEach((function(t){o.addEventListener(t,h[t],l)}))}},unbind:function(t,e,n){var r=e.value.parent?t.parentElement:t;if(r&&r._touchHandlers){var o=r._touchHandlers[n.context._uid];Object(c.r)(o).forEach((function(t){r.removeEventListener(t,o[t])})),delete r._touchHandlers[n.context._uid]}}},m=n(169),v=n(133);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function S(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=o.a.extend({name:"v-switch",directives:{Touch:f},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return S(S({},l.a.options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",S(S({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",S({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",S({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(m.c,{},[!1===this.loading?null:this.$slots.progress||this.$createElement(v.a,{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===c.q.left&&this.isActive||t.keyCode===c.q.right&&!this.isActive)&&this.onChange()}}})}}]);