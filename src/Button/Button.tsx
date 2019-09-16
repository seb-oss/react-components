import * as React from "react";
import "./button-style.scss";

export type ButtonTheme = "primary" | "secondary" | "danger" | "alternative" | "ghost-dark" | "ghost-light" | "anchor";
export type ButtonSizes = "lg" | "md" | "sm";

export interface ButtonProps {
    label: string;
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    id?: string;
    name?: string;
    className?: string;
    disabled?: boolean;
    theme?: ButtonTheme;
    title?: string;
    icon?: any;
    iconPosition?: "right" | "left";
    size?: ButtonSizes;
}

export const Button: React.FunctionComponent<ButtonProps> = React.memo((props: ButtonProps): React.ReactElement<void> => {
    let theme: string;
    switch (props.theme) {
        case "primary": theme = "btn-primary"; break;
        case "secondary": theme = "btn-outline-primary"; break;
        case "alternative": theme = "btn-secondary"; break;
        case "ghost-dark": theme = "btn-ghost-dark"; break;
        case "ghost-light": theme = "btn-ghost-light"; break;
        case "anchor": theme = "btn-anchor"; break;
        case "danger": theme = "btn-danger"; break;
        default: theme = "btn-primary"; break;
    }
    return (
        <button
            id={props.id}
            name={props.name}
            type="button"
            disabled={props.disabled}
            className={
                `btn ${theme}`
                + (props.size ? ` btn-${props.size}` : "")
                + (props.className ? ` ${props.className}` : "")
                + (props.icon ? (props.iconPosition ? ` icon-${props.iconPosition}` : " icon-left") : "")
            }
            title={props.title}
            onClick={props.onClick}
        >
            <div className="button-content">
                <div className="button-label">{props.label}</div>
                {(props.icon) && <div className="svg-holder">{props.icon}</div>}
            </div>
        </button>
    );
});
