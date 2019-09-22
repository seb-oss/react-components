import * as React from "react";
import { randomId } from "../__utils/randomId";
import "./radio-button-style.scss";

export interface RadioButtonProps {
    className?: string;
    description?: string;
    disabled?: boolean;
    error?: string;
    group?: string;
    id?: string;
    inline?: boolean;
    label: string;
    name: string;
    onChange: (value: any) => void;
    radioValue: any;
    reference?: React.RefObject<HTMLInputElement>;
    value: any;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = (props: RadioButtonProps): React.ReactElement<void> => {
    let inputFieldClass: string = "input-field";
    if (props.error) { inputFieldClass += " has-error"; }
    if (props.inline) { inputFieldClass += " inline"; }
    const [id, setId] = React.useState<string>("");
    React.useEffect(() => setId(props.id || randomId("radiobtn-")), [props.id]);

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
