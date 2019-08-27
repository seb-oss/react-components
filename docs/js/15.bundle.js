(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1041:function(e,t,n){"use strict";n.r(t);var r=n(36),a=n(0),c=(n(993),a.memo(function(e){return a.createElement("div",{className:"custom-breadcrumb"+(e.className?" "+e.className:"")},a.createElement("nav",{"aria-label":"breadcrumb"},a.createElement("ol",{className:"breadcrumb"},e.list.map(function(t,n){return a.createElement("li",{key:n,className:"breadcrumb-item"+(n===e.list.length-1?" active":""),onClick:function(){n!==e.list.length-1&&e.onClick&&e.onClick(n)}},t)}))))})),o=n(398),i=n(399).default,d=n(995),s=function(e){function t(t){var n=e.call(this,t)||this;return n.state={breadcrumbList:["First","Second","Third"]},n}return r.b(t,e),t.prototype.render=function(){var e=this,t=Object(o.a)(this.props.location.search,"mode");return a.createElement("div",{className:"route-template "+("dl"===t||"DL"===t?"brief":"")},a.createElement("div",{className:"info-holder"},a.createElement("div",{className:"info"},a.createElement("div",{className:"md-file"},a.createElement(i,{innerHTML:!0},d))),a.createElement("div",{className:"info"},a.createElement("h2",null,"Output"),a.createElement("p",null,"Here are sample outputs"),a.createElement("div",{className:"result"},a.createElement(c,{list:this.state.breadcrumbList,onClick:function(t){alert("Should navigate to "+e.state.breadcrumbList[t])}})))))},t}(a.Component);t.default=s},398:function(e,t,n){"use strict";function r(e,t){var n=RegExp("[?&]"+t+"=([^&]*)").exec(e);return n&&decodeURIComponent(n[1].replace(/\+/g," "))}n.d(t,"a",function(){return r})},993:function(e,t,n){var r=n(994);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(58)(r,a);r.locals&&(e.exports=r.locals)},994:function(e,t,n){(e.exports=n(54)(!1)).push([e.i,".custom-breadcrumb ol.breadcrumb li.breadcrumb-item {\n  font-size: 16px; }\n  .custom-breadcrumb ol.breadcrumb li.breadcrumb-item:not(.active) {\n    color: #0092E1;\n    cursor: pointer; }\n    .custom-breadcrumb ol.breadcrumb li.breadcrumb-item:not(.active):hover {\n      color: #05578c; }\n",""])},995:function(e,t){e.exports='<hr>\n<p>title: Breadcrumb\ncomponentid: component-breadcrumb\nvariantid: default</p>\n<h2 id="guid-breadcrumb-guid-default-component-react">guid: &#39;breadcrumb-guid-default-component-react&#39;</h2>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: Breadcrumb Component\nComponent: &quot;Breadcrumb&quot;\nSelector: &quot;&lt;Breadcrumb/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/Breadcrumb&quot;\nType: UI Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is <code>Breadcrumb</code> and the selector is <code>&lt;Breadcrumb/&gt;</code>.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;Breadcrumb\n    list={breadcrumbListObj}\n    onClick={clickHandler}\n/&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Descrition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>list</td>\n<td><code>Array&lt;string&gt;</code></td>\n<td>List of paths</td>\n</tr>\n<tr>\n<td>onClick</td>\n<td><code>(i: number) =&gt; void</code></td>\n<td>Click action passed the index of the tab</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>custom class</td>\n</tr>\n</tbody></table>\n'}}]);