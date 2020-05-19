import React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import classnames from "classnames";
import { Indicator, FeedbackIndicator } from "../FeedbackIndicator/FeedbackIndicator";
import "./checkbox.scss";

export type CheckBoxProps = JSX.IntrinsicElements["input"] & {
    /** Displays the checkbox inline */
    inline?: boolean;
    /** Description to be displayed underneath the checkbox element */
    description?: React.ReactNode;
    /** Label to be displayed next to the checkbox */
    label?: React.ReactNode;
    /** Div wrapper props */
    wrapperProps?: JSX.IntrinsicElements["div"];
    /** Indicator for error, warning or success */
    indicator?: Indicator;
};

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({ inline, description, label, wrapperProps, indicator, ...props }: CheckBoxProps): React.ReactElement<void> => {
    const [id, setId] = React.useState<string>(props.id);

    React.useEffect(() => setId(props.id || label ? props.id || randomId("checkbox-") : null), [props.id, label]);

    return (
        <div {...wrapperProps} className={classnames("seb", "checkbox", { inline }, wrapperProps?.className)}>
            <div className={classnames("custom-control", "custom-checkbox", { "custom-control-inline": inline }, { [`is-${indicator?.type}`]: indicator })}>
                <input {...props} type="checkbox" id={id} className={classnames("custom-control-input", props.className)} />
                {label && (
                    <label className="custom-control-label" htmlFor={id}>
                        <span className="checkbox-label">{label}</span>
                    </label>
                )}
                {description && <p className="checkbox-description">{description}</p>}
            </div>
            {indicator && <FeedbackIndicator {...indicator} />}
        </div>
    );
};

export { CheckBox };
