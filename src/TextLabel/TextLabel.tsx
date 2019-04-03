import * as React from "react";
import "./text-label-style.scss";

export interface TextLabelProps {
    value: string | number;
    name?: string;
    label?: string;
    className?: string;
}

export const TextLabel: React.FunctionComponent<TextLabelProps> = React.memo((props: TextLabelProps): React.ReactElement<void> => {
    return (
        <div className={"text-label" + (props.className ? ` ${props.className}` : "")}>
            {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}
            <div className="custom-label-value">{props.value}</div>
        </div>
    );
});
