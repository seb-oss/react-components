(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1054:function(t,n,e){"use strict";e.r(n);var o=e(36),r=e(0),i=(e(829),r.createElement("svg",{name:"info-circle",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r.createElement("path",{d:"M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"}))),a=function(t){function n(n){var e=t.call(this,n)||this;return e.state={toggle:!1},e.forceDismiss=e.forceDismiss.bind(e),e.toggleTooltip=e.toggleTooltip.bind(e),e}return o.b(n,t),n.prototype.forceDismiss=function(t){if(t)switch(t.target.className){case"icon":case"message":case"message-container":case"triangle":return;default:this.setState({toggle:!1})}else this.setState({toggle:!1})},n.prototype.forceShow=function(){!this.state.toggle&&this.setState({toggle:!0})},n.prototype.isPositioned=function(t){return 0===(this.props.position?this.props.position:"bottom").search(t)},n.prototype.toggleTooltip=function(t,n){void 0!==t?this.setState({toggle:t}):this.setState({toggle:!this.state.toggle}),this.props.onClick&&this.props.onClick(n)},n.prototype.render=function(){var t=this;return r.createElement("div",{className:"tooltip-container"+(this.props.className?" "+this.props.className:"")},r.createElement("div",{className:"icon",onClick:function(n){return!t.props.triggerOnHover&&t.toggleTooltip(void 0,n)},onMouseEnter:function(){return t.props.triggerOnHover&&t.toggleTooltip(!0)},onMouseLeave:function(){return t.props.triggerOnHover&&t.toggleTooltip(!1)}},this.props.customSvg?this.props.customSvg:i),r.createElement("div",{className:"content "+(this.props.position||"bottom")+" "+(this.props.theme||"default")+" "+(this.state.toggle?"open":"")},this.isPositioned("bottom")&&r.createElement("div",{className:"triangle"}),!this.props.messageGroup&&r.createElement("div",{className:"message-container",style:{width:(this.props.width||120)+"px"}},this.props.title&&r.createElement("div",{className:"title"},this.props.title),r.createElement("div",{className:"message"},this.props.message||"Tooltip is empty. Please pass a message.")),this.props.messageGroup&&r.createElement("div",{className:"message-container",style:{width:(this.props.width||120)+"px"}},this.props.messageGroup.map(function(t,n){return r.createElement("div",{key:n,className:"message-list-item"},t.title&&r.createElement("div",{className:"title"},t.title),t.message&&r.createElement("div",{className:"message"},t.message))})),(this.isPositioned("top")||this.isPositioned("right")||this.isPositioned("left"))&&r.createElement("div",{className:"triangle"})))},n}(r.Component),s=e(398),l=e(399).default,c=e(831),p=r.createElement("svg",{id:"PIKTO_REGULAR",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 170 170"},r.createElement("title",null,"regular_black"),r.createElement("path",{d:"M137.5,102.1V40.4a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v61.7a3,3,0,0,0,3,3H134.5A3,3,0,0,0,137.5,102.1ZM112,91.3v7.7H30.5V91.3a3,3,0,0,0-3-3,6.1,6.1,0,0,1-6.1-6.1,3,3,0,0,0-3-3H11V63h7.5a3,3,0,0,0,3-3,6.1,6.1,0,0,1,6.1-6.1,3,3,0,0,0,3-3V43.4H112v7.5a3,3,0,0,0,3,3A6.1,6.1,0,0,1,121,60a3,3,0,0,0,3,3h7.5V79.3H124a3,3,0,0,0-3,3,6.1,6.1,0,0,1-6.1,6.1A3,3,0,0,0,112,91.3ZM131.5,57h-4.9a12.1,12.1,0,0,0-8.7-8.7V43.4h13.6ZM24.5,43.4v4.9A12.1,12.1,0,0,0,15.9,57H11V43.4ZM11,85.3h4.9A12.1,12.1,0,0,0,24.5,94v5.1H11ZM118,99.1V94a12.1,12.1,0,0,0,8.7-8.7h4.9V99.1Z"}),r.createElement("path",{d:"M151.3,115.8V54.2h-6v58.7H21.7v6H148.3A3,3,0,0,0,151.3,115.8Z"}),r.createElement("path",{d:"M159,67.9v58.7H35.5v6H162a3,3,0,0,0,3-3V67.9Z"}),r.createElement("path",{d:"M71.3,88.8A17.5,17.5,0,1,1,88.8,71.3,17.5,17.5,0,0,1,71.3,88.8Zm0-29A11.5,11.5,0,1,0,82.8,71.3,11.5,11.5,0,0,0,71.3,59.8Z"})),d=function(t){function n(n){var e=t.call(this,n)||this;return e.onToolTipClick=e.onToolTipClick.bind(e),e}return o.b(n,t),n.prototype.onToolTipClick=function(t){alert("Clickable tootip has been Clicked")},n.prototype.render=function(){var t=this,n=Object(s.a)(this.props.location.search,"mode");return r.createElement("div",{className:"route-template "+("dl"===n||"DL"===n?"brief":""),onClick:function(n){return t.MyTooltip.forceDismiss(n)}},r.createElement("div",{className:"info-holder"},r.createElement("div",{className:"info"},r.createElement("div",{className:"md-file"},r.createElement(l,{innerHTML:!0},c))),r.createElement("div",{className:"info"},r.createElement("h2",null,"Output"),r.createElement("p",null,"Here are sample outputs"),r.createElement("div",{className:"result"},r.createElement(a,{message:"Tooltip message could be long, therefore, controlling the position and width is important",position:"right",width:200,ref:function(n){t.MyTooltip=n}})),r.createElement("p",null,"Here are sample with custom svg"),r.createElement("div",{className:"result"},r.createElement(a,{message:"Tooltip message could be long, therefore, controlling the position and width is important",position:"right",width:200,customSvg:p,ref:function(n){t.MyTooltip=n},onClick:this.onToolTipClick})))))},n}(r.Component);n.default=d},398:function(t,n,e){"use strict";function o(t,n){var e=RegExp("[?&]"+n+"=([^&]*)").exec(t);return e&&decodeURIComponent(e[1].replace(/\+/g," "))}e.d(n,"a",function(){return o})},829:function(t,n,e){var o=e(830);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};e(58)(o,r);o.locals&&(t.exports=o.locals)},830:function(t,n,e){(t.exports=e(54)(!1)).push([t.i,'.tooltip-container {\n  display: inline-block;\n  position: relative;\n  border-radius: 4px; }\n  .tooltip-container .icon {\n    cursor: pointer;\n    height: 25px;\n    width: 25px;\n    margin: auto; }\n    .tooltip-container .icon svg {\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n      vertical-align: top; }\n  .tooltip-container .content {\n    position: absolute;\n    z-index: -1;\n    opacity: 0; }\n    .tooltip-container .content.open {\n      opacity: 1;\n      z-index: 2; }\n    .tooltip-container .content .message-container {\n      position: relative;\n      background-color: #ffffff;\n      min-width: 120px;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);\n      padding: 5px 10px 10px;\n      text-align: center; }\n      .tooltip-container .content .message-container .title {\n        font-weight: bold;\n        margin-bottom: 5px; }\n      .tooltip-container .content .message-container .message-list-item:not(:first-child) {\n        margin-top: 10px; }\n      .tooltip-container .content .message-container .message {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none; }\n    .tooltip-container .content .triangle {\n      position: relative;\n      background-color: #ffffff;\n      box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);\n      top: -2px; }\n      .tooltip-container .content .triangle::after {\n        content: "";\n        position: absolute;\n        width: 0;\n        height: 0;\n        box-sizing: border-box;\n        border: 9px solid;\n        border-color: transparent;\n        transform-origin: 0 0;\n        transform: rotate(-45deg);\n        box-shadow: -2px 3px 3px -1px rgba(0, 0, 0, 0.4);\n        background-color: transparent;\n        border-collapse: collapse; }\n    .tooltip-container .content.top {\n      right: 50%;\n      top: 4px;\n      transform: translate(50%, -100%); }\n      .tooltip-container .content.top .triangle {\n        display: block;\n        margin-bottom: 11px;\n        transform: translateX(-13px);\n        text-align: center; }\n        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n          .tooltip-container .content.top .triangle {\n            left: 50%; } }\n    .tooltip-container .content.top-right {\n      left: -16px;\n      top: -7px;\n      transform: translateY(-100%);\n      text-align: left; }\n      .tooltip-container .content.top-right .triangle {\n        left: 13px;\n        transform: unset; }\n    .tooltip-container .content.top-left {\n      right: -15px;\n      top: -7px;\n      transform: translateY(-100%); }\n      .tooltip-container .content.top-left .triangle {\n        transform: translateX(-35px);\n        margin-left: 100%;\n        right: 3px; }\n    .tooltip-container .content.bottom {\n      margin-top: 9px;\n      right: 50%;\n      transform: translateX(50%);\n      margin-bottom: 5px; }\n      .tooltip-container .content.bottom .triangle {\n        transform: translateX(-2px);\n        display: block;\n        text-align: center; }\n        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n          .tooltip-container .content.bottom .triangle {\n            left: 50%; } }\n        .tooltip-container .content.bottom .triangle:after {\n          box-shadow: -3px 0px 2px -2px rgba(0, 0, 0, 0.24);\n          top: 9px;\n          transform: rotate(135deg);\n          transform-origin: top; }\n    .tooltip-container .content.bottom-right {\n      margin-top: 9px;\n      left: -14px;\n      transform: unset;\n      margin-bottom: 5px;\n      text-align: left; }\n      .tooltip-container .content.bottom-right .triangle {\n        left: 22px;\n        transform: unset; }\n        .tooltip-container .content.bottom-right .triangle:after {\n          box-shadow: -3px 0px 2px -2px rgba(0, 0, 0, 0.24);\n          top: 9px;\n          transform: rotate(135deg);\n          transform-origin: top; }\n    .tooltip-container .content.bottom-left {\n      margin-top: 9px;\n      right: -13px;\n      margin-bottom: 5px;\n      transform: unset; }\n      .tooltip-container .content.bottom-left .triangle {\n        transform: translateX(-22px);\n        margin-left: 100%;\n        right: 3px; }\n        .tooltip-container .content.bottom-left .triangle:after {\n          box-shadow: -3px 0px 2px -2px rgba(0, 0, 0, 0.24);\n          top: 9px;\n          transform: rotate(135deg);\n          transform-origin: top; }\n    .tooltip-container .content.right {\n      transform: translateY(-50%);\n      top: 50%;\n      left: 32px; }\n      .tooltip-container .content.right .triangle {\n        position: absolute;\n        top: 50%;\n        transform: translateY(-13px); }\n        .tooltip-container .content.right .triangle:after {\n          transform: rotate(45deg);\n          left: 2px;\n          box-shadow: -1px 5px 4px -3px rgba(0, 0, 0, 0.24); }\n    .tooltip-container .content.right-bottom {\n      transform: unset;\n      top: -9px;\n      left: 32px; }\n      .tooltip-container .content.right-bottom .triangle {\n        position: absolute;\n        top: 11px;\n        transform: unset; }\n        .tooltip-container .content.right-bottom .triangle:after {\n          transform: rotate(45deg);\n          left: 2px;\n          box-shadow: -1px 5px 4px -3px rgba(0, 0, 0, 0.24); }\n    .tooltip-container .content.right-top {\n      transform: translateY(-100%);\n      top: 34px;\n      left: 32px; }\n      .tooltip-container .content.right-top .triangle {\n        position: absolute;\n        transform: translateY(-32px);\n        top: 100%; }\n        .tooltip-container .content.right-top .triangle:after {\n          transform: rotate(45deg);\n          left: 2px;\n          box-shadow: -1px 5px 4px -3px rgba(0, 0, 0, 0.24); }\n    .tooltip-container .content.left {\n      right: 32px;\n      transform: translateY(-50%);\n      top: 45%; }\n      .tooltip-container .content.left .triangle {\n        position: absolute;\n        top: 50%;\n        right: 0;\n        transform: translateY(15px); }\n        .tooltip-container .content.left .triangle:after {\n          transform: rotate(225deg);\n          left: -2px;\n          box-shadow: -4px 1px 2px -2px rgba(0, 0, 0, 0.24); }\n    .tooltip-container .content.left-bottom {\n      margin-right: 1px;\n      right: 31px;\n      top: -8px; }\n      .tooltip-container .content.left-bottom .triangle {\n        position: absolute;\n        top: 37px;\n        right: 0; }\n        .tooltip-container .content.left-bottom .triangle:after {\n          transform: rotate(225deg);\n          left: -2px;\n          box-shadow: -4px 1px 2px -2px rgba(0, 0, 0, 0.24); }\n    .tooltip-container .content.left-top {\n      transform: translateY(-100%);\n      top: 34px;\n      margin-right: 1px;\n      right: 31px; }\n      .tooltip-container .content.left-top .triangle {\n        position: absolute;\n        transform: translateY(-6px);\n        top: 100%;\n        right: 0; }\n        .tooltip-container .content.left-top .triangle:after {\n          transform: rotate(225deg);\n          left: -2px;\n          box-shadow: -4px 1px 2px -2px rgba(0, 0, 0, 0.24); }\n    .tooltip-container .content.default .message-container {\n      background-color: #000000;\n      color: #ffffff; }\n    .tooltip-container .content.default .triangle {\n      background-color: #000000; }\n      .tooltip-container .content.default .triangle:after {\n        border-color: transparent transparent #000000 #000000; }\n    .tooltip-container .content.light .message-container {\n      background-color: #e9e9e9;\n      color: #000000; }\n    .tooltip-container .content.light .triangle {\n      background-color: #e9e9e9; }\n      .tooltip-container .content.light .triangle:after {\n        border-color: transparent transparent #e9e9e9 #e9e9e9; }\n    .tooltip-container .content.danger .message-container {\n      background-color: #F03529;\n      color: #ffffff; }\n    .tooltip-container .content.danger .triangle {\n      background-color: #F03529; }\n      .tooltip-container .content.danger .triangle:after {\n        border-color: transparent transparent #F03529 #F03529; }\n    .tooltip-container .content.warning .message-container {\n      background-color: #FFC500;\n      color: #ffffff; }\n    .tooltip-container .content.warning .triangle {\n      background-color: #FFC500; }\n      .tooltip-container .content.warning .triangle:after {\n        border-color: transparent transparent #FFC500 #FFC500; }\n    .tooltip-container .content.success .message-container {\n      background-color: #60cd18;\n      color: #ffffff; }\n    .tooltip-container .content.success .triangle {\n      background-color: #60cd18; }\n      .tooltip-container .content.success .triangle:after {\n        border-color: transparent transparent #60cd18 #60cd18; }\n    .tooltip-container .content.primary .message-container {\n      background-color: #41B0EE;\n      color: #ffffff; }\n    .tooltip-container .content.primary .triangle {\n      background-color: #41B0EE; }\n      .tooltip-container .content.primary .triangle:after {\n        border-color: transparent transparent #41B0EE #41B0EE; }\n    .tooltip-container .content.purple .message-container {\n      background-color: #673AB6;\n      color: #ffffff; }\n    .tooltip-container .content.purple .triangle {\n      background-color: #673AB6; }\n      .tooltip-container .content.purple .triangle:after {\n        border-color: transparent transparent #673AB6 #673AB6; }\n',""])},831:function(t,n){t.exports='<hr>\n<p>title: Tooltip\ncomponentid: component-tooltip\nvariantid: default</p>\n<h2 id="guid-tooltip-guid-default-component-react">guid: &#39;tooltip-guid-default-component-react&#39;</h2>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: Tooltip Component\nComponent: &quot;Tooltip&quot;\nSelector: &quot;&lt;Tooltip/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/Tooltip&quot;\nType: UI Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component supports customization and configurations. The component name is <code>Tooltip</code> and the selector is <code>&lt;Tooltip/&gt;</code>. this component can recieve custom svg as its icon.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;Tooltip\n    message=&quot;Tooltip message could be long, therefore, controlling the position and width is important&quot;\n    position=&quot;right&quot;\n    width={200}\n/&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Descrition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>title?</td>\n<td><code>string</code></td>\n<td>Title</td>\n</tr>\n<tr>\n<td>message?</td>\n<td><code>string</code></td>\n<td>Description</td>\n</tr>\n<tr>\n<td>messageGroup?</td>\n<td><code>Array&lt;TooltipMessageGroupItem&gt;</code><sup>1</sup></td>\n<td>Multiple titles/descriptions</td>\n</tr>\n<tr>\n<td>position?</td>\n<td><code>string</code></td>\n<td>Css style positions: top/bottom/left/right</td>\n</tr>\n<tr>\n<td>customSvg?</td>\n<td><code>any</code></td>\n<td>A direct svg code or a component with svg</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>Custom class</td>\n</tr>\n<tr>\n<td>width?</td>\n<td><code>number</code></td>\n<td>Width of the text holder</td>\n</tr>\n<tr>\n<td>theme?</td>\n<td><code>string</code></td>\n<td>Based on SEB predefined colors. (default: <code>&#39;default&#39;</code>)<sup>2</sup></td>\n</tr>\n<tr>\n<td>triggerOnHover?</td>\n<td><code>boolean</code></td>\n<td>Enables the ability to show the tooltip on hover, click will be disabled (default: <code>&#39;false&#39;</code>)</td>\n</tr>\n<tr>\n<td>onClick</td>\n<td><code>(event?: React.MouseEvent&lt;HTMLDivElement&gt;) =&gt; void</code></td>\n<td>click action</td>\n</tr>\n</tbody></table>\n<h2 id="public-methods">Public Methods</h2>\n<p>These are the public methods accessible via <a href="https://reactjs.org/docs/refs-and-the-dom.html">React ref</a></p>\n<table>\n<thead>\n<tr>\n<th>Name</th>\n<th>Parameters</th>\n<th>type</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>forceDismiss</td>\n<td>event?</td>\n<td><code>MouseEvent</code><sup>3</sup></td>\n<td>Forces the tooltip to dismiss once</td>\n</tr>\n<tr>\n<td>forceShow</td>\n<td></td>\n<td></td>\n<td>Forces the tooltip to show once</td>\n</tr>\n</tbody></table>\n<h5 id="example-usage-of-forcedismiss-and-ref-this-example-shows-how-to-allow-the-tooltip-to-be-dismissed-when-clicked-outside">Example usage of forceDismiss and ref. This example shows how to allow the tooltip to be dismissed when clicked outside</h5>\n<pre><code class="language-javascript">const ExampleContainer: React.FunctionComponent = () =&gt; {\n    MyTooltip: Tooltip;\n\n    return (\n        &lt;div className=&quot;example-container&quot; onClick={(e) =&gt; this.MyTooltip.forceDismiss(e)}&gt;\n            &lt;Tooltip\n                message=&quot;Tooltip message&quot;\n                ref={(el: Tooltip) =&gt; { this.MyTooltip = el; }}\n            /&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n<h2 id="footnote">Footnote</h2>\n<ol>\n<li><code>messageGroup</code> items has an exported interface named <code>TooltipMessageGroupItem</code><pre><code class="language-typescript">{\n   title: string,\n   message: string\n}</code></pre>\n</li>\n<li>Supported themes: <code>default</code>, <code>light</code>, <code>primary</code>, <code>warning</code>, <code>success</code>, <code>danger</code>, <code>purple</code></li>\n<li>Mouse event is used to determine if the clicked happened outside the tooltip to dismiss it. If you wanted to force it to dismiss regardless, you should not pass the event.</li>\n</ol>\n'}}]);