import * as React from "react";
import "./radio-group-style.scss";

export interface RadioListModel {
    value: any;
    group: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    list: Array<RadioListModel>;
    onChange: (value: any) => void;
    value: any;
    name?: string;
    className?: string;
    label?: string;
    error?: string;
    inline?: boolean;
    disableAll?: boolean;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (props: RadioGroupProps): React.ReactElement<void> => {
    let inputFieldClass: string = "input-field";
    if (props.error) { inputFieldClass += " has-error"; }
    if (props.inline) { inputFieldClass += " inline"; }

    return (
        <div className={"form-group radio-holder" + (props.className ? ` ${props.className}` : "")}>
            <div className={inputFieldClass}>
                {props.label && <label className="radio-group-label" htmlFor={props.name}>{props.label}</label>}

                {props.list && props.list.map((item, index) => {
                    const identifier: string = item.label.replace(" ", "_") + Math.floor(Math.random() * 100) + (new Date()).getTime();
                    return (
                        <div key={index} className="radio-item">
                            <label className="radio-label" htmlFor={identifier}>{item.label}</label>
                            <input
                                className="radio-input"
                                type="radio"
                                value={item.value}
                                name={item.group}
                                id={identifier}
                                checked={props.value === item.value}
                                disabled={props.disableAll || item.disabled}
                                onChange={(e) => { props.onChange(item.value); }}
                            />
                            <span className="checkmark" />
                            {item.description && <span className="radio-description">{item.description}</span>}
                        </div>
                    );
                })}
                {props.error && <div className={"alert alert-danger"}>{props.error}</div>}
            </div>
        </div>
    );
};
