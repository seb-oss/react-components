(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1058:function(e,t,r){"use strict";r.r(t);var a=r(36),n=r(0),c=r(787),d=r.n(c),p=(r(817),n.createElement("svg",{name:"calendar-alt",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},n.createElement("path",{d:"M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"}))),i=function(e){return n.createElement("div",{className:"form-group date-picker"+(e.className?" "+e.className:"")},n.createElement("div",{className:"input-field"+(e.error?" has-error":"")},e.label&&n.createElement("label",{className:"custom-label",htmlFor:name},e.label),n.createElement("div",{className:"date-wrapper"},n.createElement(d.a,{name:e.name,onChange:e.onChange,value:e.value,calendarIcon:p,clearIcon:null,disabled:e.disabled,minDate:e.minDate,maxDate:e.maxDate,locale:e.locale})),n.createElement("div",{className:"alert alert-danger"},e.error)))},o=r(398),l=r(399).default,s=r(819),m=function(e){function t(t){var r=e.call(this,t)||this;return r.state={datepicker:new Date},r}return a.b(t,e),t.prototype.render=function(){var e=this,t=Object(o.a)(this.props.location.search,"mode");return n.createElement("div",{className:"route-template "+("dl"===t||"DL"===t?"brief":"")},n.createElement("div",{className:"info-holder"},n.createElement("div",{className:"info"},n.createElement("div",{className:"md-file"},n.createElement(l,{innerHTML:!0},s))),n.createElement("div",{className:"info"},n.createElement("h2",null,"Output"),n.createElement("p",null,"Here are sample outputs"),n.createElement("div",{className:"result"},n.createElement(i,{name:"datepicker",value:this.state.datepicker,onChange:function(t){return e.setState({datepicker:t})},minDate:new Date("1970-10-10"),maxDate:new Date("2022-10-10"),label:"Datepicker label",placeHolder:"dd/mm/yyyy"})))))},t}(n.Component);t.default=m},398:function(e,t,r){"use strict";function a(e,t){var r=RegExp("[?&]"+t+"=([^&]*)").exec(e);return r&&decodeURIComponent(r[1].replace(/\+/g," "))}r.d(t,"a",function(){return a})},817:function(e,t,r){var a=r(818);"string"==typeof a&&(a=[[e.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};r(58)(a,n);a.locals&&(e.exports=a.locals)},818:function(e,t,r){(e.exports=r(54)(!1)).push([e.i,".form-group.date-picker .input-field .date-wrapper .react-date-picker,\n.form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed {\n  width: 100%; }\n  .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper,\n  .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper {\n    background: #ffffff;\n    width: 100%;\n    height: 42px;\n    min-width: 200px;\n    min-height: 40px;\n    color: #494949;\n    border-radius: 4px;\n    border-color: #cecece;\n    -webkit-transition: border-color 400ms;\n    -moz-transition: border-color 400ms;\n    -o-transition: border-color 400ms;\n    transition: border-color 400ms; }\n    .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper .react-date-picker__inputGroup,\n    .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper .react-date-picker__inputGroup {\n      height: 42px;\n      padding: 0 5px 0px 10px; }\n    .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper .react-date-picker__button,\n    .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper .react-date-picker__button {\n      width: 40px; }\n      .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper .react-date-picker__button > svg,\n      .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper .react-date-picker__button > svg {\n        fill: #41B0EE;\n        width: 16px;\n        height: 16px;\n        margin: auto; }\n      .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper .react-date-picker__button:hover, .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper .react-date-picker__button:active,\n      .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper .react-date-picker__button:hover,\n      .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper .react-date-picker__button:active {\n        background-color: #41B0EE; }\n        .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper .react-date-picker__button:hover > svg, .form-group.date-picker .input-field .date-wrapper .react-date-picker .react-date-picker__wrapper .react-date-picker__button:active > svg,\n        .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper .react-date-picker__button:hover > svg,\n        .form-group.date-picker .input-field .date-wrapper .react-date-picker.react-date-picker--closed .react-date-picker__wrapper .react-date-picker__button:active > svg {\n          fill: #ffffff; }\n\n.form-group.date-picker .input-field .date-wrapper .react-date-picker__calendar .react-calendar {\n  border-radius: 4px;\n  border: 1px solid #cecece; }\n\n.form-group.date-picker .input-field .date-wrapper .react-date-picker__calendar--above-label {\n  top: 100%; }\n\n.form-group.date-picker .input-field.has-error .date-wrapper .react-date-picker .react-date-picker__wrapper {\n  border: 1px solid #FF0000; }\n\n.form-group.date-picker .input-field.has-error .alert {\n  opacity: 1;\n  margin-top: -2px; }\n\n.form-group.date-picker .input-field .alert {\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n  -webkit-transition: opacity 200ms, margin 200ms;\n  -moz-transition: opacity 200ms, margin 200ms;\n  -o-transition: opacity 200ms, margin 200ms;\n  transition: opacity 200ms, margin 200ms; }\n  .form-group.date-picker .input-field .alert.alert-danger {\n    color: #FF0000;\n    background: none;\n    border: none;\n    border-radius: 0px;\n    width: 100%;\n    padding-left: 4px; }\n\n.form-group.date-picker .input-field label.custom-label:not(.form-check-label):not(.custom-checkbox):not(.custom-radio):not(.custom-control-label) {\n  display: block;\n  margin-bottom: 4px;\n  line-height: 1;\n  font-weight: normal;\n  font-size: 12px; }\n",""])},819:function(e,t){e.exports='<hr>\n<p>title: Datepicker\ncomponentid: component-datepicker\nvariantid: default</p>\n<h2 id="guid-datepicker-guid-default-component-react">guid: &#39;datepicker-guid-default-component-react&#39;</h2>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: Datepicker Component\nComponent: &quot;Datepicker&quot;\nSelector: &quot;&lt;Datepicker/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/Datepicker&quot;\nType: Form Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component is based on <code>react-date-picker</code>. Supports customization and configurations. The component name is <code>Datepicker</code> and the selector is <code>&lt;Datepicker/&gt;</code>.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;Datepicker\n    name=&quot;datepicker&quot;\n    value={this.state.datepicker}\n    onChange={(date) =&gt; this.setState({ datepicker: date })}\n    minDate={new Date(&#39;1970-10-10&#39;)}\n    maxDate={new Date()}\n/&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Descrition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>value</td>\n<td>js <code>Date</code> obj</td>\n<td>date obj</td>\n</tr>\n<tr>\n<td>name</td>\n<td><code>string</code></td>\n<td>name value</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>(event: any) =&gt; void</code></td>\n<td>on change event</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>custom class</td>\n</tr>\n<tr>\n<td>label?</td>\n<td><code>string</code></td>\n<td>label text</td>\n</tr>\n<tr>\n<td>placeHolder?</td>\n<td><code>string</code></td>\n<td>placeholder value</td>\n</tr>\n<tr>\n<td>readOnly?</td>\n<td><code>boolean</code></td>\n<td>default set to false</td>\n</tr>\n<tr>\n<td>disabled?</td>\n<td><code>boolean</code></td>\n<td>default set to false</td>\n</tr>\n<tr>\n<td>minDate</td>\n<td><code>Date</code></td>\n<td>min date range</td>\n</tr>\n<tr>\n<td>maxDate?</td>\n<td><code>Date</code></td>\n<td>max date range</td>\n</tr>\n<tr>\n<td>locale?</td>\n<td><code>string</code></td>\n<td>can be any IETF language tag. defaults to user&#39;s browser settings.</td>\n</tr>\n</tbody></table>\n<h2 id="reference">Reference</h2>\n<p>This component is a wrapper around <a href="https://www.npmjs.com/package/react-date-picker">react-date-picker</a></p>\n'}}]);