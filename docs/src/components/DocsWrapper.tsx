import React from "react";
import { ParsedPropertyDeclartion } from "@utils/api-parser";
import DocsPlayground, { DocsPlaygroundProps } from "./DocsPlaygroud";
import DocsAPI from "./DocsAPIs";

export interface DocsWrapperProps extends DocsPlaygroundProps {
    activeTab: number;
    interfaces: Array<ParsedPropertyDeclartion>;
    note?: React.ReactNode;
}

const DocsWrapper: React.FC<DocsWrapperProps> = (props: DocsWrapperProps) => {
    // prettier-ignore
    return [
        <DocsPlayground example={props.example} code={props.code} controls={props.controls} />,
        <DocsAPI list={props.interfaces} />,
        <div className="note">{props.note}</div>
    ][props.activeTab];
};

export default DocsWrapper;
