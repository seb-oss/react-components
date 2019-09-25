import * as React from "react";
import "./loader-style.scss";

export interface LoaderProps {
    className?: string;
    fullscreen?: boolean;
    sizeClassName?: string;
    id?: string;
    size?: Size;
    toggle: boolean;
}

export type Size = "large" | "medium" | "small" | "extraLarge" | "tiny";

export const Loader: React.FunctionComponent<LoaderProps> = React.memo((props: LoaderProps): React.ReactElement<void> => {
    const fullscreen: boolean = props.fullscreen === undefined ? false : props.fullscreen;
    let loaderWrapper: string = "seb-loader-wrapper ";
    if (fullscreen) { loaderWrapper += "fullscreen "; }

    function setSizeClass(): string {
        if (props.sizeClassName) {
            return props.sizeClassName;
        }
        switch (props.size) {
            case "large":
                return "loader-lg";
            case "small":
                return "loader-sm";
            case "extraLarge":
                return "loader-xl";
            case "medium":
                return "loader-md";
            case "tiny":
                return "loader-xs";
            default:
                return "loader-sm";
        }
    }

    return (
        <div className={loaderWrapper + (props.className ? props.className : "")} id={props.id}>
            {props.toggle &&
                <div className={"seb-loader " + setSizeClass()}>
                    <div className="seb-loader-container">
                        <div className="seb-loader-rotator">
                            <div className="seb-loader-left">
                                <div className="seb-loader-circle" />
                            </div>
                            <div className="seb-loader-right">
                                <div className="seb-loader-circle" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
});
