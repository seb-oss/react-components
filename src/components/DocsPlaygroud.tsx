import React from "react";
import classnames from "classnames";
import { CodeSnippet } from "./CodeSnippet";

export interface DocsPlaygroundProps {
    className?: string;
    example?: React.ReactNode;
    code?: React.ReactNode;
    controls?: React.ReactNode;
}

const DocsPlayground: React.FC<DocsPlaygroundProps> = React.memo((props: DocsPlaygroundProps) => {
    const navs: string[] = ["Component", "Code"];
    const [activeTab, setActiveTab] = React.useState<number>(0);

    const switchTab = React.useCallback((index: number): void => {
        if (!isNaN(index)) {
            setActiveTab(index);
        }
    }, []);

    return (
        <div className={classnames("playground card", props.className)}>
            <nav className="nav">
                {navs.map((item: string, index: number) => (
                    <a key={index} className={classnames("nav-link", { active: activeTab === index })} onClick={() => switchTab(index)} data-value={index}>
                        {item}
                    </a>
                ))}
            </nav>

            <h4 className="apis-title">Try it out</h4>
            {
                [
                    <div className="example">{props.example}</div>,
                    <CodeSnippet fillMode language={"jsx"}>
                        {props.code}
                    </CodeSnippet>,
                ][activeTab]
            }

            <div className="controls">{props.controls}</div>
        </div>
    );
});

export default DocsPlayground;
