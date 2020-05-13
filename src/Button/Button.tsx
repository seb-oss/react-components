import * as React from "react";
import "./button-style.scss";

export type ButtonTheme = "primary" | "secondary" | "danger" | "outline-primary" | "ghost-dark" | "ghost-light" | "anchor" | "link";
export type ButtonSizes = "lg" | "md" | "sm";
export type ButtonIconPosition = "right" | "left";
export type ButtonType = "button" | "reset" | "submit";

export interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: ButtonIconPosition;
    id?: string;
    label: React.ReactNode;
    name?: string;
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    size?: ButtonSizes;
    theme?: ButtonTheme;
    title?: string;
    type?: ButtonType;
}

export const Button: React.NamedExoticComponent<ButtonProps> = React.memo(
    (props: ButtonProps): React.ReactElement<void> => {
        const [className, setClassName] = React.useState<string>("btn");

        function getButtonTheme(): string {
            switch (props.theme) {
                case "anchor": {
                    console.warn("WARNING: 'anchor' is deprecated and will be removed in future versions. Use 'link' instead.");
                    return "link";
                }
                case "outline-primary":
                case "secondary":
                case "ghost-dark":
                case "ghost-light":
                case "danger":
                case "link":
                    return props.theme;
                default:
                    return "primary";
            }
        }

        React.useEffect(() => {
            let classNameToSet: string = "btn";
            classNameToSet += props.size ? ` btn-${props.size}` : "";
            classNameToSet += ` btn-${getButtonTheme()}`;
            if (props.icon) {
                classNameToSet += props.iconPosition ? ` icon-${props.iconPosition}` : " icon-left";
            }
            classNameToSet += props.className ? ` ${props.className}` : "";
            setClassName(classNameToSet);
        }, [props.theme, props.className, props.size, props.icon, props.iconPosition, props.size]);

        return (
            <button id={props.id} name={props.name} type={props.type || "button"} disabled={props.disabled} className={className} title={props.title} onClick={props.onClick}>
                <div className="button-content">
                    {props.iconPosition === "left" && props.children}
                    <div className="button-label">{props.label}</div>
                    {props.icon && <div className="svg-holder">{props.icon}</div>}
                    {(props.iconPosition === "right" || !props.icon) && props.children}
                </div>
            </button>
        );
    }
);
