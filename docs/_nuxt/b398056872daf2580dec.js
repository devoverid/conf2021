(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{300:function(t,e,l){"use strict";l.r(e);l(47);var c=l(97),n=l(299);var o=Object(c.a)({setup:function(){var t,e,l,o,r,v,d,m=Object(c.f)("default"),f=(e=Object(c.e)({perspective:1e3,rotateX:0,rotateY:0,scaleX:1,scaleY:1}),l=function(){t=document.getElementById("ticket"),window.addEventListener("mousemove",r),window.addEventListener("resize",v)},o=function(){window.removeEventListener("mousemove",r),window.removeEventListener("resize",v)},r=function(l){if(t){var c=t.getBoundingClientRect(),n=c.x,o=c.y,r={x:n+c.width/2,y:o+c.height/2};e.rotateX=.008*(l.clientY-r.y),e.rotateY=-.008*(l.clientX-r.x),d()}},v=function(){document.getElementById("ticket")&&(window.innerHeight,window.innerHeight,d())},d=function(){t&&(t.style.transform="perspective(".concat(e.perspective,"px) rotateX(").concat(e.rotateX,"deg) rotateY(").concat(e.rotateY,"deg) "))},{initTicket:l,destroyTicket:o,saveTicket:function(){t&&Object(n.a)(t).then((function(t){var link=document.createElement("a");link.download="ticket.jpeg",link.href=t,link.click()}))}}),k=f.initTicket,y=f.destroyTicket,_=f.saveTicket;return Object(c.d)((function(){k()})),Object(c.c)((function(){y()})),{ticketStyle:m,saveTicket:_}}}),r=l(63),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"screen"},[t._m(0),t._v(" "),l("div",{staticClass:"content"},[l("div",{staticClass:"title"},[t._v("Get your ticket!")]),t._v(" "),l("div",{staticClass:"ticket-container"},[l("div",{staticClass:"ticket",class:""+t.ticketStyle,attrs:{id:"ticket"}},[t._m(1),t._v(" "),t._m(2)])]),t._v(" "),l("div",{staticClass:"select-style"},[l("div",{staticClass:"mb-2 text-gray-100 font-semibold"},[t._v("Style :")]),t._v(" "),l("label",{staticClass:"style style-default",attrs:{title:"Default"}},[l("input",{directives:[{name:"model",rawName:"v-model",value:t.ticketStyle,expression:"ticketStyle"}],attrs:{type:"radio",name:"style",value:"default"},domProps:{checked:t._q(t.ticketStyle,"default")},on:{change:function(e){t.ticketStyle="default"}}}),t._v(" "),l("div")]),t._v(" "),l("label",{staticClass:"style style-colorfull",attrs:{title:"Colorfull"}},[l("input",{directives:[{name:"model",rawName:"v-model",value:t.ticketStyle,expression:"ticketStyle"}],attrs:{type:"radio",name:"style",value:"colorfull"},domProps:{checked:t._q(t.ticketStyle,"colorfull")},on:{change:function(e){t.ticketStyle="colorfull"}}}),t._v(" "),l("div")]),t._v(" "),l("label",{staticClass:"style style-colorfull-black",attrs:{title:"Colorfull Black"}},[l("input",{directives:[{name:"model",rawName:"v-model",value:t.ticketStyle,expression:"ticketStyle"}],attrs:{type:"radio",name:"style",value:"colorfull-black"},domProps:{checked:t._q(t.ticketStyle,"colorfull-black")},on:{change:function(e){t.ticketStyle="colorfull-black"}}}),t._v(" "),l("div")])]),t._v(" "),l("div",{staticClass:"actions text-center mt-4"},[l("button",{staticClass:"bg-gray-800 hover:bg-gray-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded",on:{click:t.saveTicket}},[t._v("\n        Save to computer\n      ")])])])])}),[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"header"},[l("img",{staticClass:"logo",attrs:{src:"images/Devover Conf 2021 Logo.png",alt:"Logo"}}),t._v(" "),l("div",{staticClass:"tagline"},[t._v("\n      Wujudkan Pemuda Generasi Z yang bersatu di bidang teknologi skala\n      global.\n    ")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"ticket-content"},[l("div",{staticClass:"ticket-profile"},[l("img",{staticClass:"avatar",attrs:{src:"https://github.com/viandwi24.png",alt:"Avatar"}}),t._v(" "),l("div",{staticClass:"profile-detail"},[l("div",{staticClass:"name"},[t._v("YOUR NAME HERE")]),t._v(" "),l("div",{staticClass:"username"},[l("span",[t._v("GITHUB_USERNAME")])])])]),t._v(" "),l("div",{staticClass:"ticket-footer"},[l("img",{attrs:{src:"images/Ticket Footer.png"}})])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"ticket-number"},[l("div",{staticClass:"number"},[t._v("# 0XXXXX1")])])}],!1,null,null,null);e.default=component.exports}}]);