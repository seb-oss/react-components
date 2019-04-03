import * as React from "react";
import "./toggle-style.scss";

export interface ToggleProps {
    name: string;
    label?: string;
    value: boolean;
    onChange: (event: any) => void;
    className?: string;
    reference?: React.RefObject<any>;
}

export const Toggle: React.FunctionComponent<ToggleProps> = (props: ToggleProps): React.ReactElement<void> => {
    return (
        <div className={"form-group custom-toggle" + (props.className ? ` ${props.className}` : "")}>
            <div className="toggle-btn">
                <input
                    className="toggle"
                    id={props.name}
                    name={props.name}
                    type="checkbox"
                    checked={props.value}
                    onChange={props.onChange}
                    ref={props.reference}
                />
                <label className="toggle-switch" htmlFor={props.name}><div className="toggle-nob" /></label>
            </div>
            {props.label && <div className="toggle-label">{props.label}</div>}
        </div>
    );
};
