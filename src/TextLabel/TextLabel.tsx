import * as React from "react";
import "./text-label-style.scss";

export interface TextLabelProps {
    className?: string;
    label?: string;
    name?: string;
    value: string | number;
}

export const TextLabel: React.FunctionComponent<TextLabelProps> = React.memo((props: TextLabelProps): React.ReactElement<void> => {
    return (
        <div className={"text-label" + (props.className ? ` ${props.className}` : "")}>
            {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}
            <div className="custom-label-value">{props.value}</div>
        </div>
    );
});
