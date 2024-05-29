"use strict";(self.webpackChunkreact_components_docs=self.webpackChunkreact_components_docs||[]).push([[339],{8284:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var l=n(27378),o=n(2634),a=n(30808),s=n(75418),r=n(508),c=n.n(r),i=["wrapperProps","label","inline"],p=l.forwardRef((function(e,t){var n=e.wrapperProps,o=e.label,r=e.inline,p=(0,a.Z)(e,i),d=l.useState(p.id),m=d[0],u=d[1];return l.useEffect((function(){return u(p.id||(o?(0,s.k)("toggle-"):null))}),[p.id]),l.createElement("div",Object.assign({},n,{className:c()("rc","custom-control","custom-slide-toggle",{inline:r},null==n?void 0:n.className)}),l.createElement("input",Object.assign({},p,{ref:t,className:c()("custom-control-input",p.className),id:m,type:"checkbox"})),o&&l.createElement("label",{className:"custom-control-label",htmlFor:m},o))})),d=n(91448),m=function(){var e,t,a=n(20465),s="Lorem ipsum",r=[{key:"controls",items:[{key:"label",initialValue:s,label:"Label",placeholder:"Label",controlType:"Text"},{label:"Optional configurations",key:"checkboxes",controlType:"Option",options:[{label:"disabled",value:"disabled",key:"disabled"}]}]}],c=(0,d.b)(r),i=c.renderForm,m=c.state.controls;return l.createElement(o.Z,{mainFile:a,example:l.createElement(p,{name:"myToggle",disabled:(e="disabled",!!(null===(t=m.checkboxes)||void 0===t?void 0:t.find((function(t){return t===e})))),label:(null==m?void 0:m.label)||s}),code:'<Toggle name="myToggle" value={this.state.toggleValue} onChange={(event) => { this.setState({ toggleValue: event.target.checked }); }} />',controls:i()})}},20465:function(e,t,n){n.r(t),t.default='import React from "react";\nimport { randomId } from "@sebgroup/frontend-tools/randomId";\nimport classnames from "classnames";\nimport "./toggle.scss";\n\nexport type ToggleProps = JSX.IntrinsicElements["input"] & {\n    /** Element label */\n    label?: string;\n    /** to set if the toggle is inline with other element */\n    inline?: boolean;\n    /** properties that related to div element */\n    wrapperProps?: JSX.IntrinsicElements["div"];\n};\n/** A Slide toggle allows the user to change between two states */\nexport const Toggle: React.FC<ToggleProps> = React.forwardRef(({ wrapperProps, label, inline, ...props }: ToggleProps, ref: React.ForwardedRef<HTMLInputElement>) => {\n    const [id, setId] = React.useState<string>(props.id);\n\n    React.useEffect(() => setId(props.id || (!!label ? randomId("toggle-") : null)), [props.id]);\n\n    return (\n        <div {...wrapperProps} className={classnames("rc", "custom-control", "custom-slide-toggle", { inline }, wrapperProps?.className)}>\n            <input {...props} ref={ref} className={classnames("custom-control-input", props.className)} id={id} type="checkbox" />\n            {label && (\n                <label className="custom-control-label" htmlFor={id}>\n                    {label}\n                </label>\n            )}\n        </div>\n    );\n});\n'}}]);
//# sourceMappingURL=component---src-pages-docs-toggle-tsx-0e8a0dad86c2dfe2b2bb.js.map