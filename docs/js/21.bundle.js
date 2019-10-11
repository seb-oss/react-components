(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{1023:function(e,t,n){var a=n(1024);"string"==typeof a&&(a=[[e.i,a,""]]);var d={insert:"head",singleton:!1};n(58)(a,d);a.locals&&(e.exports=a.locals)},1024:function(e,t,n){(e.exports=n(53)(!1)).push([e.i,".div-tag{background-position:center;background-repeat:no-repeat;background-size:cover}\n",""])},1025:function(e,t){e.exports='<hr>\n<p>title: Image\ncomponentid: component-image\nvariantid: default\nguid: &#39;image-guid-default-component-react&#39;</p>\n<hr>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: Image Holder Component\nComponent: &quot;Image&quot;\nSelector: &quot;&lt;Image/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/Image&quot;\nType: Other Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component supports customization and configurations. The component name is <code>Image</code> and the selector is <code>&lt;Image/&gt;</code>.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;Image\n    src={imgSrc}\n    width=&quot;100%&quot;\n    height=&quot;200px&quot;\n/&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>alt?</td>\n<td><code>string</code></td>\n<td>Image <code>alt</code> attribute</td>\n</tr>\n<tr>\n<td>ariaDescribedBy?</td>\n<td><code>string</code></td>\n<td>Element aria-describedby attribute</td>\n</tr>\n<tr>\n<td>ariaLabel?</td>\n<td><code>string</code></td>\n<td>Element aria-label attribute</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>custom class</td>\n</tr>\n<tr>\n<td>height</td>\n<td><code>string</code></td>\n<td>this is css height such as 100% or 300px</td>\n</tr>\n<tr>\n<td>id?</td>\n<td><code>string</code></td>\n<td>Element id</td>\n</tr>\n<tr>\n<td>onClick?</td>\n<td><code>(event: any) =&gt; void</code></td>\n<td>click action with event</td>\n</tr>\n<tr>\n<td>onLoad?</td>\n<td><code>(event: any) =&gt; void</code></td>\n<td>only works with <code>img</code> tag and returns when image is laoded</td>\n</tr>\n<tr>\n<td>src</td>\n<td><code>string</code></td>\n<td>your image source, it can be string or required then pass value</td>\n</tr>\n<tr>\n<td>useImgTag?</td>\n<td><code>boolean</code></td>\n<td>this will switch between <code>div</code> and <code>img</code> tags. default is <code>div</code></td>\n</tr>\n<tr>\n<td>width</td>\n<td><code>string</code></td>\n<td>this is css width such as 100% or 300px</td>\n</tr>\n</tbody></table>\n'},186:function(e,t,n){"use strict";n.r(t);var a=n(0),d=(n(1023),a.memo((function(e){return a.createElement(a.Fragment,null,!e.useImgTag&&a.createElement("div",{id:e.id,className:"div-tag"+(e.className?" "+e.className:""),style:{backgroundImage:"url("+e.src+")",width:e.width,height:e.height},onClick:e.onClick,"aria-label":e.ariaLabel,"aria-describedby":e.ariaDescribedBy,title:e.alt}),e.useImgTag&&a.createElement("img",{id:e.id,className:"img-tag"+(e.className?" "+e.className:""),src:e.src,alt:e.alt?e.alt:"",style:{width:e.width,height:e.height},onClick:e.onClick,onLoad:e.onLoad,"aria-label":e.ariaLabel,"aria-describedby":e.ariaDescribedBy}))}))),i=n(444).default,r=n(1025),o=n(607);t.default=function(){return a.createElement("div",{className:"route-template container"},a.createElement("div",{className:"info-holder"},a.createElement("div",{className:"info"},a.createElement("div",{className:"md-file"},a.createElement(i,{innerHTML:!0},r))),a.createElement("div",{className:"info"},a.createElement("h2",null,"Output"),a.createElement("p",null,'Here are sample outputs using "div" tag (default)'),a.createElement("div",{className:"result"},a.createElement(d,{src:o,width:"100%",height:"200px"})),a.createElement("p",null,'Here are sample outputs using "img" tag'),a.createElement("div",{className:"result"},a.createElement(d,{src:o,width:"100%",useImgTag:!0,height:"200px"})))))}},607:function(e,t,n){e.exports=n.p+"assets/images/cat-pet-animal-1.jpeg"}}]);