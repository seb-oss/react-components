import React from "react";
import classnames from "classnames";
import { Prism as Highlight } from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/esm/styles/prism/cb";
import FilesIcon from "../../static/icons/files.svg";
import CheckIcon from "../../static/icons/check.svg";
import "../styles/code-snippet.scss";

type CodeSnippetProps = JSX.IntrinsicElements["div"] & {
    angular?: boolean;
    language?: HighlightLanguage;
    showLineNumbers?: boolean;
};

export const CodeSnippet: React.FC<CodeSnippetProps> = React.memo(({ angular, language, showLineNumbers = true, ...props }: CodeSnippetProps) => {
    const [copied, setCopied] = React.useState<boolean>(false);
    const timer: React.MutableRefObject<any> = React.useRef();

    const copySnippet = (): void => {
        navigator.clipboard.writeText(props.children.toString()).then(() => {
            setCopied(true);
            timer.current = setTimeout(() => {
                if (timer.current) {
                    setCopied(false);
                    clearTimeout(timer.current);
                }
            }, 3000);
        });
    };

    return (
        <div {...props} className={classnames("code-snippet", { angular }, props.className)}>
            <Highlight language={language} style={theme} showLineNumbers={showLineNumbers}>
                {props.children}
            </Highlight>
            {copied ? (
                <div title="Copied!" className="snippet-icon check">
                    <CheckIcon />
                </div>
            ) : (
                <div title="Copy" className="snippet-icon copy" onClick={copySnippet}>
                    <FilesIcon />
                </div>
            )}
        </div>
    );
});
