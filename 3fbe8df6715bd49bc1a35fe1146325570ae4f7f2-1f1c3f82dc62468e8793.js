/*! For license information please see 3fbe8df6715bd49bc1a35fe1146325570ae4f7f2-1f1c3f82dc62468e8793.js.LICENSE.txt */
(self.webpackChunkreact_components_docs=self.webpackChunkreact_components_docs||[]).push([[1558],{75418:function(e,t,n){"use strict";var r=n(61214);t.k=r.randomId},61214:function(e,t,n){"use strict";n(40205),Object.defineProperty(t,"__esModule",{value:!0}),t.randomId=function(e){return e+String(1e3*Math.random()+(new Date).getTime())}},508:function(e,t,n){var r;n(40205),function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)){if(r.length){var l=o.apply(null,r);l&&e.push(l)}}else if("object"===a)if(r.toString===Object.prototype.toString)for(var i in r)n.call(r,i)&&r[i]&&e.push(i);else e.push(r.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},24120:function(e,t,n){"use strict";n.d(t,{$:function(){return o}});var r=n(27378),o=r.memo((function(){return r.createElement("footer",{className:"container"},r.createElement("nav",{className:"navbar"},r.createElement("div",{className:"navbar-brand"},"Developed with ❤️ by ",r.createElement("a",{href:"https://seb.se",target:"_blank",rel:"noreferrer noopener nofollow"})),r.createElement("div",{className:"navbar-text"},r.createElement("a",{href:"https://www.npmjs.com/package/@sebgroup/ng-components/",target:"_blank",rel:"noreferrer noopener nofollow",title:"View in npm"},r.createElement("img",{src:"https://img.shields.io/npm/v/@sebgroup/react-components",alt:"npm version"})))))}))},13069:function(e,t,n){"use strict";var r=n(27378),o=n(508),a=n.n(o),l=n(91523),i=n(99876),s=n(19022).j;t.Z=function(e){var t=r.useState(""),n=t[0],o=t[1],c=r.useState([]),u=c[0],d=c[1];return r.useEffect((function(){var e=window.location.href,t=new RegExp("v(\\d+\\.)(\\d+\\.)(\\d)(-(beta|alpha)(\\.\\d))?","g"),n=e.match(t);o((null==n?void 0:n.length)>0?n[0]:s[0].name),d((null==s?void 0:s.length)>0?s.map((function(e){return{value:e.name,label:e.name.replace(/[^.]+$/,"x")}})):[])}),[]),r.createElement(l.L,{wrapperProps:{className:a()("version-dropdown",e.className)},value:n,selectedLabel:function(e){var t;return null===(t=u.find((function(t){return t.value===e})))||void 0===t?void 0:t.label},onChange:function(e){return window.location.href=i.vc.u+"/"+e.target.value}},u.map((function(e,t){return r.createElement("option",{key:t,value:e.value},e.label)})))}},69615:function(e,t,n){"use strict";n.d(t,{b:function(){return i},j:function(){return o}});var r=n(4147),o={releases:"https://github.com/sebgroup/react-components/releases",github:"https://github.com/sebgroup/react-components/",contribute:"https://github.com/sebgroup/react-components/blob/alpha/CONTRIBUTING.md",issues:"https://github.com/sebgroup/react-components/issues",v4:"/v4/index.html"},a=r.homepage+"/site-preview.png",l="SEB React Components",i={keywords:"SEB, React, react components, typescript, mobile, web, ui, ux, open source, components",siteUrl:r.homepage,description:r.description,title:l,sitePreviewImageUrl:a,jsonLD:{"@context":"http://schema.org","@type":"WebApplication",name:l,description:r.description,url:r.homepage,image:a,screenshot:a,applicationCategory:"Software Documentation",operatingSystem:"Android, Chrome OS, iOS, iPadOS, macOS, OS X, Linux, Windows",author:{"@type":"Organization",name:"SEB",description:"SEB is a Swedish financial group for corporate customers, institutions and private individuals with headquarters in Stockholm",url:"https://seb.se",logo:"https://seb.se/Static/Images/SebLogo.svg"}}}},35674:function(e,t,n){"use strict";n.d(t,{d:function(){return o}});var r=n(27378);function o(){if("undefined"!=typeof window){var e="(max-width: 767px)",t=window.matchMedia(e),n=(0,r.useState)(window.matchMedia(e).matches),o=n[0],a=n[1];return(0,r.useEffect)((function(){var e=function(){return a(null==t?void 0:t.matches)};return null==t||t.addEventListener("change",e),function(){return null==t?void 0:t.removeEventListener("change",e)}}),[]),o}}},65891:function(e,t,n){"use strict";n.d(t,{P:function(){return l}});var r=n(27378),o=n(508),a=n.n(o),l=r.memo(r.forwardRef((function(e,t){return r.createElement("button",Object.assign({ref:t},e,{className:a()("rc close-btn",e.className)}))})))},91523:function(e,t,n){"use strict";n.d(t,{L:function(){return V},m:function(){return I}});var r=n(4769),o=n(30808),a=n(75418);var l=!1;if("undefined"!=typeof window){var i={get passive(){l=!0}};window.addEventListener("testPassive",null,i),window.removeEventListener("testPassive",null,i)}var s,c="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),u=[],d=!1,p=-1,f=void 0,m=void 0,v=void 0,b=function(e){return u.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},h=function(e){var t=e||window.event;return!!b(t.target)||(t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1))},g=function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==f&&(document.body.style.overflow=f,f=void 0)},y=function(){if(void 0!==m){var e=-parseInt(document.body.style.top,10),t=-parseInt(document.body.style.left,10);document.body.style.position=m.position,document.body.style.top=m.top,document.body.style.left=m.left,window.scrollTo(t,e),m=void 0}},w=function(e,t){if(e){if(!u.some((function(t){return t.targetElement===e}))){var n={targetElement:e,options:t||{}};u=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(u),[n]),c?window.requestAnimationFrame((function(){if(void 0===m){m={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,t=e.scrollY,n=e.scrollX,r=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-t,document.body.style.left=-n,setTimeout((function(){return window.requestAnimationFrame((function(){var e=r-window.innerHeight;e&&t>=r&&(document.body.style.top=-(t+e))}))}),300)}})):function(e){if(void 0===v){var t=!!e&&!0===e.reserveScrollBarGap,n=window.innerWidth-document.documentElement.clientWidth;if(t&&n>0){var r=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);v=document.body.style.paddingRight,document.body.style.paddingRight=r+n+"px"}}void 0===f&&(f=document.body.style.overflow,document.body.style.overflow="hidden")}(t),c&&(e.ontouchstart=function(e){1===e.targetTouches.length&&(p=e.targetTouches[0].clientY)},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){var n=e.targetTouches[0].clientY-p;!b(e.target)&&(t&&0===t.scrollTop&&n>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(t)&&n<0?h(e):e.stopPropagation())}(t,e)},d||(document.addEventListener("touchmove",h,l?{passive:!1}:void 0),d=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},E=n(508),S=n.n(E),k=n(27378),x=n(31542),N=n(65891),A=n(64230),C=n(40716),O=["focused","multiple","children"],P=function(e){var t=e.focused,n=e.multiple,r=e.children,l=(0,o.Z)(e,O),i=k.useState((0,a.k)("ddi-"))[0];return k.createElement("li",{className:S()("custom-control",{"custom-checkbox":n,focused:t,selected:l.checked}),role:"option","aria-selected":l.checked||null},k.createElement("input",Object.assign({},l,{type:n?"checkbox":"radio",id:i,className:S()({"custom-control-input":n})||null,hidden:!n})),k.createElement("label",{className:S()({"custom-control-label":n,"custom-radio":!n}),htmlFor:i},r))},L=["wrapperProps","text","onMultipleChange","clearable","indicator","isAllSelectable","searchable","selectedLabel","itemWrapperProps"],T="Select all",j="List is empty",R="No result",D="Search...";function I(e){return Array.from(e).filter((function(e){return e.selected})).map((function(e){return e.value}))}var _={reserveScrollBarGap:!0},M="undefined"!=typeof document?document:null,B="undefined"!=typeof window?window:null,H=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(null==B||null===(s=B.navigator)||void 0===s?void 0:s.userAgent),V=k.forwardRef((function(e,t){var n,i,s,f,m=e.wrapperProps,v=void 0===m?{}:m,b=e.text,E=void 0===b?{}:b,O=e.onMultipleChange,B=e.clearable,V=e.indicator,q=e.isAllSelectable,U=void 0===q||q,W=e.searchable,F=e.selectedLabel,z=e.itemWrapperProps,Z=(0,o.Z)(e,L),Y=Z.multiple,G=Z.onChange,J=k.useState((0,a.k)("dd-"))[0],K=k.useState((0,a.k)("ddt-"))[0],X=k.useState((0,a.k)("sa-"))[0],$=k.useState(!1),Q=$[0],ee=$[1],te=k.useState(!1),ne=te[0],re=te[1],oe=k.useState(""),ae=oe[0],le=oe[1],ie=k.useState({}),se=ie[0],ce=ie[1],ue=k.useState(),de=ue[0],pe=ue[1],fe=k.useState(null),me=fe[0],ve=fe[1],be=k.useState([]),he=be[0],ge=be[1],ye=k.useState(W?-1:Y&&U?1:0),we=ye[0],Ee=ye[1],Se=k.useRef(),ke=k.useRef(),xe=k.useRef(),Ne=k.useRef(),Ae=k.useState(!0),Ce=Ae[0],Oe=Ae[1],Pe=k.useCallback((function(){ee(!0),w(xe.current,_)}),[xe]),Le=k.useCallback((function(){var e;ee(!1),(e=xe.current)?(u=u.filter((function(t){return t.targetElement!==e})),c&&(e.ontouchstart=null,e.ontouchmove=null,d&&0===u.length&&(document.removeEventListener("touchmove",h,l?{passive:!1}:void 0),d=!1)),c?y():g()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")}),[xe]),Te=k.useCallback((function(e){if(Y){var t=he.find((function(t){return t.value===e}));t.selected=!t.selected}else me.value=e,Le();me.dispatchEvent(new Event("change",{bubbles:!0})),Y&&O&&O(I(he))}),[Y,me,he,O,Le]),je=k.useCallback((function(){var e;return Array.from((null===(e=xe.current)||void 0===e?void 0:e.querySelectorAll(".custom-control"))||[])}),[]),Re=k.useCallback((function(e){return Te(e.target.value)}),[Te]),De=k.useCallback((function(e){he.forEach((function(t){t.disabled?t.selected=!1:t.selected="boolean"==typeof e?e:!ne})),"boolean"==typeof e&&(me.value=""),me.dispatchEvent(new Event("change",{bubbles:!0})),Y&&O&&O(I(he))}),[ne,Y,he,me,O]),Ie=k.useCallback((function(){return he.every((function(e){return!!e.disabled||e.selected}))}),[he]),_e=k.useCallback((function(e){if(Q)Le();else{var t=e.currentTarget.getBoundingClientRect(),n=t.top+t.height,r=t.left,o=window.innerHeight-t.y+4,a=t.width;window.innerHeight-n<200?ce({minWidth:a,bottom:o,left:r,maxHeight:t.y-10}):ce({minWidth:a,top:n,left:r,maxHeight:window.innerHeight-n-12}),Pe()}Ce&&Oe(!1)}),[Q,Ce,Pe,Le]),Me=k.useCallback((function(e){var t,n=je()[we];n&&(e.preventDefault(),n.classList.contains("select-all")?De():Te(null===(t=n.querySelector("input"))||void 0===t?void 0:t.value))}),[we,Te,je,De]),Be=k.useCallback((function(e){Y&&O&&O(I(Array.from(e.target.options))),G&&G(e)}),[Y,G,O]),He=k.useCallback((function(e){var t=je();switch(e.key){case C.s.Escape:Le();break;case C.s.ArrowDown:case C.s.ArrowUp:e.preventDefault();var n=e.key===C.s.ArrowDown?1:-1;Ee((function(e){return(e+n+t.length)%t.length}));break;case C.s.Home:Ee(0);break;case C.s.End:Ee(t.length-1);break;case C.s.Enter:Me(e),!Y&&Le();break;case C.s.Space:!W&&Me(e),!Y&&Le();break;case C.s.Tab:e.preventDefault(),Le()}}),[Y,W,je,Me,Le]),Ve=k.useCallback((function(e){switch(e.key){case C.s.Escape:e.stopPropagation(),le(""),Le();break;case C.s.Space:e.stopPropagation()}}),[Le]),qe=k.useCallback((function(e){"function"==typeof t?t(e):t&&(t.current=e),null!==e&&ve(e)}),[t]);return k.useEffect((function(){!H&&Y&&re(Ie())}),[Y,Z.value,Ie]),k.useEffect((function(){!W&&le("")}),[W]),k.useEffect((function(){me&&ge(Array.from(me.options))}),[me,Z.children]),k.useEffect((function(){if(!H){var e=function(e){ke.current.contains(e.target)||xe.current.contains(e.target)||Le()},t=function(e){xe.current.contains(e.target)||Le()};if(Q){var n,r;null===(n=(W?Ne:xe).current)||void 0===n||n.focus();var o=null===(r=xe.current)||void 0===r?void 0:r.querySelector(".custom-control.selected");o&&Ee(je().indexOf(o)),document.addEventListener("click",e),window.addEventListener("wheel",t)}else{var a;!Ce&&(null===(a=Se.current)||void 0===a||a.focus()),document.removeEventListener("click",e),window.removeEventListener("wheel",t)}return function(){document.removeEventListener("click",e),window.removeEventListener("wheel",t)}}}),[Ce,W,Q,je,Le]),k.useEffect((function(){if(F&&"string"==typeof F)!H&&pe(F||Z.placeholder);else if(F&&"function"==typeof F){var e=F(Z.value);!H&&pe((Array.isArray(e)?e.join(", "):e)||Z.placeholder)}else!H&&pe((Array.isArray(Z.value)?Z.value.join(", "):Z.value)||Z.placeholder)}),[Z.value,Z.placeholder,F]),k.useEffect((function(){var e,t,n;null===(e=je())||void 0===e||null===(t=e[we])||void 0===t||null===(n=t.scrollIntoView)||void 0===n||n.call(t,!1)}),[we,je]),k.useEffect((function(){return function(){c&&(u.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),d&&(document.removeEventListener("touchmove",h,l?{passive:!1}:void 0),d=!1),p=-1),c?y():g(),u=[]}}),[]),k.createElement("div",Object.assign({},v,{className:S()("rc custom-dropdown",v.className)}),!H&&k.createElement("div",{className:S()("dropdown",{show:Q,clearable:B}),ref:ke},k.createElement(A.a,{type:null==V?void 0:V.type,message:null},k.createElement("button",{ref:Se,className:"btn btn-secondary dropdown-toggle",type:"button",id:K,"data-toggle":"dropdown","aria-expanded":Q||null,"aria-haspopup":"listbox","aria-labelledby":(Z["aria-labelledby"]?Z["aria-labelledby"]+" ":"")+K,onClick:_e,disabled:Z.disabled},k.createElement("span",null,de))),B&&k.createElement(N.P,{onClick:function(){return De(!1)},disabled:Z.disabled}),M?(0,x.createPortal)(k.createElement("ul",Object.assign({ref:xe,className:S()("rc dropdown-menu",{show:Q}),role:"listbox","aria-labelledby":Z["aria-labelledby"],"aria-activedescendant":Q?null===(n=je()[we])||void 0===n?void 0:n.querySelector("input").id:null,style:Object.assign({},se),tabIndex:-1,onKeyDown:He},z),W&&k.createElement("input",{ref:Ne,type:"text",className:"form-control",role:"combobox","aria-activedescendant":Q?null===(i=je()[we])||void 0===i?void 0:i.querySelector("input").id:null,"aria-autocomplete":"list","aria-expanded":Q,"aria-haspopup":"true","aria-owns":J,placeholder:E.search||D,value:ae,onChange:function(e){return le(e.target.value)},onKeyDown:Ve}),Y&&!ae&&U?k.Children.count(Z.children)?k.createElement(k.Fragment,null,k.createElement("li",{className:S()("custom-control custom-checkbox select-all",{focused:0===we})},k.createElement("input",{id:X,name:"inline",type:"checkbox",className:"custom-control-input",checked:ne,hidden:!0,onChange:De}),k.createElement("label",{className:"custom-control-label",htmlFor:X},E.selectAll||T)),k.createElement("div",{className:"dropdown-divider"})):E.emptyList||j:null,(s=ae.length>0||!Y||!U?0:1,null!=(f=k.Children.map(Z.children,(function(e){if(!k.isValidElement(e))return e;var t,n=(null===(t=e.type)||void 0===t?void 0:t.name)||e.type,o=function(e){if(ae){if(k.isValidElement(e)){var t,n=ae.toLowerCase().trim();return String(null===(t=e.props)||void 0===t?void 0:t.children).toLowerCase().trim().indexOf(n)<0}return!0}return!1},a=Y?null:K;switch(n){case"option":return o(e)?null:k.createElement(P,Object.assign({},e.props,{multiple:Y,name:a,value:e.props.value,checked:Array.isArray(Z.value)?Z.value.includes(e.props.value):Z.value==e.props.value,focused:we===s++,onChange:Re}),e.props.children);case"optgroup":var l,i=k.createElement("label",{className:"optgroup-label"},null===(l=e.props)||void 0===l?void 0:l.label);return[ae?null:i].concat((0,r.Z)(k.Children.toArray(e.props.children).map((function(e){return o(e)?null:k.createElement(P,Object.assign({},e.props,{multiple:Y,name:a,value:e.props.value,checked:Array.isArray(Z.value)?Z.value.includes(e.props.value):Z.value==e.props.value,focused:we===s++,onChange:Re}),e.props.children)}))));default:return ae?null:e}})))&&f.length?f:ae?k.createElement("p",null,E.noResult||R):k.createElement("p",null,E.emptyList||j))),M.body):null),k.createElement(A.a,{type:null==V?void 0:V.type,message:null==V?void 0:V.message},k.createElement("select",Object.assign({},Z,{ref:qe,onChange:Be,className:S()("custom-select",Z.className),hidden:!H}),!Z.value&&k.createElement("option",{disabled:!0,value:"",hidden:!0},Z.placeholder),k.Children.toArray(Z.children).filter((function(e){return["option","optgroup"].includes(e.type)})))),B&&H&&k.createElement(N.P,{onClick:function(){return De(!1)},disabled:Z.disabled}))}))},64230:function(e,t,n){"use strict";n.d(t,{a:function(){return l}});var r=n(508),o=n.n(r),a=n(27378),l=function(e){var t=a.useState(0),n=t[0],r=t[1];a.useEffect((function(){switch(e.type){case"danger":r(10);break;case"warning":r(50);break;case"success":r(100);break;default:r(0)}}),[e.type]);var l,i,s=a.Children.count(e.children);return s?e.type?(l=s>1?a.createElement("div",null,e.children):e.children,i=a.Children.toArray(l)[0],a.isValidElement(i)?a.createElement(a.Fragment,null,a.cloneElement(i,{className:o()(i.props.className,"rc-d feedback feedback-"+n,{"no-border":e.noBorder},{"mb-0":e.message})}),e.type&&a.createElement("p",{className:o()("rc-d feedback-message"),role:"alert",id:e.id},e.message)):i):e.children:null}},59196:function(e,t,n){"use strict";n.d(t,{a:function(){return r.a}});var r=n(64230)},44236:function(e,t,n){"use strict";n.d(t,{f:function(){return u}});var r=n(30808),o=n(75418),a=n(508),l=n.n(a),i=n(27378),s=n(59196),c=["leftSlot","leftSlotTitle","onLeftClick","rightSlot","rightSlotTitle","onRightClick","indicator","wrapperProps"],u=i.forwardRef((function(e,t){var n=e.leftSlot,a=e.leftSlotTitle,u=e.onLeftClick,d=e.rightSlot,p=e.rightSlotTitle,f=e.onRightClick,m=e.indicator,v=e.wrapperProps,b=void 0===v?{}:v,h=(0,r.Z)(e,c),g=i.useState(null),y=g[0],w=g[1],E=(0,o.k)("tbgl-");return i.useEffect((function(){return w(h.id?h.id:h.label?(0,o.k)("tbg-"):null)}),[h.id]),i.createElement("div",Object.assign({},b,{className:l()("rc input-box-group",b.className)}),h.label&&i.createElement("label",{id:E,className:"custom-label",htmlFor:y},h.label),h.instruction&&i.createElement("p",{className:"custom-instruction"},h.instruction),i.createElement("div",{className:l()("rc input-group",{disabled:h.disabled})},i.createElement(s.a,m,i.createElement("div",{className:"input-box-group-wrapper"},n&&i.createElement("div",{className:l()("input-group-prepend",{clickable:u}),role:u?"button":null,onClick:u,tabIndex:u?0:null,"aria-hidden":u?null:"true","aria-describedby":a?null:E},i.createElement("span",{className:"input-group-text",title:a},n)),i.createElement("input",Object.assign({},h,{ref:t,id:y,className:l()("form-control",h.className)})),d&&i.createElement("div",{className:l()("input-group-append",{clickable:f}),onClick:f,role:f?"button":null,tabIndex:f?0:null,"aria-hidden":f?null:"true","aria-describedby":p?null:E},i.createElement("span",{className:"input-group-text",title:p},d))))))}))},40716:function(e,t,n){"use strict";var r;n.d(t,{s:function(){return r}}),function(e){e.ArrowDown="ArrowDown",e.ArrowUp="ArrowUp",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.Escape="Escape",e.End="End",e.Enter="Enter",e.Home="Home",e.PageDown="PageDown",e.PageUp="PageUp",e.Space=" ",e.Shift="Shift",e.Tab="Tab",e.Delete="Delete"}(r||(r={}))},49657:function(e,t,n){var r=n(27378);function o(e){return r.createElement("svg",e,[r.createElement("path",{fillRule:"evenodd",d:"M1.5 13A1.5 1.5 0 0 0 3 14.5h8a1.5 1.5 0 0 0 1.5-1.5V9a.5.5 0 0 0-1 0v4a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 5v8zm7-11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.5H9a.5.5 0 0 1-.5-.5z",key:0}),r.createElement("path",{fillRule:"evenodd",d:"M14.354 1.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z",key:1})])}o.defaultProps={width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 16 16"},e.exports=o,o.default=o},34102:function(e,t,n){var r=n(98106);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.__esModule=!0,e.exports.default=e.exports},93231:function(e){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},e.exports.__esModule=!0,e.exports.default=e.exports},68:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},91282:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},9833:function(e,t,n){var r=n(34102),o=n(68),a=n(35068),l=n(91282);e.exports=function(e){return r(e)||o(e)||a(e)||l()},e.exports.__esModule=!0,e.exports.default=e.exports},30808:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}n.d(t,{Z:function(){return r}})},4147:function(e){"use strict";e.exports=JSON.parse('{"name":"react-components-docs","version":"1.0.0","description":"The documentation for SEB\'s React components","keywords":["gatsby","react"],"scripts":{"start":"NODE_OPTIONS=--max-old-space-size=8192 gatsby develop -p 3000","build":"NODE_OPTIONS=--max-old-space-size=8192 gatsby build --prefix-paths","serve":"gatsby serve","clean":"gatsby clean"},"license":"Apache-2.0","dependencies":{"@sebgroup/frontend-tools":"^2.2.2","browser-typescript-parser":"^2.6.7","classnames":"^2.3.1","gatsby":"^4.20.0","gatsby-plugin-manifest":"^4.11.1","gatsby-plugin-offline":"^5.11.1","gatsby-plugin-polyfill-io":"^1.1.0","gatsby-plugin-react-helmet":"^5.11.0","gatsby-plugin-react-svg":"^3.1.0","gatsby-plugin-sass":"^5.11.1","gatsby-plugin-sitemap":"^5.11.1","lorem-ipsum":"^2.0.4","react-helmet":"^6.1.0","react-syntax-highlighter":"^15.5.0"},"devDependencies":{"@types/react-helmet":"^6.1.5","dotenv":"^16.0.0","os-browserify":"^0.3.0","path-browserify":"^1.0.1","tsconfig-paths-webpack-plugin":"^3.5.2"}}')},19022:function(e){"use strict";e.exports=JSON.parse('{"j":[{"name":"v7.5.5"}]}')},99876:function(e){"use strict";e.exports=JSON.parse('{"HO":{"k6":"^6.0.1","Ym":"^18.1.0","NN":"^4.6.3"},"vc":{"u":"/react-components"}}')}}]);
//# sourceMappingURL=3fbe8df6715bd49bc1a35fe1146325570ae4f7f2-1f1c3f82dc62468e8793.js.map