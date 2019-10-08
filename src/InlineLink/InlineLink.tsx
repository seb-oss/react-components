import * as React from "react";
import "./inline-link-style.scss";

export interface InlineLinkProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    onClick?: () => void;
}

export const InlineLink: React.NamedExoticComponent<InlineLinkProps> = React.memo((props: InlineLinkProps): React.ReactElement<void> => {
    return (
        <span
            className={"custom-inline-link" + (props.className ? ` ${props.className}` : "")}
            role="link"
            tabIndex={0}
            onClick={() => { props.onClick && props.onClick(); }}
            id={props.id}
        >
            {props.children}
        </span>
    );
});
