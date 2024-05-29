"use strict";(self.webpackChunkreact_components_docs=self.webpackChunkreact_components_docs||[]).push([[9743],{14358:function(r,e,n){n.r(e),n.d(e,{default:function(){return u}});var t=n(2634),o=n(88863),a=n(27378),s=function(r){function e(e){var n;return(n=r.call(this,e)||this).state={hasError:!1},n}return(0,o.Z)(e,r),e.getDerivedStateFromError=function(){return{hasError:!0}},e.prototype.render=function(){return this.state.hasError?this.props.errorView:this.props.children},e}(a.Component),c=n(91448),i=n(58128),u=function(){var r=(0,c.b)([{key:"controls",items:[{key:"hasError",label:"hasError",controlType:"Checkbox"}]}]),e=r.renderForm,n=r.state.controls;return a.createElement(t.Z,{mainFile:i,example:a.createElement("div",{className:"w-100 d-flex justify-content-center"},a.createElement(s,{errorView:a.createElement(a.Fragment,null,"error view")},n.hasError?a.createElement("div",null,new Error):a.createElement("div",null,"lorem ipsum"))),code:"<ErrorBoundary errorView={<>error view</>}>\n    <div>lorem ipsum</div>\n</ErrorBoundary>",controls:a.createElement(a.Fragment,null,e())})}},58128:function(r,e,n){n.r(e),e.default='import React from "react";\n\ninterface ErrorBoundaryProps {\n    /** The error view to be shown */\n    errorView: React.ReactNode;\n}\n\ninterface ErrorBoundaryState {\n    hasError: boolean;\n}\n\nexport class ErrorBoundary extends React.Component<React.PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {\n    constructor(props: ErrorBoundaryProps) {\n        super(props);\n        this.state = { hasError: false };\n    }\n\n    static getDerivedStateFromError() {\n        return { hasError: true };\n    }\n\n    render() {\n        if (this.state.hasError) {\n            return this.props.errorView;\n        }\n\n        return this.props.children;\n    }\n}\n'}}]);
//# sourceMappingURL=component---src-pages-docs-error-boundary-tsx-fa0b9bf88fb3f6bed6f3.js.map