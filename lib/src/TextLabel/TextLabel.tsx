import React from "react";
import "./text-label-style.scss";

export interface TextLabelProps {
    /** Optional custom class to append to the modal. */
    className?: string;
    /**	Optional id for the textLabel. */
    id?: string;
    /** Optional label for the textLabel can be a string or a template. */
    label?: string | React.ReactNode;
    /** Optional label for the text label can be a string or a template. */
    value: string | number | React.ReactNode;
}

/** A text label is a component to display value with label */
export const TextLabel: React.FC<TextLabelProps> = React.memo((props: TextLabelProps) => {
    return (
        <div className={"text-label" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            {props.label && <label className="custom-label">{props.label}</label>}
            <div className="custom-label-value">{props.value}</div>
        </div>
    );
});
