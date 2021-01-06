import React from "react";
import classnames from "classnames";
import { CodeSnippet } from "./CodeSnippet";

export type BackgroundTheme = "primary" | "secondary" | "danger" | "warning" | "success" | "dark" | "light";

export interface DocsPlaygroundProps {
    className?: string;
    example?: React.ReactNode;
    code?: React.ReactNode;
    controls?: React.ReactNode;
    exampleTheme?: BackgroundTheme;
}

const DocsPlayground: React.FC<DocsPlaygroundProps> = (props: DocsPlaygroundProps) => {
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

            {props.controls && <h4 className="apis-title">Try these props</h4>}
            {
                [
                    <div className={classnames("example", { [`bg-${props.exampleTheme}`]: props.exampleTheme })}>
                        <div className="content">{props.example}</div>
                        {props.exampleTheme && (
                            <div className={classnames("footnote", { "text-light": props.exampleTheme.includes("dark") })}>
                                <small>* This background is only to demonstrate the component's theme in its potential environement. It will not be applied by the component.</small>
                            </div>
                        )}
                    </div>,
                    <CodeSnippet angular language={"jsx"}>
                        {props.code}
                    </CodeSnippet>,
                ][activeTab]
            }

            {props.controls && <div className="controls">{props.controls}</div>}
        </div>
    );
};

export default DocsPlayground;
