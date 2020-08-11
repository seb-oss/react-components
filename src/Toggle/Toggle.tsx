import * as React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import "./toggle.scss";

export interface ToggleProps {
    className?: string;
    disabled?: boolean;
    id?: string;
    label?: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reference?: React.RefObject<any>;
    value: boolean;
}

export const Toggle: React.FunctionComponent<ToggleProps> = (props: ToggleProps): React.ReactElement<void> => {
    const [id, setId] = React.useState<string>("");

    React.useEffect(() => {
        setId(props.id || randomId("toggle-"));
    }, [props.id]);

    return (
        <div className={"form-group custom-toggle" + (props.className ? ` ${props.className}` : "")}>
            <div className="custom-control custom-slide-toggle">
                <input
                    className="custom-control-input"
                    id={id}
                    name={props.name}
                    type="checkbox"
                    checked={props.value}
                    onChange={props.onChange}
                    ref={props.reference}
                    disabled={props.disabled}
                    aria-checked={!!props.value}
                    tabIndex={0}
                    role="switch"
                />
                <label className="custom-control-label" htmlFor={id}>
                    {props.label}
                </label>
            </div>
        </div>
    );
};
