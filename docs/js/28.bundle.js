(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1055:function(e,t,n){"use strict";n.r(t);var o=n(36),r=n(0),a=(n(775),function(e){return r.createElement("div",{className:"form-group text-area"+(e.className?" "+e.className:"")},r.createElement("div",{className:"input-field"+(e.error?" has-error":"")},e.label&&r.createElement("label",{className:"custom-label",htmlFor:e.name},e.label),r.createElement("textarea",{name:e.name,className:"form-control"+(e.resizable||void 0===e.resizable?" resizable":""),placeholder:e.placeHolder,maxLength:e.max,autoFocus:e.focus,readOnly:e.readonly,disabled:e.disabled,cols:e.cols,rows:e.rows,onChange:e.onChange,onKeyDown:e.onKeyDown,onKeyUp:e.onKeyUp,onKeyPress:e.onKeyPress,onFocus:e.onFocus,onBlur:e.onBlur,value:e.value,ref:e.reference}),r.createElement("div",{className:"alert alert-danger"},e.error)))}),d=n(398),l=n(399).default,c=n(777),s=function(e){function t(t){var n=e.call(this,t)||this;return n.state={textBoxValue:"",textBox2Value:""},n}return o.b(t,e),t.prototype.render=function(){var e=this,t=Object(d.a)(this.props.location.search,"mode");return r.createElement("div",{className:"route-template "+("dl"===t||"DL"===t?"brief":"")},r.createElement("div",{className:"info-holder"},r.createElement("div",{className:"info"},r.createElement("div",{className:"md-file"},r.createElement(l,{innerHTML:!0},c))),r.createElement("div",{className:"info"},r.createElement("h2",null,"Output"),r.createElement("p",null,"Here is the basic bootstrap one:"),r.createElement("div",{className:"result"},r.createElement(a,{name:"textArea",label:"Textarea label",placeHolder:"Text Area PlaceHolder",value:this.state.textBoxValue,cols:30,rows:5,onChange:function(t){e.setState({textBoxValue:t.target.value})}})),r.createElement("p",null,"Here is the input with error:"),r.createElement("div",{className:"result"},r.createElement(a,{name:"textInput",placeHolder:"Text Area PlaceHolder",error:"error msg will be shown here",cols:30,rows:5,value:this.state.textBox2Value,onChange:function(t){e.setState({textBox2Value:t.target.value})}})))))},t}(r.Component);t.default=s},398:function(e,t,n){"use strict";function o(e,t){var n=RegExp("[?&]"+t+"=([^&]*)").exec(e);return n&&decodeURIComponent(n[1].replace(/\+/g," "))}n.d(t,"a",function(){return o})},775:function(e,t,n){var o=n(776);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(58)(o,r);o.locals&&(e.exports=o.locals)},776:function(e,t,n){(e.exports=n(54)(!1)).push([e.i,".form-group.text-area > .input-field > textarea.form-control {\n  color: #444;\n  border-color: #adadad;\n  -webkit-transition: border 100ms;\n  -moz-transition: border 100ms;\n  -o-transition: border 100ms;\n  transition: border 100ms; }\n  .form-group.text-area > .input-field > textarea.form-control:not(.resizable) {\n    resize: none; }\n  .form-group.text-area > .input-field > textarea.form-control:not(:disabled):hover {\n    border-color: #41b0ee;\n    background-color: white; }\n  .form-group.text-area > .input-field > textarea.form-control:not(:disabled):focus {\n    border-color: #007AC7;\n    box-shadow: none;\n    background-color: white; }\n    .form-group.text-area > .input-field > textarea.form-control:not(:disabled):focus:active {\n      border-color: #007AC7;\n      box-shadow: none;\n      background-color: white; }\n\n.form-group.text-area > .input-field > .alert {\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n  background: transparent;\n  max-height: 0;\n  border: none;\n  border-radius: 0px;\n  overflow: hidden;\n  width: 100%;\n  -webkit-transition: opacity 200ms, padding 200ms, max-height 400ms;\n  -moz-transition: opacity 200ms, padding 200ms, max-height 400ms;\n  -o-transition: opacity 200ms, padding 200ms, max-height 400ms;\n  transition: opacity 200ms, padding 200ms, max-height 400ms; }\n  .form-group.text-area > .input-field > .alert.alert-danger {\n    color: #f03529; }\n\n.form-group.text-area > .input-field.has-error > textarea.form-control {\n  border-bottom: 1px solid #f03529; }\n  .form-group.text-area > .input-field.has-error > textarea.form-control:hover, .form-group.text-area > .input-field.has-error > textarea.form-control:focus, .form-group.text-area > .input-field.has-error > textarea.form-control:focus:active {\n    border-bottom: 2px solid #f03529; }\n\n.form-group.text-area > .input-field.has-error > .alert {\n  opacity: 1;\n  padding-top: 2px;\n  max-height: 100px; }\n",""])},777:function(e,t){e.exports='<hr>\n<p>title: TextArea\ncomponentid: component-textarea\nvariantid: default</p>\n<h2 id="guid-textarea-guid-default-component-react">guid: &#39;textarea-guid-default-component-react&#39;</h2>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: TextArea Component\nComponent: &quot;TextArea&quot;\nSelector: &quot;&lt;TextArea/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/TextArea&quot;\nType: Form Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component is based on SEB Bootstrap style. Supports customization and configurations. The component name is <code>TextArea</code> and the selector is <code>&lt;TextArea/&gt;</code>.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;TextArea\n    name=&quot;textArea&quot;\n    placeHolder=&quot;Text Area PlaceHolder&quot;\n    value={this.state.textBoxValue}\n    cols={30}\n    rows={5}\n    onChange={(event) =&gt; { this.setState({ textBoxValue: event.target.value }); }}\n/&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Descrition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>value</td>\n<td><code>string</code></td>\n<td>Value string</td>\n</tr>\n<tr>\n<td>name</td>\n<td><code>string</code></td>\n<td>Name string</td>\n</tr>\n<tr>\n<td>onChange</td>\n<td><code>(event: React.ChangeEvent&lt;HTMLTextAreaElement&gt;) =&gt; void</code></td>\n<td>On <code>&#39;change&#39;</code> event</td>\n</tr>\n<tr>\n<td>onKeyDown?</td>\n<td><code>(event: React.KeyboardEvent&lt;HTMLTextAreaElement&gt;) =&gt; void</code></td>\n<td>On <code>&#39;keydown&#39;</code> event</td>\n</tr>\n<tr>\n<td>onKeyUp?</td>\n<td><code>(event: React.KeyboardEvent&lt;HTMLTextAreaElement&gt;) =&gt; void</code></td>\n<td>On <code>&#39;keyup&#39;</code> event</td>\n</tr>\n<tr>\n<td>onKeyPress?</td>\n<td><code>(event: React.KeyboardEvent&lt;HTMLTextAreaElement&gt;) =&gt; void</code></td>\n<td>On <code>&#39;keypress&#39;</code> event</td>\n</tr>\n<tr>\n<td>onFocus?</td>\n<td><code>(event: React.FocusEvent&lt;HTMLTextAreaElement&gt;) =&gt; void</code></td>\n<td>On <code>&#39;focus&#39;</code> event</td>\n</tr>\n<tr>\n<td>onBlur?</td>\n<td><code>(event: React.FocusEvent&lt;HTMLTextAreaElement&gt;) =&gt; void</code></td>\n<td>On <code>&#39;blur&#39;</code> event</td>\n</tr>\n<tr>\n<td>cols?</td>\n<td><code>number</code></td>\n<td>Jumber of cols</td>\n</tr>\n<tr>\n<td>rows?</td>\n<td><code>number</code></td>\n<td>Number of rows</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>Custom class</td>\n</tr>\n<tr>\n<td>placeHolder?</td>\n<td><code>string</code></td>\n<td>Placeholder text</td>\n</tr>\n<tr>\n<td>label?</td>\n<td><code>string</code></td>\n<td>The small label on top of the textbox</td>\n</tr>\n<tr>\n<td>resizable?</td>\n<td><code>boolean</code></td>\n<td>Disable textarea resize. (default: <code>true</code>)</td>\n</tr>\n<tr>\n<td>error?</td>\n<td><code>string</code></td>\n<td>Error text</td>\n</tr>\n<tr>\n<td>disabled?</td>\n<td><code>boolean</code></td>\n<td>Disable textarea. (default: <code>false</code>)</td>\n</tr>\n<tr>\n<td>focus?</td>\n<td><code>boolean</code></td>\n<td>Enable autofocus. (default: <code>false</code>)</td>\n</tr>\n<tr>\n<td>readonly?</td>\n<td><code>boolean</code></td>\n<td>Make textatrea readonly. (default: <code>false</code>)</td>\n</tr>\n<tr>\n<td>max?</td>\n<td><code>number</code></td>\n<td>Input max length</td>\n</tr>\n<tr>\n<td>reference?</td>\n<td><code>React.RefObject&lt;HTMLTextAreaElement&gt;</code></td>\n<td>React Ref obj</td>\n</tr>\n</tbody></table>\n'}}]);