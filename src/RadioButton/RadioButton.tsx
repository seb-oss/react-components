import * as React from "react";
import "./radio-button-style.scss";

const randomId = (): string => String((Math.random() * 1000) + (new Date()).getTime());

export interface RadioButtonProps {
    onChange: (value: any) => void;
    value: any;
    radioValue: any;
    group?: string;
    name: string;
    id?: string;
    description?: string;
    className?: string;
    label: string;
    error?: string;
    inline?: boolean;
    disabled?: boolean;
    reference?: React.RefObject<any>;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = (props: RadioButtonProps): React.ReactElement<void> => {
    let inputFieldClass: string = "input-field";
    if (props.error) { inputFieldClass += " has-error"; }
    if (props.inline) { inputFieldClass += " inline"; }
    const [id, setId] = React.useState<string>("");
    React.useEffect(() => setId(props.id || randomId()), [props.id]);

    return (
        <div className={"form-group radio-holder" + (props.className ? ` ${props.className}` : "")}>
            <div className={inputFieldClass}>

                <div className="radio-item">
                    {props.label && <label className="radio-label" htmlFor={id}>{props.label}</label>}
                    <input
                        className="radio-input"
                        type="radio"
                        value={props.value}
                        name={props.name}
                        id={id}
                        checked={props.value === props.radioValue}
                        disabled={props.disabled}
                        onChange={() => { props.onChange(props.radioValue); }}
                        ref={props.reference}
                    />

                    <span className="checkmark" />
                    {props.description && <span className="radio-description">{props.description}</span>}
                </div>
                {props.error && <div className="alert alert-danger">{props.error}</div>}
            </div>
        </div>
    );
};

export { RadioButton };
