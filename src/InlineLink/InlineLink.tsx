import * as React from "react";
import "./inline-link-style.scss";

interface InlineLinkProps {
    onClick?: () => void;
    className?: string;
    children?: any;
}

export const InlineLink: React.StatelessComponent<InlineLinkProps> = (props: InlineLinkProps): React.ReactElement<void> => {
    return (
        <span
            className={"custom-inline-link" + (props.className ? ` ${props.className}` : "")}
            onClick={() => { props.onClick && props.onClick(); }}
        >
            {props.children}
        </span>
    );
};
