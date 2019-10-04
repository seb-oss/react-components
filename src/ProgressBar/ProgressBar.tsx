import * as React from "react";
import "./progress-bar-style.scss";

export interface ProgressBarProps {
    className?: string;
    id?: string;
    showProgress?: boolean;
    value: number;
}

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = (props: ProgressBarProps): React.ReactElement<void> => {
    return (
        <div className={"custom-progress" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <div className={"custom-progress-bar" + (props.showProgress ? " show-progress" : "")} style={{ width: `${props.value}%` }} />
            {props.showProgress &&
                <div className={"custom-progress-text" + (props.value > 49 ? " white" : "")}>{props.value + "%"}</div>
            }
        </div>
    );
};
