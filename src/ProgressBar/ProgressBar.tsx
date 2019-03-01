import * as React from "react";
import "./progress-bar-style.scss";

export interface ProgressBarProps {
    value: number;
    showProgress?: boolean;
    className?: string;
}

export const ProgressBar: React.StatelessComponent<ProgressBarProps> = (props: ProgressBarProps): React.ReactElement<void> => {
    return (
        <div className={"custom-progress" + (props.className ? ` ${props.className}` : "")}>
            <div className={"custom-progress-bar" + (props.showProgress ? " show-progress" : "")} style={{ width: `${props.value}%` }} />
            {props.showProgress &&
                <div className={"custom-progress-text" + (props.value > 49 ? " white" : "")}>{props.value + "%"}</div>
            }
        </div>
    );
};
