(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1057:function(e,o,n){"use strict";n.r(o);var t=n(36),r=n(0),d=(n(784),r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},r.createElement("path",{d:"M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"}))),l=r.createElement("svg",{id:"dropdown-times-icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},r.createElement("path",{d:"M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z"})),a=r.createElement("svg",{id:"dropdown-more-icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},r.createElement("path",{d:"M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"})),c=function(e){var o=r.useState(!1),n=o[0],c=o[1],s=r.useState(!1),i=s[0],u=s[1],m=r.useState(-1),p=m[0],w=m[1],h=r.useState(""),g=h[0],b=h[1],v=r.createRef(),f=r.createRef(),x=r.createRef();r.useEffect(function(){return document.addEventListener("mousedown",E),function(){document.removeEventListener("mousedown",E)}});var E=function(e){v.current&&!v.current.contains(e.target)&&f.current&&!f.current.contains(e.target)&&c(!1)};r.useEffect(function(){n?D():(b(""),p>-1&&w(-1))},[n]),r.useEffect(function(){n&&D()},[p,i]);var D=function(){y()||k()},y=function(){return!!(i&&M[p]&&M[p].current)&&(M[p].current.focus(),!0)},k=function(){x.current?x.current.focus():f.current&&f.current.focus()},N=Array.isArray(e.list);if(!e.list||!N)return null;var L=e.list.filter(function(e){return e&&e.hasOwnProperty("value")&&e.hasOwnProperty("label")}).map(function(o,n){var t=o.value+"-"+n,r=!1;return e.multi?e.selectedValue&&e.selectedValue.find(function(e){return e.value===o.value})&&(r=!0):e.selectedValue&&o.value===e.selectedValue.value&&(r=!0),{dropdownItem:o,id:t,selected:r}}),C=L.map(function(o,n){return t.a({},o,{className:"dropdown-item custom-dropdown-item"+(e.multi?" multi":"")+(o.selected?" selected":"")})}).filter(function(e){return e.dropdownItem.label.toLowerCase().includes(g.toLowerCase())}),I=L.filter(function(e){return e.selected}).map(function(e){return e.dropdownItem}),S=I.length===L.length;e.multi&&0===g.length&&C.unshift({id:"select-all",dropdownItem:{value:"select-all",label:"Select All"},selected:S,className:"dropdown-item select-all custom-dropdown-item multi"+(S?" selected":"")});var V=e.disabled||!L.length,M=C.map(function(){return r.createRef()}),z=function(){e.onChange(null),c(!1)},A=function(o){if(e.multi){var n=e.selectedValue?e.selectedValue:[];if(-1===n.findIndex(function(e){return e.value===o.value})){d=t.a({},o);var r=n.concat([d]);e.onChange(r)}else{r=n.filter(function(e){return e.value!==o.value});e.onChange(r)}}else{var d=t.a({},o);e.onChange(d),c(!1)}},P=function(){S?e.onChange([]):e.onChange(e.list)},R=function(){return L&&0===L.length?"Empty":I&&I.length>0?S?"All selected ("+I.length+")":e.multi?1===I.length?I[0].label:I.length+" Selected":e.selectedValue.label:e.placeholder&&e.placeholder.length?e.placeholder:"Select ..."};return!e.multi&&e.native?r.createElement(r.Fragment,null,e.label&&r.createElement("label",{className:"dropdown-label "+(V?" disabled":"")},e.label),r.createElement("select",{disabled:V,className:"form-control"+(V?" disabled":"")+(e.className?" "+e.className:""),name:e.name,value:e.selectedValue?e.selectedValue.value:"",onChange:e.onChange},e.list.map(function(e){return r.createElement("option",{key:e.value,value:e.value},e.label)})),e.error&&r.createElement("div",{className:"alert alert-danger"},e.error)):r.createElement(r.Fragment,null,r.createElement("div",{className:"dropdown custom-dropdown"+(V?" disabled":"")+(e.className?" "+e.className:"")},e.label&&r.createElement("label",{className:"dropdown-label"},e.label),r.createElement("div",{onKeyDown:V?null:function(e){switch(e.key.toLowerCase()){case"tab":n&&c(!1);break;case" ":case"enter":e.preventDefault(),!n&&c(!0)}},ref:v,className:"btn btn-secondary custom-dropdown-toggle"+(n?" open":"")+(e.more?" more mx-right":"")+(V?" disabled":""),id:"dropdownMenuButton","aria-label":"Dropdown toggle: "+R(),"aria-haspopup":!0,"aria-expanded":n,tabIndex:V?-1:0,onClick:V?null:function(e){c(!n)}},e.more?r.createElement("div",{className:"right-items"},r.createElement("div",{className:"dropdown-icon-holder"},a)):r.createElement(r.Fragment,null,r.createElement("div",{className:"title"},R()),r.createElement("div",{className:"right-items"},(e.clearable||e.multi)&&I.length>0?r.createElement("div",{id:"clearButton",className:"dropdown-icon-holder",onClick:V?null:function(e){e.stopPropagation(),e.preventDefault(),z()}},l):null,r.createElement("div",{className:"dropdown-icon-holder chevron"},d)))),r.createElement("div",{"aria-labelledby":"dropdownMenuButton",onKeyDown:function(o){i||u(!0);var t=o.key.toLowerCase();if(n)switch(t){case"tab":case"escape":c(!1);break;case"enter":o.preventDefault(),e.multi&&0===g.length&&0===p?P():A(C[p].dropdownItem);break;case"arrowdown":o.preventDefault(),p<C.length-1&&w(p+1),p===C.length-1&&w(-1);break;case"arrowup":o.preventDefault(),-1===p&&w(C.length-1),p>0&&w(p-1),0===p&&w(-1)}},tabIndex:0,ref:f,className:"dropdown-menu custom-dropdown-menu"+(n?" show":"")+(e.more?" dropdown-menu-right":"")},e.searchable&&r.createElement(r.Fragment,null,r.createElement("input",{ref:x,type:"search",className:"search-input",name:"search-input",placeholder:e.searchPlaceholder||"Search ...",value:g,onChange:function(e){-1!==p&&w(-1),b(e.target.value)}}),r.createElement("div",{className:"dropdown-divider blue"})),C.map(function(o,n){return r.createElement(r.Fragment,{key:o.id},r.createElement("button",{tabIndex:0,ref:M[n],className:o.className+(p===n?" highlighted":""),onMouseMove:function(e){p!==n&&w(n),!0===i&&u(!1)},onClick:function(t){t.preventDefault(),!1===i&&u(!0),e.multi&&0===g.length&&0===n?P():A(o.dropdownItem)}},e.multi?r.createElement("div",{tabIndex:-1,className:"custom-control"},r.createElement("input",{tabIndex:-1,type:"checkbox",className:"custom-control-input",id:o.id,name:o.id,defaultChecked:o.selected}),o.dropdownItem.label&&r.createElement("label",{tabIndex:-1,className:"custom-control-label",htmlFor:o.id},o.dropdownItem.label)):o.dropdownItem.label&&r.createElement("div",{tabIndex:-1,className:"label"},o.dropdownItem.label)),e.multi&&0===g.length&&0===n&&r.createElement("div",{className:"dropdown-divider"}))}),0===C.length&&r.createElement("a",{className:"dropdown-item custom-dropdown-item disabled"},r.createElement("div",{className:"label"},"No results")))),e.error&&r.createElement("div",{className:"alert alert-danger"},e.error))},s=n(398),i=n(399).default,u=n(786),m=function(e){function o(o){var n=e.call(this,o)||this;return n.state={dropDownList1:[{value:"1",label:"Serbia"},{value:"2",label:"Nicaragua"},{value:"3",label:"Singapore"},{value:"4",label:"Guinea"},{value:"5",label:"Syrian Arab Republic"},{value:"6",label:"Tanzania"},{value:"7",label:"Anguilla"}],dropDownList1Selected:null,dropDownList2:[{value:"1",label:"Mexico"},{value:"2",label:"Guernsey"},{value:"3",label:"Lithuania"},{value:"4",label:"Poland"},{value:"5",label:"Montenegro"},{value:"6",label:"Iran"},{value:"7",label:"Myanmar"}],dropDownList2Selected:null,dropDownList3:[{value:"1",label:"Paraguay"},{value:"2",label:"Dominican Republic"},{value:"3",label:"Mongolia"},{value:"4",label:"Montserrat"},{value:"5",label:"Thailand"},{value:"6",label:"Japan"},{value:"7",label:"Saint Vincent and the Grenadines"}],dropDownList3Selected:null,dropDownList4:[{value:"1",label:"Sierra Leone"},{value:"2",label:"Malawi"},{value:"3",label:"Marshall Islands"},{value:"4",label:"Latvia"},{value:"5",label:"Slovenia"},{value:"6",label:"Argentina"},{value:"7",label:"Solomon Islands"}],dropDownList4Selected:null},n.onChangeDropdown=n.onChangeDropdown.bind(n),n}return t.b(o,e),o.prototype.onChangeDropdown=function(e,o){var n;this.setState(((n={})[o]=e,n))},o.prototype.render=function(){var e=this,o=Object(s.a)(this.props.location.search,"mode");return r.createElement("div",{className:"route-template "+("dl"===o||"DL"===o?"brief":"")},r.createElement("div",{className:"info-holder"},r.createElement("div",{className:"info"},r.createElement("div",{className:"md-file"},r.createElement(i,{innerHTML:!0},u))),r.createElement("div",{className:"info"},r.createElement("h2",null,"Output"),r.createElement("p",null,"Here is the basic one:"),r.createElement("div",{className:"result"},r.createElement(c,{list:this.state.dropDownList1,selectedValue:this.state.dropDownList1Selected,onChange:function(o){return e.onChangeDropdown(o,"dropDownList1Selected")}})),r.createElement("p",null,"Here is the multi select one with search:"),r.createElement("div",{className:"result"},r.createElement(c,{label:"Dropdown label",name:"dropDownList2",list:this.state.dropDownList2,selectedValue:this.state.dropDownList2Selected,onChange:function(o){return e.onChangeDropdown(o,"dropDownList2Selected")},searchable:!0,placeholder:"Multi option",multi:!0})),r.createElement("p",null,"Here is the more button version:"),r.createElement("div",{className:"result"},r.createElement(c,{name:"dropDownList3",list:this.state.dropDownList3,selectedValue:this.state.dropDownList3Selected,onChange:function(e){return console.log(e.label+" - selected")},more:!0})),r.createElement("p",null,"Here is the native version:"),r.createElement("div",{className:"result"},r.createElement(c,{name:"dropDownList4",list:this.state.dropDownList4,selectedValue:this.state.dropDownList4Selected,onChange:function(o){return e.onChangeDropdown({value:o.target.value,label:""},"dropDownList4Selected")},native:!0})))))},o}(r.Component);o.default=m},398:function(e,o,n){"use strict";function t(e,o){var n=RegExp("[?&]"+o+"=([^&]*)").exec(e);return n&&decodeURIComponent(n[1].replace(/\+/g," "))}n.d(o,"a",function(){return t})},784:function(e,o,n){var t=n(785);"string"==typeof t&&(t=[[e.i,t,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(58)(t,r);t.locals&&(e.exports=t.locals)},785:function(e,o,n){(e.exports=n(54)(!1)).push([e.i,'.custom-dropdown {\n  margin-bottom: 8px; }\n  .custom-dropdown > .custom-dropdown-toggle {\n    background-color: white;\n    height: 44px;\n    min-width: 100%;\n    padding: 0px;\n    border-color: #adadad;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding-left: 16px; }\n    .custom-dropdown > .custom-dropdown-toggle > .title {\n      font-weight: normal;\n      color: #444; }\n    .custom-dropdown > .custom-dropdown-toggle > .right-items {\n      display: flex; }\n      .custom-dropdown > .custom-dropdown-toggle > .right-items > .dropdown-icon-holder {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        height: 44px;\n        width: 44px; }\n        .custom-dropdown > .custom-dropdown-toggle > .right-items > .dropdown-icon-holder > svg {\n          will-change: transform;\n          -webkit-transition: 300ms;\n          -moz-transition: 300ms;\n          -o-transition: 300ms;\n          transition: 300ms;\n          width: 18px;\n          height: 18px;\n          fill: #0092e1; }\n    .custom-dropdown > .custom-dropdown-toggle.open > .right-items > .dropdown-icon-holder.chevron > svg {\n      -webkit-transform: rotate(180deg);\n      -moz-transform: rotate(180deg);\n      -o-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n      transform: rotate(180deg); }\n    .custom-dropdown > .custom-dropdown-toggle:hover {\n      border-color: #41b0ee;\n      background-color: white; }\n    .custom-dropdown > .custom-dropdown-toggle:focus {\n      border-color: #007ac7;\n      box-shadow: none;\n      background-color: white; }\n      .custom-dropdown > .custom-dropdown-toggle:focus:active {\n        color: #444;\n        border-color: #007ac7;\n        box-shadow: none;\n        background-color: white; }\n    .custom-dropdown > .custom-dropdown-toggle.more {\n      background-color: inherit;\n      height: 44px;\n      min-width: 44px;\n      max-width: 44px;\n      padding: 0px;\n      border-color: transparent;\n      margin: 0px 0px 0px auto; }\n      .custom-dropdown > .custom-dropdown-toggle.more > .right-items > .dropdown-icon-holder > svg {\n        height: calc(44px / 1.2);\n        width: calc(44px / 1.2); }\n        .custom-dropdown > .custom-dropdown-toggle.more > .right-items > .dropdown-icon-holder > svg:focus:active {\n          fill: white; }\n      .custom-dropdown > .custom-dropdown-toggle.more:hover {\n        background-color: #41b0ee !important; }\n        .custom-dropdown > .custom-dropdown-toggle.more:hover > .right-items > .dropdown-icon-holder > svg {\n          fill: white; }\n      .custom-dropdown > .custom-dropdown-toggle.more:focus {\n        border-color: #007ac7; }\n        .custom-dropdown > .custom-dropdown-toggle.more:focus:active {\n          background-color: #007ac7 !important; }\n      .custom-dropdown > .custom-dropdown-toggle.more.open {\n        background-color: #007ac7 !important; }\n        .custom-dropdown > .custom-dropdown-toggle.more.open > .right-items > .dropdown-icon-holder > svg {\n          fill: white; }\n  .custom-dropdown > .custom-dropdown-menu {\n    min-width: 100%;\n    border-radius: 4px;\n    border: 1px solid #007ac7;\n    padding: 0px;\n    margin: 4px 0px 14px 0px;\n    outline: none;\n    max-height: 70vh;\n    overflow: auto; }\n    .custom-dropdown > .custom-dropdown-menu > .dropdown-divider {\n      margin: 0px; }\n      .custom-dropdown > .custom-dropdown-menu > .dropdown-divider.blue {\n        border-color: #007ac7; }\n    .custom-dropdown > .custom-dropdown-menu > .search-input {\n      height: 44px;\n      padding: 0px 0px 0px 16px;\n      border: none;\n      outline: none; }\n    .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item {\n      display: flex;\n      padding-left: 16px;\n      background: white;\n      color: #444; }\n      .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item:focus {\n        outline: none;\n        background: initial;\n        color: initial;\n        border: initial; }\n      .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item:hover {\n        background: initial;\n        color: initial;\n        border: initial; }\n      .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item .custom-control .custom-control-label,\n      .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item .custom-control .custom-control-input {\n        cursor: pointer;\n        user-select: none; }\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item .custom-control .custom-control-label::before,\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item .custom-control .custom-control-input::before {\n          border-color: #444;\n          background-color: white; }\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item .custom-control .custom-control-label::after,\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item .custom-control .custom-control-input::after {\n          background-image: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 8 8\'%3e%3cpath fill=\'%23fff\' d=\'M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z\'/%3e%3c/svg%3e"); }\n      .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.highlighted {\n        background-color: #41b0ee;\n        color: white; }\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.highlighted .custom-control .custom-control-label {\n          color: white; }\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.highlighted.selected {\n          background-color: #007ac7;\n          color: white; }\n          .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.highlighted.selected .custom-control .custom-control-label::before,\n          .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.highlighted.selected .custom-control .custom-control-input::before {\n            color: white;\n            border-color: white; }\n      .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.selected {\n        background-color: white;\n        color: #007ac7; }\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.selected .custom-control .custom-control-label::before,\n        .custom-dropdown > .custom-dropdown-menu > .custom-dropdown-item.selected .custom-control .custom-control-input::before {\n          color: white;\n          border-color: #007ac7;\n          background-color: #007ac7; }\n  .custom-dropdown.disabled {\n    pointer-events: none; }\n    .custom-dropdown.disabled > .dropdown-label {\n      color: #adadad; }\n    .custom-dropdown.disabled > .custom-dropdown-toggle {\n      border-color: #adadad;\n      background-color: #f8f8f8;\n      cursor: default; }\n      .custom-dropdown.disabled > .custom-dropdown-toggle > .title {\n        color: #adadad; }\n      .custom-dropdown.disabled > .custom-dropdown-toggle > .right-items > .dropdown-icon-holder > svg {\n        fill: #adadad; }\n      .custom-dropdown.disabled > .custom-dropdown-toggle.more {\n        border-color: transparent; }\n        .custom-dropdown.disabled > .custom-dropdown-toggle.more:hover {\n          background-color: #f8f8f8; }\n          .custom-dropdown.disabled > .custom-dropdown-toggle.more:hover > .right-items > .dropdown-icon-holder > svg {\n            fill: #adadad; }\n\n.form-control.disabled {\n  border-color: #adadad;\n  color: #adadad;\n  background-color: white; }\n\n.dropdown-label.disabled {\n  color: #adadad; }\n\n.alert {\n  padding: 0px 2px;\n  margin: 0; }\n  .alert.alert-danger {\n    color: #d81a1a;\n    background: none;\n    border: none;\n    border-radius: 0px;\n    width: 100%; }\n\n/* clears the \'X\' from Internet Explorer */\ninput[type="search"]::-ms-clear {\n  display: none;\n  width: 0;\n  height: 0; }\n\ninput[type="search"]::-ms-reveal {\n  display: none;\n  width: 0;\n  height: 0; }\n\n/* clears the \'X\' from Chrome */\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  display: none; }\n',""])},786:function(e,o){e.exports='<hr>\n<p>title: Dropdown\ncomponentid: component-dropdown\nvariantid: default</p>\n<h2 id="guid-dropdown-guid-default-component-react">guid: &#39;dropdown-guid-default-component-react&#39;</h2>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: Dropdown Component\nComponent: &quot;DropDown&quot;\nSelector: &quot;&lt;DropDown/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/DropDown&quot;\nType: Form Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component supports customization and configurations. The component name is <code>DropDown</code> and the selector is <code>&lt;DropDown/&gt;</code>.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;DropDown\n    list={this.state.list}\n    selectedValue={this.state.selectedValue}\n    onChange={(value: any) =&gt; { this.setState({ selectedValue: value }) }}\n/&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Descrition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>selectedValue</td>\n<td><code>Array&lt;DropdownItem&gt; | DropDownItem</code> <sup>1</sup></td>\n<td>an array of the currently selected dropdown item(s)</td>\n</tr>\n<tr>\n<td>list</td>\n<td><code>Array&lt;DropdownItem&gt;</code> <sup>1</sup></td>\n<td>an array of all the dropdown items to display</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>(value: any) =&gt; void</code></td>\n<td>a callback passing the updated selectedValue list (multi) or item. In <code>native</code> mode the calback is the native onChange event</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>custom class</td>\n</tr>\n<tr>\n<td>label?</td>\n<td><code>string</code></td>\n<td>optional label to display above the dropdown</td>\n</tr>\n<tr>\n<td>placeholder?</td>\n<td><code>string</code></td>\n<td>optional text to display inside the toggle button when no item selected</td>\n</tr>\n<tr>\n<td>error?</td>\n<td><code>string</code></td>\n<td>optional error string to be displayed under the dropdown</td>\n</tr>\n<tr>\n<td>native?</td>\n<td><code>boolean</code></td>\n<td>a mobile friendly version using native <code>&lt;select&gt;</code> html element</td>\n</tr>\n<tr>\n<td>searchable?</td>\n<td><code>boolean</code></td>\n<td>enables searching</td>\n</tr>\n<tr>\n<td>searchPlaceholder?</td>\n<td><code>string</code></td>\n<td>optional text to display inside the empty search bar</td>\n</tr>\n<tr>\n<td>multi?</td>\n<td><code>boolean</code></td>\n<td>enables selecting multiple choices</td>\n</tr>\n<tr>\n<td>clearable?</td>\n<td><code>boolean</code></td>\n<td>enables clearning the value, ignored if <code>multi</code> is enabled</td>\n</tr>\n<tr>\n<td>disabled?</td>\n<td><code>boolean</code></td>\n<td>disabled status</td>\n</tr>\n<tr>\n<td>more?</td>\n<td><code>boolean</code></td>\n<td>version of the component with a more menu button alligned to the right</td>\n</tr>\n</tbody></table>\n<h2 id="footnote">Footnote</h2>\n<ol>\n<li><code>list</code> items has an exported interface named <code>DropdownItem</code><pre><code class="language-javascript">{\n   label = string,\n   value = any\n}</code></pre>\n</li>\n</ol>\n'}}]);