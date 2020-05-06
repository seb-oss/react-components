import * as React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import "./check-box-style.scss";

export interface CheckBoxProps {
    checked: boolean;
    className?: string;
    condensed?: boolean;
    description?: string;
    disabled?: boolean;
    id?: string;
    inline?: boolean;
    label: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reference?: React.RefObject<HTMLInputElement>;
    topLabel?: string;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = (props: CheckBoxProps): React.ReactElement<void> => {
    const [id, setId] = React.useState<string>(props.id);
    const [formClass, setFormClass] = React.useState<string>("");

    React.useEffect(() => {
        setId(props.id ? id : randomId("checkbox-"));
    }, [props.id]);

    React.useEffect(() => {
        let formClassName: string = "form-group custom-checkbox";
        formClassName += props.inline ? " inline" : "";
        formClassName += props.condensed ? " condensed" : "";
        formClassName += props.className ? ` ${props.className}` : "";
        setFormClass(formClassName);
    }, [props.inline, props.condensed, props.className]);

    return (
        <div className={formClass}>
            <div className="input-field">
                {props.topLabel && (
                    <label htmlFor={id} className="checkbox-toplabel">
                        {props.topLabel}
                    </label>
                )}

                <div className="custom-control">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={id}
                        disabled={props.disabled}
                        name={props.name}
                        checked={props.checked}
                        onChange={props.onChange}
                        ref={props.reference}
                    />
                    <label className="custom-control-label" htmlFor={id}>
                        {props.label}
                        {props.description && <span className="checkbox-description">{props.description}</span>}
                    </label>
                </div>
            </div>
        </div>
    );
};

export { CheckBox };
