import React from "react";
import "./text-label-style.scss";

export interface TextLabelProps {
    className?: string;
    id?: string;
    label?: string | React.ReactNode;
    value: string | number | React.ReactNode;
}

export const TextLabel: React.FC<TextLabelProps> = React.memo((props: TextLabelProps) => {
    return (
        <div className={"text-label" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            {props.label && <label className="custom-label">{props.label}</label>}
            <div className="custom-label-value">{props.value}</div>
        </div>
    );
});
