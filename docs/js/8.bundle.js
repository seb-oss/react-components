(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1031:function(e,t,n){"use strict";n.r(t);var a=n(36),o=n(0),r=n(845),s=n.n(r),i=(n(861),n(863),n(869),function(e){var t={direction:"horizontal",observer:!0,slidesPerView:1,mousewheel:!0,keyboard:!0,infinite:!1,navigation:!0,spaceBetween:1,grabCursor:!0,slidesToShow:1,slidesToScroll:1,autoplay:!!e.autoPlay,autoplaySpeed:e.autoPlaySpeed?e.autoPlaySpeed:3e3,afterChange:function(t){e.carouselChanged&&e.carouselChanged(t)}};return o.createElement(s.a,a.a({},t),e.list&&e.list.map(function(t,n){return o.createElement("div",{key:n,className:"custom-carousel"},o.createElement("div",{className:"carousel-slide"+(e.className?" "+e.className:""),style:{height:e.height||300}},t.image&&o.createElement("div",{className:"carousel-img",style:{backgroundSize:e.backgroundPlacement||"cover",backgroundImage:"url("+t.image+")"}}),t.title&&o.createElement("div",{className:"title"},t.title),t.desc&&o.createElement("div",{className:"desc"}," ",t.desc," ")))}))}),l=n(398),c=n(399).default,d=n(871),u=n(429),p=n(872),g=n(873),m=function(e){function t(t){var n=e.call(this,t)||this;return n.state={list:[{title:"Ipsum consequat nisl",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",image:u},{title:"Interdum velit euismod",desc:"Lectus quam id leo in",image:p},{title:"Risus in hendrerit",desc:"Augue eget arcu dictum varius",image:g}]},n}return a.b(t,e),t.prototype.render=function(){var e=Object(l.a)(this.props.location.search,"mode");return o.createElement("div",{className:"route-template "+("dl"===e||"DL"===e?"brief":"")},o.createElement("div",{className:"info-holder"},o.createElement("div",{className:"info"},o.createElement("div",{className:"md-file"},o.createElement(c,{innerHTML:!0},d))),o.createElement("div",{className:"info"},o.createElement("h2",null,"Output"),o.createElement("p",null,"Here are sample outputs"),o.createElement("div",{className:"result wide"},o.createElement(i,{list:this.state.list,carouselChanged:function(){console.log("changed")},autoPlay:!0})))))},t}(o.Component);t.default=m},398:function(e,t,n){"use strict";function a(e,t){var n=RegExp("[?&]"+t+"=([^&]*)").exec(e);return n&&decodeURIComponent(n[1].replace(/\+/g," "))}n.d(t,"a",function(){return a})},429:function(e,t,n){e.exports=n.p+"assets/images/cat-pet-animal-1.jpeg"},869:function(e,t,n){var a=n(870);"string"==typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(58)(a,o);a.locals&&(e.exports=a.locals)},870:function(e,t,n){(e.exports=n(54)(!1)).push([e.i,".slick-slider .slick-list .slick-track .slick-slide .custom-carousel .carousel-slide {\n  position: relative; }\n  .slick-slider .slick-list .slick-track .slick-slide .custom-carousel .carousel-slide > .carousel-img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-position: center;\n    background-repeat: no-repeat; }\n  .slick-slider .slick-list .slick-track .slick-slide .custom-carousel .carousel-slide .carousel-slide {\n    overflow-y: hidden;\n    background-color: rgba(0, 0, 0, 0.6);\n    position: relative; }\n  .slick-slider .slick-list .slick-track .slick-slide .custom-carousel .carousel-slide > .title {\n    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%);\n    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%);\n    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cc000000', endColorstr='#00000000', GradientType=0);\n    position: absolute;\n    padding: 20px;\n    top: 0;\n    width: 100%;\n    text-align: left;\n    padding-left: 5px;\n    color: #fff;\n    border: none; }\n  .slick-slider .slick-list .slick-track .slick-slide .custom-carousel .carousel-slide > .desc {\n    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.8) 100%);\n    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.8) 100%);\n    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.8) 100%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#cc000000', GradientType=0);\n    color: #fff;\n    width: 100%;\n    font-size: 14px;\n    text-align: left;\n    padding: 5px 5px 20px 5px;\n    word-wrap: break-word;\n    position: absolute;\n    bottom: 0;\n    margin: 0px;\n    border: none; }\n\n.slick-slider .slick-arrow {\n  z-index: 2;\n  width: 27px;\n  height: 44px;\n  background-repeat: no-repeat; }\n  .slick-slider .slick-arrow::before {\n    display: none; }\n  .slick-slider .slick-arrow.slick-prev {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n    left: 10px; }\n  .slick-slider .slick-arrow.slick-next {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n    right: 10px; }\n  .slick-slider .slick-arrow.slick-disabled {\n    opacity: 0.35; }\n",""])},871:function(e,t){e.exports='<hr>\n<p>title: Carousel\ncomponentid: component-carousel\nvariantid: default</p>\n<h2 id="guid-carousel-guid-default-component-react">guid: &#39;carousel-guid-default-component-react&#39;</h2>\n<h2 id="element-name">Element name</h2>\n<pre><code class="language-javascript">Name: Carousel Component\nComponent: &quot;Carousel&quot;\nSelector: &quot;&lt;Carousel/&gt;&quot;\nImport: &quot;@sebgroup/react-components/dist/Carousel&quot;\nType: UI Component</code></pre>\n<h2 id="element-information">Element information</h2>\n<p>This React component is based on <code>react-slick</code>. Supports customization and configurations. The component name is <code>Carousel</code> and the selector is <code>&lt;Carousel/&gt;</code>.</p>\n<h2 id="basic-use">Basic use</h2>\n<pre><code class="language-html">&lt;Carousel list={this.state.list} /&gt;</code></pre>\n<h2 id="properties">Properties</h2>\n<p>These are the current available properties:</p>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Type</th>\n<th>Descrition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>list</td>\n<td><code>Array&lt;CarouselItem&gt;</code> <sup>1</sup></td>\n<td>an array of CarouselItem</td>\n</tr>\n<tr>\n<td>carouselChanged</td>\n<td><code>(index: number) =&gt; void</code></td>\n<td>carousel change event</td>\n</tr>\n<tr>\n<td>className?</td>\n<td><code>string</code></td>\n<td>custom class</td>\n</tr>\n<tr>\n<td>height?</td>\n<td><code>number</code></td>\n<td>height of carousel</td>\n</tr>\n<tr>\n<td>autoPlay?</td>\n<td><code>boolean</code></td>\n<td>enable auto change mode. default is <code>false</code></td>\n</tr>\n<tr>\n<td>autoPlaySpeed?</td>\n<td><code>number</code></td>\n<td>autoplay speed in milliseconds (default: 3000)</td>\n</tr>\n<tr>\n<td>backgroundPlacement?</td>\n<td><code>string</code></td>\n<td>it is based on css background, default is <code>cover</code></td>\n</tr>\n</tbody></table>\n<h2 id="reference">Reference</h2>\n<p>This component is a wrapper around <a href="https://www.npmjs.com/package/react-slick">react-slick</a> which uses <a href="https://www.npmjs.com/package/slick-carousel">slick-carousel</a></p>\n<h2 id="footnote">Footnote</h2>\n<ol>\n<li><code>list</code> items has an exported interface named <code>CarouselItem</code><pre><code class="language-javascript">{\n title?: string;\n desc?: string;\n image?: string;\n}</code></pre>\n</li>\n</ol>\n'},872:function(e,t,n){e.exports=n.p+"assets/images/cat-pet-animal-2.jpg"},873:function(e,t,n){e.exports=n.p+"assets/images/cat-pet-animal-3.jpg"}}]);