import React from "react";
import { ParsedAccessorDeclaration } from "utils/api-parser";
import DocsPlayground, { DocsPlaygroundProps } from "./DocsPlaygroud";
import DocsAPI from "./DocsAPIs";

export interface DocsWrapperProps extends DocsPlaygroundProps {
    activeTab: number;
    inputs: Array<ParsedAccessorDeclaration>;
    note?: React.ReactNode;
}

const DocsWrapper: React.FC<DocsWrapperProps> = (props: DocsWrapperProps) => {
    return [<DocsPlayground example={props.example} code={props.code} controls={props.controls} />, <DocsAPI list={props.inputs} />, <div className="note">{props.code}</div>][props.activeTab];
};

export default DocsWrapper;
