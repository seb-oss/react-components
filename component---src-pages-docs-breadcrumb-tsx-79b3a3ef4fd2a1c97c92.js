"use strict";(self.webpackChunkreact_components_docs=self.webpackChunkreact_components_docs||[]).push([[5692],{44018:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var r=a(27378),n=a(2634),l=a(30808),c=a(508),i=a.n(c),m=["onNavigate","light"],o=r.memo(r.forwardRef((function(e,t){var a=e.onNavigate,n=e.light,c=(0,l.Z)(e,m);return r.createElement("nav",Object.assign({},c,{ref:t,"aria-label":"breadcrumb"}),r.createElement("ol",{className:i()("breadcrumb",{"breadcrumb-light":n})},r.Children.map(c.children,(function(e,t){return r.isValidElement(e)?r.cloneElement(e,{onNavigate:a,defaultChecked:t===r.Children.toArray(c.children).length-1,"data-index-number":t}):e}))))}))),s=["href","title","onNavigate"],d=r.memo(r.forwardRef((function(e,t){var a=e.href,n=void 0===a?"#":a,c=e.title,m=e.onNavigate,o=(0,l.Z)(e,s),d=r.useState("breadcrumb-item"),u=d[0],h=d[1];return r.useEffect((function(){return h(i()(["breadcrumb-item",{active:o.defaultChecked},o.className]))}),[o.defaultChecked,o.className]),r.createElement("li",Object.assign({},o,{ref:t,className:u,"aria-current":o.defaultChecked?o["aria-current"]||"page":null}),r.createElement("a",{title:c,href:o.defaultChecked?null:n,"data-index-number":o["data-index-number"],onClick:o.defaultChecked?null:m},o.children))}))),u=a(91448),h=r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1.3em",fill:"currentColor",viewBox:"0 0 16 16",style:{verticalAlign:"baseline"},"aria-labelledby":"homeTitle",role:"img"},r.createElement("title",{id:"homeTitle"},"Home"),r.createElement("path",{d:"M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"})),p=a(73436),b=[a(44353)],f=function(){var e=(0,u.b)([{key:"controls",items:[{key:"light",label:"light",description:"Enable light mode",controlType:"Checkbox"}]}]),t=e.renderForm,a=e.state.controls;return r.createElement(n.Z,{exampleTheme:a.light?"dark":null,mainFile:p,importedFiles:b,example:r.createElement(o,{onNavigate:function(e){e.preventDefault(),alert("'"+e.currentTarget.title+"' clicked")},light:!!a.light},r.createElement(d,{title:"Home"},h),r.createElement(d,{title:"Users"},"Users"),r.createElement(d,{title:"Edit"},"Edit")),code:"<Breadcrumb onNavigate={(e) => e.preventDefault(); /** Or do something else */}>\n    <BreadcrumbItem>Home</BreadcrumbItem>\n    <BreadcrumbItem>Users</BreadcrumbItem>\n    <BreadcrumbItem>Edit</BreadcrumbItem>\n</Breadcrumb>",controls:t()})}},73436:function(e,t,a){a.r(t),t.default='import React from "react";\nimport classnames from "classnames";\nimport { BreadcrumbItemProps } from "./BreadcrumbItem";\n\nexport type BreadcrumbProps = JSX.IntrinsicElements["nav"] & {\n    /** Event handler triggered when one of the breadcrumb links is clicked */\n    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;\n    /** Enables the light version of the Breadcrumb */\n    light?: boolean;\n};\n\n/** A breadcrumb is a secondary navigation showing the website hierarchy. */\nexport const Breadcrumb: React.FC<BreadcrumbProps> = React.memo(\n    React.forwardRef(({ onNavigate, light, ...props }: BreadcrumbProps, ref: React.ForwardedRef<HTMLElement>) => {\n        return (\n            <nav {...props} ref={ref} aria-label="breadcrumb">\n                <ol className={classnames("breadcrumb", { "breadcrumb-light": light })}>\n                    {React.Children.map(props.children, (Child: React.ReactElement<BreadcrumbItemProps>, i: number) => {\n                        return React.isValidElement<BreadcrumbItemProps>(Child)\n                            ? React.cloneElement<any>(Child, {\n                                  onNavigate: onNavigate,\n                                  defaultChecked: i === React.Children.toArray(props.children).length - 1,\n                                  "data-index-number": i,\n                              })\n                            : Child;\n                    })}\n                </ol>\n            </nav>\n        );\n    })\n);\n'},44353:function(e,t,a){a.r(t),t.default='import React from "react";\nimport classnames from "classnames";\n\nexport type BreadcrumbItemProps = JSX.IntrinsicElements["li"] & {\n    /**\n     * The link to where it navigates to. This is used to enable openning the link in new tab.\n     * Additionally, you can access it in the event passed with the onNavigate callback\n     */\n    href?: string;\n    /** Event handler triggered when the link is clicked */\n    onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;\n};\n\nexport const BreadcrumbItem: React.FC<BreadcrumbItemProps> = React.memo(\n    React.forwardRef(({ href = "#", title, onNavigate, ...props }: BreadcrumbItemProps, ref: React.ForwardedRef<HTMLLIElement>) => {\n        const [className, setClassName] = React.useState<string>("breadcrumb-item");\n\n        React.useEffect(() => setClassName(classnames(["breadcrumb-item", { active: props.defaultChecked }, props.className])), [props.defaultChecked, props.className]);\n\n        return (\n            <li {...props} ref={ref} className={className} aria-current={props.defaultChecked ? props["aria-current"] || "page" : null}>\n                <a title={title} href={props.defaultChecked ? null : href} data-index-number={props["data-index-number"]} onClick={!props.defaultChecked ? onNavigate : null}>\n                    {props.children}\n                </a>\n            </li>\n        );\n    })\n);\n'}}]);
//# sourceMappingURL=component---src-pages-docs-breadcrumb-tsx-79b3a3ef4fd2a1c97c92.js.map