import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";

import "./radio-button.scss";

export type RadioButtonProps<T = any> = Omit<JSX.IntrinsicElements["input"], "value"> & {
    /** set to condensed theme */
    condensed?: boolean;
    /** radio button description */
    description?: string;
    /** inline radio button */
    inline?: boolean;
    /** radio button label */
    label: React.ReactNode;
    /** radio button value */
    value: T;
};
/** A radio button allows a user to select a single item from a predefined list of options. Radio buttons are common to use in forms, i.e when you apply for a loan and need to enter "Yes" or "No". */
export const RadioButton: React.FC<RadioButtonProps> = ({ condensed, description, inline, label, className, ...props }: RadioButtonProps) => {
    const [id, setId] = React.useState<string>("");

    React.useEffect(() => setId(props.id || randomId("radiobtn-")), [props.id]);

    return (
        <div className={classnames("rc custom-radio custom-control", className, { inline: inline, condensed: condensed })}>
            <input className="custom-control-input" type="radio" id={id} {...props} />
            <label className="custom-control-label" htmlFor={id}>
                {label}
            </label>
            {description && <div className="radio-description">{description}</div>}
        </div>
    );
};
