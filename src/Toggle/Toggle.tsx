import * as React from "react";
import "./toggle-style.scss";

export interface ToggleProps {
    name: string;
    value: boolean;
    onChange: (event: any) => void;
    id?: string;
    label?: string;
    className?: string;
    reference?: React.RefObject<any>;
}

export const Toggle: React.FunctionComponent<ToggleProps> = (props: ToggleProps): React.ReactElement<void> => {
    const id = props.id || `${props.name}-${(Math.random() * 1000) + (new Date()).getTime()}`;
    const [hasFocus, setHasFocus] = React.useState(false);

    /**
     * set Focus
     */
    function handleSetFocus(e: React.FocusEvent<HTMLInputElement>) {
        e.preventDefault();
        e.stopPropagation();

        setHasFocus(!hasFocus);
    }

    return (
        <div className={"form-group custom-toggle" + (props.className ? ` ${props.className}` : "") + (hasFocus ? " focus-class" : "")}>
            <div className="toggle-btn">
                <input
                    className="toggle"
                    id={id}
                    name={props.name}
                    type="checkbox"
                    checked={props.value}
                    onChange={props.onChange}
                    onFocus={handleSetFocus}
                    onBlur={handleSetFocus}
                    ref={props.reference}
                />
                <label className="toggle-switch" htmlFor={id}><div className="toggle-nob" /></label>
            </div>
            {props.label && <div className="toggle-label">{props.label}</div>}
        </div>
    );
};
