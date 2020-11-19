import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";
import "./radio-button-style.scss";

export type RadioButtonProps<T = any> = Omit<JSX.IntrinsicElements["input"], "value" | "onChange"> & {
    condensed?: boolean;
    description?: string;
    inline?: boolean;
    label: string;
    onChange: (value: T, e?: React.ChangeEvent<HTMLInputElement>) => void;
    topLabel?: string;
    value: T;
};

export const RadioButton: React.FC<RadioButtonProps> = ({ condensed, description, inline, label, topLabel, onChange, className, ...props }: RadioButtonProps) => {
    const [id, setId] = React.useState<string>("");

    React.useEffect(() => setId(props.id || randomId("radiobtn-")), [props.id]);

    return (
        <div className={classnames("form-group custom-radio", className, { inline: inline, condensed: condensed })}>
            <div className="input-field">
                {topLabel && (
                    <label htmlFor={id} className="radio-toplabel">
                        {topLabel}
                    </label>
                )}

                <div className="custom-control">
                    <input
                        className="custom-control-input"
                        type="radio"
                        id={id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onChange(props.value, e);
                        }}
                        {...props}
                    />
                    <label className="custom-control-label" htmlFor={id}>
                        {label}
                        {description && <span className="radio-description">{description}</span>}
                    </label>
                </div>
            </div>
        </div>
    );
};
