import * as React from "react";
import { randomId } from "../__utils/randomId";
import "./radio-button-style.scss";

export interface RadioButtonProps<T = any> {
    className?: string;
    condensed?: boolean;
    description?: string;
    disabled?: boolean;
    group?: string;
    id?: string;
    inline?: boolean;
    label: string;
    name: string;
    onChange: (value: T, e?: React.ChangeEvent<HTMLInputElement>) => void;
    radioValue: T;
    reference?: React.RefObject<HTMLInputElement>;
    topLabel?: string;
    value: T;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = (props: RadioButtonProps): React.ReactElement<void> => {
    const [className, setClassName] = React.useState<string>("form-group custom-radio");
    const [id, setId] = React.useState<string>("");

    React.useEffect(() => setId(props.id || randomId("radiobtn-")), [props.id]);

    React.useEffect(() => {
        let elementClassName: string = "form-group custom-radio";
        elementClassName += props.inline ? " inline" : "";
        elementClassName += props.condensed ? " condensed" : "";
        elementClassName += props.className ? ` ${props.className}` : "";
        setClassName(elementClassName);
    }, [props.className, props.inline, props.condensed]);

    return (
        <div className={className}>
            <div className="input-field">
                {props.topLabel && (
                    <label htmlFor={id} className="radio-toplabel">
                        {props.topLabel}
                    </label>
                )}

                <div className="custom-control">
                    <input
                        className="custom-control-input"
                        type="radio"
                        value={props.value}
                        name={props.name}
                        id={id}
                        checked={props.value === props.radioValue}
                        disabled={props.disabled}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            props.onChange(props.radioValue, e);
                        }}
                        ref={props.reference}
                    />
                    <label className="custom-control-label" htmlFor={id}>
                        {props.label}
                        {props.description && <span className="radio-description">{props.description}</span>}
                    </label>
                </div>
            </div>
        </div>
    );
};

export { RadioButton };
