(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1046:function(t,e,n){"use strict";n.r(e);var s=n(36),a=n(0),o=n(877),r=(n(972),n(974),function(t){function e(e){return t.call(this,e)||this}return s.b(e,t),e.prototype.renderChart=function(t){switch(t){case"line":return a.createElement(o.e,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"bar":return a.createElement(o.a,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"horizontalBar":return a.createElement(o.d,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"pie":return a.createElement(o.f,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"doughnut":return a.createElement(o.c,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"polar":return a.createElement(o.g,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"radar":return a.createElement(o.h,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"bubble":return a.createElement(o.b,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});case"scatter":return a.createElement(o.i,{data:this.props.data,options:this.props.options,onElementsClick:this.props.onClick});default:return a.createElement("div",null,"Unknown chart type")}},e.prototype.render=function(){return a.createElement("div",{className:"chart-wrapper "+(this.props.className?this.props.className:"")},this.renderChart(this.props.chartType))},e}(a.Component)),i=n(398),c=n(399).default,l=n(980),d=function(t){function e(e){return t.call(this,e)||this}return s.b(e,t),e.prototype.randomScalingFactor=function(){return Math.round(100*Math.random())},e.prototype.render=function(){var t=Object(i.a)(this.props.location.search,"mode"),e={labels:["January","February","March","April","May","June","July"],datasets:[{label:"My First dataset",data:[65,59,80,81,56,55,40],backgroundColor:"rgba(255,99,132,0.5)"}]},n={datasets:[{data:[this.randomScalingFactor(),this.randomScalingFactor(),this.randomScalingFactor(),this.randomScalingFactor()],backgroundColor:["#ff6384","#36a2eb","#cc65fe","#ffce56"],label:"Pie Dataset 1"}],labels:["value 1","value 2","value 3","value 4"]},s={responsive:!0,maintainAspectRatio:!1};return a.createElement("div",{className:"route-template "+("dl"===t||"DL"===t?"brief":"")},a.createElement("div",{className:"info-holder"},a.createElement("div",{className:"info"},a.createElement("div",{className:"md-file"},a.createElement(c,{innerHTML:!0},l))),a.createElement("div",{className:"info"},a.createElement("h2",null,"Output"),a.createElement("p",null,"Here are sample outputs pie chart"),a.createElement("div",{className:"result wide chart"},a.createElement(r,{chartType:"pie",data:n,options:s,onClick:function(t){console.log("On cliking on chart",t)}})),a.createElement("p",null,"Here are sample outputs line chart"),a.createElement("div",{className:"result wide chart"},a.createElement(r,{chartType:"line",data:e,options:s,onClick:function(t){console.log("On cliking on chart",t)}})),a.createElement("p",null,"Here are sample outputs bar chart"),a.createElement("div",{className:"result wide chart"},a.createElement(r,{chartType:"bar",data:e,options:s})),a.createElement("p",null,"Here are sample outputs bar chart"),a.createElement("div",{className:"result wide chart"},a.createElement(r,{chartType:"line",data:e,options:{responsive:!0,maintainAspectRatio:!1,annotation:{annotations:[{drawTime:"afterDraw",id:"a-line-1",type:"line",mode:"vertical",scaleID:"y-axis-0",value:"25",borderColor:"#406980",borderWidth:2,label:{fontStyle:"normal",fontSize:"14",backgroundColor:"#406980",position:"top",content:"Annotaion",enabled:!0}}]}}})))))},e}(a.Component);e.default=d},398:function(t,e,n){"use strict";function s(t,e){var n=RegExp("[?&]"+e+"=([^&]*)").exec(t);return n&&decodeURIComponent(n[1].replace(/\+/g," "))}n.d(e,"a",function(){return s})},879:function(t,e,n){var s={"./af":447,"./af.js":447,"./ar":448,"./ar-dz":449,"./ar-dz.js":449,"./ar-kw":450,"./ar-kw.js":450,"./ar-ly":451,"./ar-ly.js":451,"./ar-ma":452,"./ar-ma.js":452,"./ar-sa":453,"./ar-sa.js":453,"./ar-tn":454,"./ar-tn.js":454,"./ar.js":448,"./az":455,"./az.js":455,"./be":456,"./be.js":456,"./bg":457,"./bg.js":457,"./bm":458,"./bm.js":458,"./bn":459,"./bn.js":459,"./bo":460,"./bo.js":460,"./br":461,"./br.js":461,"./bs":462,"./bs.js":462,"./ca":463,"./ca.js":463,"./cs":464,"./cs.js":464,"./cv":465,"./cv.js":465,"./cy":466,"./cy.js":466,"./da":467,"./da.js":467,"./de":468,"./de-at":469,"./de-at.js":469,"./de-ch":470,"./de-ch.js":470,"./de.js":468,"./dv":471,"./dv.js":471,"./el":472,"./el.js":472,"./en-SG":473,"./en-SG.js":473,"./en-au":474,"./en-au.js":474,"./en-ca":475,"./en-ca.js":475,"./en-gb":476,"./en-gb.js":476,"./en-ie":477,"./en-ie.js":477,"./en-il":478,"./en-il.js":478,"./en-nz":479,"./en-nz.js":479,"./eo":480,"./eo.js":480,"./es":481,"./es-do":482,"./es-do.js":482,"./es-us":483,"./es-us.js":483,"./es.js":481,"./et":484,"./et.js":484,"./eu":485,"./eu.js":485,"./fa":486,"./fa.js":486,"./fi":487,"./fi.js":487,"./fo":488,"./fo.js":488,"./fr":489,"./fr-ca":490,"./fr-ca.js":490,"./fr-ch":491,"./fr-ch.js":491,"./fr.js":489,"./fy":492,"./fy.js":492,"./ga":493,"./ga.js":493,"./gd":494,"./gd.js":494,"./gl":495,"./gl.js":495,"./gom-latn":496,"./gom-latn.js":496,"./gu":497,"./gu.js":497,"./he":498,"./he.js":498,"./hi":499,"./hi.js":499,"./hr":500,"./hr.js":500,"./hu":501,"./hu.js":501,"./hy-am":502,"./hy-am.js":502,"./id":503,"./id.js":503,"./is":504,"./is.js":504,"./it":505,"./it-ch":506,"./it-ch.js":506,"./it.js":505,"./ja":507,"./ja.js":507,"./jv":508,"./jv.js":508,"./ka":509,"./ka.js":509,"./kk":510,"./kk.js":510,"./km":511,"./km.js":511,"./kn":512,"./kn.js":512,"./ko":513,"./ko.js":513,"./ku":514,"./ku.js":514,"./ky":515,"./ky.js":515,"./lb":516,"./lb.js":516,"./lo":517,"./lo.js":517,"./lt":518,"./lt.js":518,"./lv":519,"./lv.js":519,"./me":520,"./me.js":520,"./mi":521,"./mi.js":521,"./mk":522,"./mk.js":522,"./ml":523,"./ml.js":523,"./mn":524,"./mn.js":524,"./mr":525,"./mr.js":525,"./ms":526,"./ms-my":527,"./ms-my.js":527,"./ms.js":526,"./mt":528,"./mt.js":528,"./my":529,"./my.js":529,"./nb":530,"./nb.js":530,"./ne":531,"./ne.js":531,"./nl":532,"./nl-be":533,"./nl-be.js":533,"./nl.js":532,"./nn":534,"./nn.js":534,"./pa-in":535,"./pa-in.js":535,"./pl":536,"./pl.js":536,"./pt":537,"./pt-br":538,"./pt-br.js":538,"./pt.js":537,"./ro":539,"./ro.js":539,"./ru":540,"./ru.js":540,"./sd":541,"./sd.js":541,"./se":542,"./se.js":542,"./si":543,"./si.js":543,"./sk":544,"./sk.js":544,"./sl":545,"./sl.js":545,"./sq":546,"./sq.js":546,"./sr":547,"./sr-cyrl":548,"./sr-cyrl.js":548,"./sr.js":547,"./ss":549,"./ss.js":549,"./sv":550,"./sv.js":550,"./sw":551,"./sw.js":551,"./ta":552,"./ta.js":552,"./te":553,"./te.js":553,"./tet":554,"./tet.js":554,"./tg":555,"./tg.js":555,"./th":556,"./th.js":556,"./tl-ph":557,"./tl-ph.js":557,"./tlh":558,"./tlh.js":558,"./tr":559,"./tr.js":559,"./tzl":560,"./tzl.js":560,"./tzm":561,"./tzm-latn":562,"./tzm-latn.js":562,"./tzm.js":561,"./ug-cn":563,"./ug-cn.js":563,"./uk":564,"./uk.js":564,"./ur":565,"./ur.js":565,"./uz":566,"./uz-latn":567,"./uz-latn.js":567,"./uz.js":566,"./vi":568,"./vi.js":568,"./x-pseudo":569,"./x-pseudo.js":569,"./yo":570,"./yo.js":570,"./zh-cn":571,"./zh-cn.js":571,"./zh-hk":572,"./zh-hk.js":572,"./zh-tw":573,"./zh-tw.js":573};function a(t){var e=o(t);return n(e)}function o(t){var e=s[t];if(!(e+1)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e}a.keys=function(){return Object.keys(s)},a.resolve=o,t.exports=a,a.id=879},972:function(t,e,n){var s=n(973);"string"==typeof s&&(s=[[t.i,s,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(58)(s,a);s.locals&&(t.exports=s.locals)},973:function(t,e,n){(t.exports=n(54)(!1)).push([t.i,".chart-wrapper {\n  position: relative;\n  height: 100%;\n  width: 100%; }\n",""])},980:function(t,e){t.exports='<hr>\n<p>title: Chart\ncomponentid: component-chart\nvariantid: default</p>\n<h2 id="guid-chart-guid-default-component-react">guid: &#39;chart-guid-default-component-react&#39;</h2>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: Chart Component\nModule: &quot;Chart&quot;\nSelector: &quot;&lt;Chart/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/Chart&quot;\nType: Other Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component is based on <code>Chart.js</code> with customization and configurations that comes with it. The module name of this component is <code>Chart</code> and the selector is <code>&lt;Chart/&gt;</code>. Please refer to their documantation regarding how to pass datasets, options, labels and so on.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;Chart\n    chartType=&quot;line&quot;\n    data={data}\n    options={options}\n/&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Descrition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>chartType</td>\n<td><code>string</code></td>\n<td>type of charts based on chat.js<sup>1</sup></td>\n</tr>\n<tr>\n<td>data</td>\n<td><code>any</code></td>\n<td>chart.js data object</td>\n</tr>\n<tr>\n<td>options?</td>\n<td><code>any</code></td>\n<td>chart.js options object</td>\n</tr>\n<tr>\n<td>onClick?</td>\n<td><code>(event: any) =&gt; void</code></td>\n<td>Click action</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>custom class</td>\n</tr>\n</tbody></table>\n<h2 id="reference">Reference</h2>\n<p>This component is a wrapper around <a href="https://www.npmjs.com/package/react-chartjs-2">react-chartjs-2</a>, which itself is based on <a href="http://www.chartjs.org">chart.js</a>, and as chartjs configuration is extandable via plugins, we have implemented the annotations via <a href="https://www.npmjs.com/package/chartjs-plugin-annotation">chartjs-plugin-annotation</a>. Further you should be able to add more plugin and pass new configrations via <code>options</code> property</p>\n<h2 id="footnote">footnote</h2>\n<ol>\n<li>Supported charts: <code>line</code>, <code>bar</code>, <code>horizontalBar</code>, <code>pie</code>, <code>doughnut</code>, <code>polar</code>, <code>radar</code>, <code>bubble</code>, <code>scatter</code></li>\n</ol>\n'}}]);