import * as React from "react";
import "./button-style.scss";

export interface ButtonProps {
    label: string;
    onClick: (event: any) => void;
    id?: string;
    name?: string;
    className?: string;
    disabled?: boolean;
    theme?: string;
    title?: string;
    icon?: any;
    iconPosition?: string;
}

export const Button: React.FunctionComponent<ButtonProps> = React.memo((props: ButtonProps): React.ReactElement<void> => {
    return (
        <button
            id={props.id}
            name={props.name}
            type="button"
            disabled={props.disabled}
            className={
                "btn"
                + (props.theme ? ` btn-${props.theme}` : " btn-primary")
                + (props.className ? ` ${props.className}` : "")
                + (props.icon ? (props.iconPosition ? ` icon-${props.iconPosition}` : " icon-left") : "")
            }
            title={props.title}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => { props.onClick && props.onClick(e); }}
        >
            <div className="button-content">
                <div className="button-label">{props.label}</div>
                {(props.icon) && <div className="svg-holder">{props.icon}</div>}
            </div>
        </button>
    );
});
